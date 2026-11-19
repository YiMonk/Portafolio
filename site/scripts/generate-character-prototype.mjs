import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const output = new URL('../public/assets/character/character-prototype.glb', import.meta.url);
const check = process.argv[2] === '--check';
assert(process.argv.length === (check ? 3 : 2), 'Usage: node generate-character-prototype.mjs [--check]');
const existing = check ? await readFile(output) : null;

// The texture-free binary exporter only needs these two FileReader members.
globalThis.FileReader ??= class {
  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();
    this.onloadend?.();
  }
};

const scene = new THREE.Scene();
scene.name = 'Character Prototype — Static Wave';
const vector = (xyz) => new THREE.Vector3(...xyz);
const material = (name, color, roughness = 0.78) =>
  new THREE.MeshStandardMaterial({ name, color, roughness });
const skin = material('Apricot skin', 0xe6a372);
const ear = material('Warm ear', 0xc97958);
const lips = material('Warm lip', 0xb6664f);
const mouth = material('Smile interior', 0x502820);
const enamel = material('Warm white teeth', 0xffeee0);
const white = material('Ivory sclera', 0xfff8e9, 0.45);
const iris = material('Chestnut iris', 0x895027, 0.36);
const umber = material('Dark iris edge', 0x493021);
const pupil = material('Pupil', 0x201611, 0.4);
const frame = material('Espresso frames', 0x292325, 0.38);
const hair = [0x28201e, 0x342724, 0x412e26].map((c, i) => material('Hair tone ' + i, c));
const cream = material('Oat cotton', 0xe6d4b3);
const rib = material('Cotton ribbing', 0xcbbb9e);
const denim = material('Washed indigo', 0x577895);
const seam = material('Indigo seam', 0x38556f);
const sneaker = material('Chalk upper', 0xece9e1);
const sole = material('Warm rubber', 0xd0cbc1);
const slate = material('Slate watch', 0x637688);

function mesh(name, geometry, mat, position = [0, 0, 0], scale = [1, 1, 1]) {
  const m = new THREE.Mesh(geometry, mat);
  m.name = name;
  m.position.copy(vector(position));
  m.scale.copy(vector(scale));
  scene.add(m);
  return m;
}

const sphere = new THREE.SphereGeometry(1, 32, 24);
function oval(name, mat, position, scale, tilt = 0) {
  const m = mesh(name, sphere, mat, position, scale);
  m.rotation.z = tilt;
  return m;
}

function indexed(positions, indices) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

// Circumferential rings, wrapped without a seam; tiny end rings are hidden at overlaps.
function rings(name, mat, count, vertex, steps = 32) {
  const positions = [];
  const indices = [];
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < steps; col++) {
      positions.push(...vertex(row, col * Math.PI * 2 / steps));
      if (row === count - 1) continue;
      const a = row * steps + col;
      const b = row * steps + (col + 1) % steps;
      indices.push(a, a + steps, b, b, a + steps, b + steps);
    }
  }
  for (let i = 1; i < steps - 1; i++) {
    const end = (count - 1) * steps;
    indices.push(0, i, i + 1, end, end + i + 1, end + i);
  }
  return mesh(name, indexed(positions, indices), mat);
}

// Smooth elliptical profiles let the shirt and jeans read as garments rather than stacked balls.
function garment(name, mat, sections) {
  const points = new THREE.CatmullRomCurve3(
    sections.map(([y, xRadius, zRadius]) => new THREE.Vector3(y, xRadius, zRadius)),
    false, 'catmullrom', 0.24,
  );
  const offset = new THREE.CatmullRomCurve3(
    sections.map(([y, , , x = 0, z = 0]) => new THREE.Vector3(y, x, z)),
    false, 'catmullrom', 0.24,
  );
  const count = sections.length * 5;
  return rings(name, mat, count, (row, a) => {
    const t = row / (count - 1);
    const { x: y, y: rx, z: rz } = points.getPoint(t);
    const { y: x, z } = offset.getPoint(t);
    return [x + rx * Math.cos(a), y, z + rz * Math.sin(a)];
  });
}

// A circular/elliptic sweep with a deterministic taper along a 3D centerline.
function sweep(name, mat, points, radii, flatten = 1, steps = 24) {
  const curve = new THREE.CatmullRomCurve3(points.map(vector));
  const frames = curve.computeFrenetFrames(steps, false);
  return rings(name, mat, steps + 1, (row, a) => {
    const t = row / steps;
    const sample = t * (radii.length - 1);
    const lo = Math.floor(sample);
    const radius = THREE.MathUtils.lerp(radii[lo], radii[Math.min(lo + 1, radii.length - 1)], sample - lo);
    return curve.getPointAt(t)
      .addScaledVector(frames.normals[row], radius * Math.cos(a))
      .addScaledVector(frames.binormals[row], -radius * flatten * Math.sin(a))
      .toArray();
  }, 16);
}

function line(name, mat, points, radius) {
  const curve = new THREE.CatmullRomCurve3(points.map(vector));
  return mesh(name, new THREE.TubeGeometry(curve, 24, radius, 10, false), mat);
}

garment('T-shirt', cream, [
  [1.26, .29, .171], [1.29, .32, .185], [1.48, .304, .182], [1.71, .325, .199],
  [1.94, .385, .205], [2.053, .354, .169], [2.107, .19, .126], [2.12, .12, .10],
]);
garment('Shirt hem', rib, [[1.265, .303, .177], [1.275, .322, .187], [1.296, .321, .19]]);
mesh('Ribbed crew neck', new THREE.TorusGeometry(.153, .024, 12, 48), rib, [0, 2.105, .012], [1, .84, 1])
  .rotation.x = Math.PI / 2;
oval('Neck', skin, [0, 2.17, .003], [.133, .206, .117]);

oval('Denim seat', denim, [0, 1.216, -.015], [.302, .133, .167]);
for (const side of [-1, 1]) {
  const x = side * .194;
  garment('Jeans leg ' + side, denim, [
    [.155, .107, .106, x, -.006], [.22, .12, .111, x, -.006],
    [.44, .121, .115, side * .178, -.005], [.64, .128, .126, side * .173, .021],
    [.83, .14, .137, side * .165, .003], [1.055, .163, .161, side * .151],
    [1.239, .148, .153, side * .145], [1.29, .103, .11, side * .136],
  ]);
  line('Front pocket ' + side, seam, [[side * .274, 1.25, .11], [side * .245, 1.195, .137], [side * .171, 1.177, .162]], .008);
  line('Outseam ' + side, seam, [[side * .301, .24, .038], [side * .291, .63, .075], [side * .301, .971, .071]], .006);
  const shoeX = x + side * .025;
  garment('Outsole ' + side, sole, [
    [.002, .122, .201, shoeX, .083], [.012, .137, .217, shoeX, .083],
    [.039, .139, .22, shoeX, .083], [.062, .133, .211, shoeX, .083],
  ]);
  oval('Sneaker upper ' + side, sneaker, [shoeX, .086, .083], [.131, .075, .211]);
  oval('Sneaker ankle ' + side, sneaker, [x, .123, .005], [.117, .091, .13]);
  for (let i = 0; i < 3; i++) {
    const z = .081 + .037 * i;
    const y = .192 - .015 * i;
    line('Lace ' + side + ':' + i, sole, [[x - .052, y - .006, z], [x, y, z + .005], [x + .052, y - .006, z]], .006);
  }
}

sweep('Wave sleeve', cream, [[.238, 1.97, 0], [.345, 1.966, 0], [.423, 1.954, .002], [.514, 1.932, .01]], [.089, .133, .128, .117]);
sweep('Wave arm', skin, [[.482, 1.924, .01], [.66, 1.904, .014], [.794, 1.955, .021], [.849, 2.19, .071], [.889, 2.367, .113]], [.103, .102, .093, .079, .055], .95);
sweep('Watch strap', slate, [[.865, 2.275, .091], [.88, 2.337, .105]], [.067, .064]);
oval('Watch face', frame, [.879, 2.309, .157], [.051, .035, .016], -.15);
oval('Wave palm', skin, [.922, 2.466, .132], [.104, .128, .061], -.22);
const fingers = [
  [[.85, 2.521, .143], [.85, 2.613, .144], [.837, 2.703, .139]],
  [[.904, 2.552, .139], [.92, 2.644, .137], [.932, 2.741, .128]],
  [[.957, 2.552, .13], [.984, 2.644, .123], [1.015, 2.712, .109]],
  [[1.002, 2.522, .119], [1.041, 2.59, .105], [1.071, 2.643, .093]],
  [[.856, 2.452, .154], [.799, 2.483, .158], [.769, 2.546, .151]],
];
fingers.forEach((points, i) => {
  sweep('Wave finger ' + i, skin, points, i === 4 ? [.039, .032, .018] : [.029, .026, .016]);
  oval('Wave fingertip ' + i, skin, points[2], [.018, .022, .018]);
});

sweep('Relaxed sleeve', cream, [[-.229, 1.974, 0], [-.312, 1.934, .001], [-.366, 1.86, .004], [-.422, 1.77, .008]], [.082, .132, .124, .112]);
sweep('Relaxed arm', skin, [[-.41, 1.793, .003], [-.47, 1.642, .009], [-.53, 1.498, .026], [-.641, 1.32, .062]], [.105, .092, .082, .052]);
oval('Relaxed palm', skin, [-.681, 1.244, .076], [.083, .103, .05], -.48);
for (let i = 0; i < 4; i++) {
  const x = -.745 + .034 * i;
  const y = 1.22 - .013 * i;
  sweep('Relaxed finger ' + i, skin, [[x, y, .084], [x - .023, y - .047, .092], [x - .022, y - .079, .111]], [.024, .021, .012]);
}
sweep('Relaxed thumb', skin, [[-.638, 1.274, .101], [-.609, 1.239, .123], [-.613, 1.197, .131]], [.034, .027, .016]);

const headY = 2.57;
oval('Face', skin, [0, headY, 0], [.392, .459, .329]);
const surface = (x, y) => .329 * Math.sqrt(Math.max(0, 1 - (x / .392) ** 2 - ((y - headY) / .459) ** 2));
for (const side of [-1, 1]) {
  oval('Ear ' + side, skin, [side * .377, 2.552, .005], [.077, .116, .061], side * -.16);
  oval('Inner ear ' + side, ear, [side * .419, 2.556, .047], [.027, .061, .018], side * -.16);
  const x = side * .166;
  oval('Eye socket ' + side, ear, [x, 2.599, .296], [.117, .101, .062]);
  oval('Sclera ' + side, white, [x, 2.607, .311], [.105, .085, .065]);
  oval('Iris edge ' + side, umber, [x + .005, 2.612, .369], [.056, .058, .019]);
  oval('Brown iris ' + side, iris, [x + .005, 2.612, .377], [.046, .049, .015]);
  oval('Pupil ' + side, pupil, [x + .008, 2.614, .389], [.026, .030, .008]);
  oval('Eye highlight ' + side, white, [x - .009, 2.634, .396], [.012, .012, .004]);
  oval('Eye glint ' + side, white, [x + .023, 2.598, .395], [.005, .005, .003]);
  const glasses = mesh('Round frame ' + side, new THREE.TorusGeometry(.133, .014, 14, 56), frame,
    [x, 2.603, .366], [1.07, .96, 1]);
  glasses.rotation.y = side * .20;
  line('Temple ' + side, frame, [[side * .297, 2.639, .34], [side * .358, 2.649, .237], [side * .399, 2.602, .041]], .014);
  sweep('Thick brow ' + side, hair[0], [
    [side * .064, 2.746, .314], [side * .129, 2.776, .306],
    [side * .207, 2.775, .264], [side * .279, 2.737, .223],
  ], [.018, .029, .024, .008], .66);
}
line('Frame bridge', frame, [[-.037, 2.613, .38], [0, 2.632, .394], [.037, 2.613, .38]], .015);
oval('Nose bridge', skin, [0, 2.566, .323], [.056, .09, .071]);
oval('Nose tip', skin, [0, 2.522, .372], [.063, .048, .058]);

// Follow the facial surface so the smile remains attached in a three-quarter view.
function smilePatch(name, mat, width, shift, top, bottom, depth) {
  const positions = [];
  const indices = [];
  for (let i = 0; i <= 40; i++) {
    const t = i / 20 - 1;
    const x = t * width;
    const curve = t * t;
    const height = Math.max(.012, 1 - curve);
    for (const y of [shift + .054 * curve + bottom * height, shift + .054 * curve + top * height]) {
      positions.push(x, y, surface(x, y) + depth);
    }
    const n = 2 * i;
    if (i < 40) indices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3);
  }
  mesh(name, indexed(positions, indices), mat);
}
smilePatch('Smile lip', lips, .150, 2.363, .032, -.026, .015);
smilePatch('Open smile', mouth, .141, 2.365, .026, -.017, .018);
smilePatch('Smile teeth', enamel, .128, 2.374, .014, -.001, .023);

// The crown's hairline drops around the ears and wraps down over the nape.
rings('Crown and tapered sides', hair[0], 33, (row, a) => {
  const front = Math.sin(a);
  const edge = 1.75 - .61 * front + .04 * Math.sin(a * 7);
  const t = THREE.MathUtils.lerp(.005, edge, row / 32);
  return [-.406 * Math.cos(a) * Math.sin(t), 2.702 + .377 * Math.cos(t),
    .346 * Math.sin(a) * Math.sin(t)];
}, 64);
const locks = [
  [[-.32, 2.917, .106], [-.303, 2.957, .221], [-.256, 2.899, .289], [-.207, 2.801, .302]],
  [[-.253, 2.986, .143], [-.201, 3.01, .252], [-.143, 2.903, .33], [-.075, 2.811, .332]],
  [[-.135, 3.035, .138], [-.083, 3.055, .254], [-.018, 2.949, .338], [.023, 2.817, .342]],
  [[-.006, 3.034, .121], [.062, 3.082, .207], [.104, 2.977, .318], [.071, 2.851, .354]],
  [[.092, 3.029, .098], [.177, 3.046, .205], [.206, 2.965, .294], [.153, 2.859, .326]],
  [[.219, 2.992, .08], [.286, 3.004, .157], [.308, 2.925, .239], [.251, 2.824, .286]],
  [[.295, 2.907, .01], [.366, 2.923, .095], [.379, 2.866, .163], [.339, 2.764, .179]],
  [[-.29, 2.966, -.075], [-.225, 3.043, -.013], [-.141, 3.064, .04], [-.095, 3.079, .059]],
  [[-.144, 3.037, -.144], [-.062, 3.075, -.071], [.014, 3.088, -.008], [.071, 3.115, .028]],
  [[.015, 3.051, -.158], [.105, 3.071, -.111], [.206, 3.04, -.052], [.263, 3.07, -.009]],
];
locks.forEach((points, i) => sweep('Sculpted hair lock ' + i, hair[1 + (i % 4 === 1 ? 1 : 0)], points, [.041, .066, .052, .003], .71));

async function validate(binary) {
  assert.equal(binary.toString('ascii', 0, 4), 'glTF');
  assert.equal(binary.readUInt32LE(4), 2);
  assert.equal(binary.readUInt32LE(8), binary.length);
  const jsonLength = binary.readUInt32LE(12);
  const chunk = 20 + jsonLength;
  assert.equal(jsonLength % 4, 0);
  assert.equal(binary.toString('ascii', 16, 20), 'JSON');
  assert.equal(binary.readUInt32LE(chunk + 4), 0x004e4942);
  const binLength = binary.readUInt32LE(chunk);
  const document = JSON.parse(binary.toString('utf8', 20, chunk));
  assert.equal(binLength % 4, 0);
  assert.equal(chunk + 8 + binLength, binary.length);
  assert(binLength >= document.buffers[0].byteLength && binLength - document.buffers[0].byteLength < 4);
  assert(document.bufferViews.every((v) => (v.byteOffset ?? 0) + v.byteLength <= binLength));
  assert(!document.skins && !document.animations && !document.images);
  const bytes = binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.length);
  const { scene: loaded } = await new GLTFLoader().parseAsync(bytes, '');
  let triangles = 0;
  let meshes = 0;
  loaded.traverse((part) => {
    if (!part.isMesh) return;
    meshes++;
    const { index, attributes: { position, normal } } = part.geometry;
    assert(index && normal && position.count === normal.count, part.name);
    assert(position.array.every(Number.isFinite) && normal.array.every(Number.isFinite), part.name);
    assert.equal(index.count % 3, 0, part.name);
    assert(index.array.every((i) => i < position.count), part.name);
    let valid = 0;
    const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
    for (let i = 0; i < index.count; i += 3) {
      a.fromBufferAttribute(position, index.getX(i));
      b.fromBufferAttribute(position, index.getX(i + 1)).sub(a);
      c.fromBufferAttribute(position, index.getX(i + 2)).sub(a);
      if (b.cross(c).lengthSq() > 1e-20) valid++;
    }
    assert(valid >= index.count / 3 * .98, 'Degenerate geometry: ' + part.name);
    triangles += valid;
  });
  for (const name of ['Face', 'Open smile', 'Smile teeth', 'Brown iris -1', 'Brown iris 1',
    'Round frame -1', 'Round frame 1', 'Wave palm', 'Outsole -1', 'Outsole 1']) {
    assert(loaded.getObjectByName(THREE.PropertyBinding.sanitizeNodeName(name)), 'Missing mesh: ' + name);
  }
  const bounds = new THREE.Box3().setFromObject(loaded, true);
  assert(bounds.min.y >= 0 && bounds.min.y < .005 && bounds.max.y > 3.05 && bounds.max.y < 3.2);
  assert(bounds.min.x < -.78 && bounds.max.x > 1.06 && bounds.max.z > .40);
  return { meshes, triangles };
}

const binary = Buffer.from(await new GLTFExporter().parseAsync(scene, { binary: true }));
const inspected = check ? existing : binary;
const stats = await validate(inspected);
if (check) {
  assert(existing.equals(binary), 'The on-disk GLB differs from deterministic regeneration.');
} else {
  await writeFile(output, binary);
}
const sha = createHash('sha256').update(inspected).digest('hex');
console.log((check ? 'Checked byte-identical GLB' : 'Generated GLB') +
  ': ' + inspected.length + ' bytes, ' + stats.meshes + ' meshes, ' + stats.triangles + ' nondegenerate triangles.');
console.log('SHA-256: ' + sha);
