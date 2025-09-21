import { useState, useEffect } from "react";
import { PROJECTS } from "../../lib/constants/DataProjets";

export function Proyecto({ darkMode }) {
  const [open, setOpen] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  // Carrusel automático
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % PROJECTS.length);
    }, 3000); // Cambia cada 3 segundos

    return () => clearInterval(interval);
  }, []);

  const currentProject = PROJECTS[currentProjectIndex];

  return (
    <>
      {/* Div principal con estilo cristal y carrusel - MÁS GRANDE */}
      <div
        className="relative w-2/3 h-36 cursor-pointer group"
        onClick={() => setOpen(true)}
      >
        {/* Fondo cristal */}
        <div
          className={`absolute inset-0 backdrop-blur-md rounded-xl border shadow-lg group-hover:shadow-xl transition-all duration-300 ${
            darkMode
              ? "bg-slate-800/20 border-slate-600/30 group-hover:bg-slate-700/30"
              : "bg-white/20 border-white/30 group-hover:bg-white/30"
          }`}
        >
          {/* Contenido del carrusel */}
          <div className="h-full flex items-center justify-center p-6">
            <div className="flex items-center space-x-6 w-full">
              {/* Icono grande */}
              <div className="text-5xl flex-shrink-0">
                {currentProject.icono}
              </div>

              {/* Texto con jerarquía tipográfica */}
              <div className="flex-1 min-w-0">
                <h3
                  className={`text-lg font-bold truncate mb-1 ${
                    darkMode ? "text-slate-100" : "text-slate-800"
                  }`}
                >
                  {currentProject.titulo}
                </h3>
                <p
                  className={`text-sm truncate mb-2 ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {currentProject.descripcion}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {currentProject.tecnologias.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded text-xs ${
                        darkMode
                          ? "bg-slate-600/80 text-slate-200"
                          : "bg-slate-200/80 text-slate-700"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                  {currentProject.tecnologias.length > 3 && (
                    <span
                      className={`text-xs ${
                        darkMode ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      +{currentProject.tecnologias.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Indicadores del carrusel */}
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {PROJECTS.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentProjectIndex
                    ? darkMode
                      ? "bg-slate-300/80"
                      : "bg-white/80"
                    : darkMode
                    ? "bg-slate-500/40"
                    : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Modal expandida */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className={`rounded-2xl shadow-2xl p-8 w-full max-w-6xl h-[90vh] relative animate-fadeIn overflow-hidden ${
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
              onClick={() => setOpen(false)}
              aria-label="Cerrar"
            >
              ×
            </button>
            <h2
              className={`text-3xl font-bold mb-6 ${
                darkMode ? "text-slate-100" : "text-slate-800"
              }`}
            >
              Proyectos
            </h2>

            <div className="h-[calc(100%-120px)] overflow-y-auto pr-2 educacion-scroll">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {PROJECTS.map((proyecto) => (
                  <div
                    key={proyecto.id}
                    className={`rounded-lg p-6 transition-colors ${
                      darkMode
                        ? "bg-slate-700/50 hover:bg-slate-700/90"
                        : "bg-gray-50 hover:bg-gray-300"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className="text-3xl flex-shrink-0">
                        {proyecto.icono}
                      </span>
                      <div className="flex-1">
                        <h3
                          className={`text-lg font-semibold mb-3 ${
                            darkMode ? "text-slate-100" : "text-slate-700"
                          }`}
                        >
                          {proyecto.titulo}
                        </h3>
                        <p
                          className={`text-sm mb-4 leading-relaxed ${
                            darkMode ? "text-slate-300" : "text-slate-600"
                          }`}
                        >
                          {proyecto.descripcion}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {proyecto.tecnologias.map((tech, index) => (
                            <span
                              key={index}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                darkMode
                                  ? "bg-slate-600 text-slate-200"
                                  : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <div className="flex gap-3">
                          {proyecto.link && (
                            <a
                              href={proyecto.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              Ver Código
                            </a>
                          )}
                          {proyecto.demo && (
                            <a
                              href={proyecto.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                              Ver Demo
                            </a>
                          )}
                        </div>
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
