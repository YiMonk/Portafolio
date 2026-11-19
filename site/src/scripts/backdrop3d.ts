/**
 * Backdrop3D scene: a procedural dim-planet valley lit by a blue dwarf.
 * Lazy-loaded (dynamic import) by Backdrop3D.astro, so `three` never ships in
 * the initial JS. Named imports keep the chunk tree-shaken.
 *
 * Terrain is displaced once at init with a seeded ridged noise (deterministic,
 * no Math.random). Shading, fog and colours live in a tiny ShaderMaterial whose
 * uniforms are driven by the `--bd3-*` CSS tokens, so theme changes only update
 * uniforms (no scene rebuild).
 */
import {
  CanvasTexture,
  Color,
  Float32BufferAttribute,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Sprite,
  SpriteMaterial,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';

// ---------------------------------------------------------------- noise ----

const SEED = 1187;

function hash(ix: number, iz: number, s: number): number {
  let h = Math.imul(ix, 374761393) ^ Math.imul(iz, 668265263) ^ Math.imul(s, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function valueNoise(x: number, z: number, s: number): number {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const u = fx * fx * (3 - 2 * fx);
  const v = fz * fz * (3 - 2 * fz);
  const a = hash(ix, iz, s);
  const b = hash(ix + 1, iz, s);
  const c = hash(ix, iz + 1, s);
  const d = hash(ix + 1, iz + 1, s);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Ridged multifractal in ~[0, 1]; octaves are rotated to hide the value-noise grid. */
function ridged(x: number, z: number): number {
  let amp = 0.5;
  let sum = 0;
  let weight = 1;
  for (let o = 0; o < 5; o++) {
    let n = 1 - Math.abs(2 * valueNoise(x, z, SEED + o) - 1);
    n *= n * weight;
    weight = Math.min(1, n * 1.8);
    sum += n * amp;
    amp *= 0.5;
    const nx = (x * 0.8 - z * 0.6) * 2.03;
    z = (x * 0.6 + z * 0.8) * 2.03;
    x = nx;
  }
  return Math.min(1, sum);
}

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

const TERRAIN_W = 1600;
const TERRAIN_NEAR = 20;
const TERRAIN_FAR = -620;
const PEAK = 100;

/** Height of the valley: low winding floor near the camera, ridges rising with distance. */
function heightAt(x: number, z: number): number {
  const d = -z;
  const cx = 55 * Math.sin(z * 0.006);
  const valley = smooth(20, 150, Math.abs(x - cx));
  const ramp = 0.45 + 0.55 * smooth(30, 440, d);
  const r = ridged(x * 0.0055, z * 0.0055);
  const floor = valueNoise(x * 0.02, z * 0.02, SEED + 9) * 9; // gentle valley-floor rolls
  return (r * PEAK * (0.1 + 0.9 * valley) + valley * 16) * ramp + floor;
}

// --------------------------------------------------------------- shader ----

const VERT = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vNormalW;
  varying float vH;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vH = position.y;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`;

const FRAG = /* glsl */ `
  uniform vec3 uShadow;
  uniform vec3 uMid;
  uniform vec3 uLit;
  uniform vec3 uFog;
  uniform vec3 uSunDir;
  uniform float uLitK;
  uniform float uRimK;
  uniform float uFogNear;
  uniform float uFogFar;
  varying vec3 vWorld;
  varying vec3 vNormalW;
  varying float vH;
  void main() {
    // Faceted (low-poly) normal blended with the smooth one.
    vec3 nf = normalize(cross(dFdx(vWorld), dFdy(vWorld)));
    if (nf.y < 0.0) nf = -nf;
    vec3 n = normalize(mix(vNormalW, nf, 0.55));
    vec3 v = normalize(cameraPosition - vWorld);

    float sun = pow(clamp(dot(n, uSunDir), 0.0, 1.0), 1.6);
    float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0) * clamp(dot(n, uSunDir) + 0.4, 0.0, 1.0)
              * clamp((1.0 - n.y) * 1.8, 0.0, 1.0); // steep slopes only, not flat ground
    vec3 base = mix(uShadow, uMid, clamp(n.y * 0.7 + clamp(vH / 110.0, 0.0, 1.0) * 0.5, 0.0, 1.0));
    vec3 col = mix(base, uLit, clamp(sun * uLitK + rim * uRimK, 0.0, 1.0));

    // Atmospheric perspective + low valley haze
    float dist = length(vWorld - cameraPosition);
    float f = smoothstep(uFogNear, uFogFar, dist);
    f *= f;
    float low = exp(-max(vWorld.y, 0.0) * 0.045) * smoothstep(80.0, 320.0, dist) * 0.5;
    f = 1.0 - (1.0 - f) * (1.0 - low);
    gl_FragColor = vec4(mix(col, uFog, clamp(f, 0.0, 1.0)), 1.0);
    #include <colorspace_fragment>
  }
`;

// ---------------------------------------------------------------- theme ----

interface Palette {
  shadow: string;
  mid: string;
  lit: string;
  fog: string;
  sun: string;
  halo: string;
  litK: number;
  rimK: number;
  haloAlpha: number;
}

function readPalette(): Palette {
  const cs = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) => cs.getPropertyValue(name).trim() || fallback;
  const num = (name: string, fallback: number) => {
    const v = parseFloat(cs.getPropertyValue(name));
    return Number.isFinite(v) ? v : fallback;
  };
  return {
    shadow: get('--bd3-shadow', '#07090e'),
    mid: get('--bd3-mid', '#111a2c'),
    lit: get('--bd3-lit', '#5878d8'),
    fog: get('--color-cream', '#0e0e0e'),
    sun: get('--bd3-sun', '#e4ecff'),
    halo: get('--bd3-halo', '#4f7bff'),
    litK: num('--bd3-lit-k', 0.8),
    rimK: num('--bd3-rim-k', 1),
    haloAlpha: num('--bd3-halo-alpha', 0.5),
  };
}

function radialTexture(stops: Array<[number, number]>): CanvasTexture {
  const size = 128;
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const g = c.getContext('2d')!;
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [at, alpha] of stops) grad.addColorStop(at, `rgba(255,255,255,${alpha})`);
  g.fillStyle = grad;
  g.fillRect(0, 0, size, size);
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

// ----------------------------------------------------------------- init ----

/**
 * Builds the scene on `canvas`. Resolves to a dispose function; throws when
 * WebGL is unavailable so the caller can keep the SVG fallback.
 */
export function init(canvas: HTMLCanvasElement): () => void {
  const root = document.documentElement;
  const isMobile = () => window.matchMedia('(max-width: 767px)').matches;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
  });
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(45, 1, 1, 1600);
  const BASE_POS = new Vector3(0, 16, 40);
  const BASE_LOOK = new Vector3(0, 16 + 640 * Math.tan((5 * Math.PI) / 180), -600);

  // Terrain: denser rows/columns near the camera, displaced once.
  const seg = isMobile() ? 64 : 128;
  const geo = new PlaneGeometry(1, 1, seg, seg);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position as Float32BufferAttribute;
  for (let i = 0; i < pos.count; i++) {
    const u = pos.getX(i) * 2; // -1..1
    const t = pos.getZ(i) + 0.5; // 0 (far side after rotation) .. 1
    const x = Math.sign(u) * Math.pow(Math.abs(u), 1.35) * (TERRAIN_W / 2);
    const z = TERRAIN_NEAR + (TERRAIN_FAR - TERRAIN_NEAR) * Math.pow(1 - t, 1.7);
    pos.setXYZ(i, x, heightAt(x, z), z);
  }
  geo.computeVertexNormals();

  const sunDir = new Vector3(-0.8, 0.2, -0.45).normalize();
  const material = new ShaderMaterial({
    vertexShader: VERT,
    fragmentShader: FRAG,
    uniforms: {
      uShadow: { value: new Color() },
      uMid: { value: new Color() },
      uLit: { value: new Color() },
      uFog: { value: new Color() },
      uSunDir: { value: sunDir },
      uLitK: { value: 0.8 },
      uRimK: { value: 1 },
      uFogNear: { value: 90 },
      uFogFar: { value: 700 },
    },
  });
  const terrain = new Mesh(geo, material);
  terrain.frustumCulled = false;
  scene.add(terrain);

  // Blue dwarf: soft disc + wide halo, behind the far ridge, left of centre.
  const discTex = radialTexture([[0, 1], [0.55, 1], [0.8, 0.45], [1, 0]]);
  const haloTex = radialTexture([[0, 0.9], [0.2, 0.45], [0.5, 0.12], [1, 0]]);
  const discMat = new SpriteMaterial({ map: discTex, transparent: true, depthWrite: false });
  const haloMat = new SpriteMaterial({ map: haloTex, transparent: true, depthWrite: false });
  const halo = new Sprite(haloMat);
  const disc = new Sprite(discMat);
  const SUN_POS = new Vector3(-210, 72, -590);
  halo.position.copy(SUN_POS);
  disc.position.copy(SUN_POS);
  halo.scale.setScalar(480);
  disc.scale.setScalar(30);
  halo.renderOrder = 1;
  disc.renderOrder = 2;
  scene.add(halo, disc);

  let haloAlpha = 0.5;
  function applyTheme() {
    const p = readPalette();
    const u = material.uniforms;
    u.uShadow.value.set(p.shadow);
    u.uMid.value.set(p.mid);
    u.uLit.value.set(p.lit);
    u.uFog.value.set(p.fog);
    u.uLitK.value = p.litK;
    u.uRimK.value = p.rimK;
    discMat.color.set(p.sun);
    haloMat.color.set(p.halo);
    haloAlpha = p.haloAlpha;
  }

  // ---- sizing
  function resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setPixelRatio(isMobile() ? 1 : Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.fov = camera.aspect < 1 ? 62 : 45; // portrait: widen so more of the valley fits
    camera.updateProjectionMatrix();
  }

  // ---- scroll parallax (damped)
  let scrollTarget = 0;
  let scrollEased = 0;
  const readScroll = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    scrollTarget = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
  };

  const look = new Vector3();
  function update(t: number) {
    scrollEased += (scrollTarget - scrollEased) * 0.06;
    // Sin-based drift: loop-friendly, never resets.
    camera.position.set(
      BASE_POS.x + Math.sin(t * 0.045) * 16,
      BASE_POS.y + scrollEased * 7 + Math.sin(t * 0.031) * 1.2,
      BASE_POS.z + Math.sin(t * 0.021) * 14,
    );
    look.copy(BASE_LOOK);
    look.x += Math.sin(t * 0.037 + 1.3) * 22;
    look.y -= scrollEased * 26; // pitch eases down as the page scrolls
    camera.lookAt(look);

    const pulse = 0.95 + 0.05 * Math.sin((t / 10) * Math.PI * 2); // 0.9..1 over ~10s
    discMat.opacity = pulse;
    haloMat.opacity = haloAlpha * pulse;
  }

  function render(t: number) {
    update(t);
    renderer.render(scene, camera);
  }

  // ---- loop (capped ~30fps, paused when hidden)
  let raf = 0;
  let last = 0;
  let clock0 = performance.now();
  function tick(now: number) {
    raf = requestAnimationFrame(tick);
    if (now - last < 30) return; // ~30fps cap; 30ms tolerates vsync jitter at 60Hz
    last = now;
    render((now - clock0) / 1000);
  }
  const start = () => {
    if (raf || reduced.matches || document.hidden || lost) return;
    raf = requestAnimationFrame(tick);
  };
  const stop = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
  };
  const renderStatic = () => render(0);

  // ---- listeners
  let lost = false;
  let resizeTimer = 0;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      resize();
      readScroll();
      if (!raf) renderStatic();
    }, 150);
  };
  const onScroll = () => {
    readScroll();
    if (!raf && !reduced.matches) start();
  };
  const onVisibility = () => (document.hidden ? stop() : start());
  const onMotion = () => {
    if (reduced.matches) {
      stop();
      scrollEased = scrollTarget;
      renderStatic();
    } else {
      start();
    }
  };
  const themeObserver = new MutationObserver(() => {
    applyTheme();
    if (!raf) renderStatic();
  });
  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    stop();
    revealFallback();
  };
  const onPageHide = (e: PageTransitionEvent) => {
    if (e.persisted) stop(); // bfcache: keep alive, pause
    else dispose();
  };
  const onPageShow = (e: PageTransitionEvent) => {
    if (e.persisted) start();
  };

  function revealFallback() {
    root.classList.remove('has-3d', 'has-3d-done');
  }

  let disposed = false;
  function dispose() {
    if (disposed) return;
    disposed = true;
    stop();
    clearTimeout(resizeTimer);
    clearTimeout(doneTimer);
    themeObserver.disconnect();
    window.removeEventListener('resize', onResize);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('pagehide', onPageHide);
    window.removeEventListener('pageshow', onPageShow);
    document.removeEventListener('visibilitychange', onVisibility);
    canvas.removeEventListener('webglcontextlost', onLost);
    reduced.removeEventListener('change', onMotion);
    geo.dispose();
    material.dispose();
    discTex.dispose();
    haloTex.dispose();
    discMat.dispose();
    haloMat.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    revealFallback();
  }

  // ---- boot
  let doneTimer = 0;
  try {
    applyTheme();
    resize();
    readScroll();
    scrollEased = scrollTarget;
    renderStatic(); // first frame, then swap in the canvas and retire the SVG
    root.classList.add('has-3d');
    doneTimer = window.setTimeout(() => root.classList.add('has-3d-done'), 1100);
  } catch (err) {
    dispose();
    throw err;
  }

  canvas.addEventListener('webglcontextlost', onLost);
  window.addEventListener('resize', onResize, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pagehide', onPageHide);
  window.addEventListener('pageshow', onPageShow);
  document.addEventListener('visibilitychange', onVisibility);
  reduced.addEventListener('change', onMotion);
  themeObserver.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
  start();

  return dispose;
}
