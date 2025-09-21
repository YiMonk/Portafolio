import { useEffect, useRef, useState } from "react";

// Lista de tecnologías a mostrar en el carrusel
const tecnologias = [
  { tecnologia: "React", icono: "⚛️" },
  { tecnologia: "Vue", icono: "🟩" },
  { tecnologia: "Angular", icono: "🅰️" },
  { tecnologia: "Svelte", icono: "🔥" },
  { tecnologia: "Node.js", icono: "🟢" },
  { tecnologia: "TypeScript", icono: "🔷" },
  { tecnologia: "Tailwind", icono: "🌬️" },
];

export function Stack({ darkMode }) {
  const carouselRef = useRef(null);
  const [paused, setPaused] = useState(false);

  // Duplicar las tarjetas para crear el efecto de carrusel infinito
  const cards = [...tecnologias, ...tecnologias, ...tecnologias];

  // Inicializa el scroll en la primera copia duplicada SOLO al montar
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const singleListWidth = carousel.scrollWidth / 3;
      carousel.scrollLeft = singleListWidth;
    }
  }, []);

  // Animación automática del carrusel, se pausa con el mouse
  useEffect(() => {
    const carousel = carouselRef.current;
    let animationFrame;
    const scrollAmount = 1; // velocidad del scroll aumentada

    function animate() {
      if (!paused && carousel) {
        carousel.scrollLeft += scrollAmount;
        // Si llega al final de la segunda copia, resetea al inicio de la segunda copia (efecto bucle sin salto)
        const singleListWidth = carousel.scrollWidth / 3;
        if (carousel.scrollLeft >= singleListWidth * 2) {
          carousel.scrollLeft = singleListWidth;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [paused]);

  return (
    <div className="w-full flex justify-center items-center py-16">
      <div
        ref={carouselRef}
        className="overflow-x-auto no-scrollbar w-[90vw] max-w-7xl whitespace-nowrap select-none relative"
        style={{
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskImage:
            "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {cards.map((item, idx) => (
          <div
            key={idx}
            className={`inline-block align-middle mx-4 p-6 rounded-2xl shadow-lg justify-center items-center text-xl min-w-[180px] max-w-xs transition-all duration-300 hover:scale-105 ${
              darkMode
                ? "bg-slate-700/60 text-slate-100"
                : "bg-gray-200/60 text-slate-800"
            }`}
            style={{ boxShadow: "0 4px 24px #0001", minWidth: "180px" }}
          >
            <div className="flex flex-row items-center justify-center gap-2 w-full h-full">
              <span className="text-3xl">{item.icono}</span>
              <span className="text-lg font-semibold tracking-wide text-center">
                {item.tecnologia}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
