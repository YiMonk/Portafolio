import { useState, useEffect } from "react";
import { EDUCACION } from "../../lib/constants/DataEducacion";

export function Educacion({ darkMode, open, setOpen }) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = typeof open === "boolean" && typeof setOpen === "function";
  const modalOpen = isControlled ? open : internalOpen;
  const setModalOpen = isControlled ? setOpen : setInternalOpen;
  const [currentIndex, setCurrentIndex] = useState(0);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === EDUCACION.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const currentItem = EDUCACION[currentIndex];

  return (
    <>
      {/* Div principal con estilo cristal y carrusel - MÁS GRANDE */}
      <div
        className="relative w-full sm:w-2/3 h-28 sm:h-36 cursor-pointer group"
        onClick={() => setModalOpen(true)}
      >
        {/* Fondo cristal */}
        <div className={`absolute inset-0 backdrop-blur-md rounded-xl border shadow-lg group-hover:shadow-xl transition-all duration-300 ${
          darkMode
            ? "bg-slate-800/20 border-slate-600/30 group-hover:bg-slate-700/30"
            : "bg-white/20 border-white/30 group-hover:bg-white/30"
        }`}>
          {/* Contenido del carrusel */}
          <div className="h-full flex items-center justify-center p-6">
            <div className="flex items-center space-x-6 w-full">
              {/* Icono grande */}
              <div className="text-5xl flex-shrink-0">{currentItem.icono}</div>

              {/* Texto con jerarquía tipográfica */}
              <div className="flex-1 min-w-0">
                <h3 className={`text-lg font-bold truncate mb-1 ${
                  darkMode ? "text-slate-100" : "text-slate-800"
                }`}>
                  {currentItem.titulo}
                </h3>
                <p className={`text-sm truncate mb-1 ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}>
                  {currentItem.institucion}
                </p>
                <p className={`text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}>
                  {currentItem.periodo}
                </p>
              </div>
            </div>
          </div>

          {/* Indicadores del carrusel */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {EDUCACION.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? (darkMode ? "bg-slate-300/80" : "bg-white/80")
                    : (darkMode ? "bg-slate-500/40" : "bg-white/40")
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal expandida */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className={`rounded-2xl shadow-2xl p-8 w-full max-w-5xl h-[85vh] relative animate-fadeIn overflow-hidden ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`absolute top-4 right-4 text-2xl z-10 transition-colors ${
                darkMode 
                  ? "text-slate-400 hover:text-slate-200" 
                  : "text-gray-400 hover:text-gray-700"
              }`}
              onClick={() => setModalOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2 className={`text-3xl font-bold mb-6 ${
              darkMode ? "text-slate-100" : "text-slate-800"
            }`}>
              Educación
            </h2>

            <div className="h-[calc(100%-120px)] overflow-y-auto pr-2 educacion-scroll">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {EDUCACION.map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg p-6 transition-colors ${
                      darkMode 
                        ? "bg-slate-700/50 hover:bg-slate-700/70" 
                        : "bg-gray-50 hover:bg-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">{item.icono}</span>
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold mb-2 ${
                          darkMode ? "text-slate-100" : "text-slate-700"
                        }`}>
                          {item.titulo}
                        </h3>
                        <p className={`text-sm mb-3 ${
                          darkMode ? "text-slate-300" : "text-slate-600"
                        }`}>
                          {item.institucion}
                        </p>
                        <p className={`text-sm mb-4 ${
                          darkMode ? "text-slate-400" : "text-slate-500"
                        }`}>
                          {item.periodo}
                        </p>
                        {item.link && item.link.trim() !== "" && (
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors inline-block"
                          >
                            Ver {item.tipo}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
