import {
  VscGithub,
  VscMail,
  VscTwitter,
  VscLocation,
  VscCalendar,
  VscGlobe,
} from "react-icons/vsc";
import { FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

export function Footer({ darkMode }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`mt-auto backdrop-blur-md rounded-xl border-t transition-colors duration-300 ${
        darkMode
          ? "bg-slate-800/40 border-slate-600/30"
          : "bg-white/10 border-white/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Contenido principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Información Personal */}
          <div className="space-y-4">
            <h3
              className={`text-xl font-bold mb-4 ${
                darkMode ? "text-slate-100" : "text-slate-800"
              }`}
            >
              Jesús Calles
            </h3>
            <div
              className={`flex items-center space-x-2 text-sm ${
                darkMode ? "text-slate-400" : "text-slate-800"
              }`}
            >
              <VscLocation className="text-blue-500 text-4xl" />
              <span>Venezuela</span>
            </div>
            <div
              className={`flex items-center space-x-2 text-sm ${
                darkMode ? "text-slate-400" : "text-slate-800"
              }`}
            >
              <VscCalendar className="text-green-500 text-4xl" />
              <span>Disponible para proyectos</span>
            </div>
          </div>

          {/* Enlaces de Contacto */}
          <div className="space-y-4">
            <h3
              className={`text-xl font-bold mb-4 ${
                darkMode ? "text-slate-100" : "text-slate-800"
              }`}
            >
              Contacto
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:jactcalles@gmail.com"
                className={`flex items-center space-x-3 transition-colors group ${
                  darkMode
                    ? "text-slate-300 hover:text-slate-100"
                    : "text-slate-800 hover:text-slate-600"
                }`}
              >
                <div
                  className={`backdrop-blur-sm p-3 rounded-lg transition-colors border ${
                    darkMode
                      ? "bg-slate-700/30 border-slate-600/30 group-hover:bg-blue-600/30"
                      : "bg-white/20 border-white/30 group-hover:bg-blue-500/30"
                  }`}
                >
                  <VscMail className="text-xl" />
                </div>
                <span className="text-sm">jactcalles@gmail.com</span>
              </a>

              <a
                href="https://github.com/YiMonk"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 transition-colors group ${
                  darkMode
                    ? "text-slate-300 hover:text-slate-100"
                    : "text-slate-800 hover:text-slate-600"
                }`}
              >
                <div
                  className={`backdrop-blur-sm p-3 rounded-lg transition-colors border ${
                    darkMode
                      ? "bg-slate-700/30 border-slate-600/30 group-hover:bg-gray-800/30"
                      : "bg-white/20 border-white/30 group-hover:bg-gray-800/30"
                  }`}
                >
                  <VscGithub className="text-xl" />
                </div>
                <span className="text-sm">github.com/YiMonk</span>
              </a>

              <a
                href="https://www.linkedin.com/in/jesus-calles/"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 transition-colors group ${
                  darkMode
                    ? "text-slate-300 hover:text-slate-100"
                    : "text-slate-800 hover:text-slate-600"
                }`}
              >
                <div
                  className={`backdrop-blur-sm p-3 rounded-lg transition-colors border ${
                    darkMode
                      ? "bg-slate-700/30 border-slate-600/30 group-hover:bg-blue-700/30"
                      : "bg-white/20 border-white/30 group-hover:bg-blue-700/30"
                  }`}
                >
                  <FaLinkedin className="text-xl" />
                </div>
                <span className="text-sm">LinkedIn Profile</span>
              </a>

              <a
                href="https://wa.me/584241306265"
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center space-x-3 transition-colors group ${
                  darkMode
                    ? "text-slate-300 hover:text-slate-100"
                    : "text-slate-800 hover:text-slate-600"
                }`}
              >
                <div
                  className={`backdrop-blur-sm p-3 rounded-lg transition-colors border ${
                    darkMode
                      ? "bg-slate-700/30 border-slate-600/30 group-hover:bg-green-600/30"
                      : "bg-white/20 border-white/30 group-hover:bg-green-600/30"
                  }`}
                >
                  <FaWhatsapp className="text-xl" />
                </div>
                <span className="text-sm">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Servicios y Especialidades */}
          <div className="space-y-4">
            <h3
              className={`text-xl font-bold mb-4 ${
                darkMode ? "text-slate-100" : "text-slate-800"
              }`}
            >
              Especialidades
            </h3>
            <div className="space-y-2">
              <div
                className={`flex items-center space-x-2 text-sm ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <VscGlobe className="text-purple-500 text-lg" />
                <span>Desarrollo Frontend</span>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <VscGlobe className="text-pink-500 text-lg" />
                <span>Diseño UX/UI</span>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <VscGlobe className="text-orange-500 text-lg" />
                <span>Diseño Gráfico</span>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <VscGlobe className="text-cyan-500 text-lg" />
                <span>Ilustración Digital</span>
              </div>
              <div
                className={`flex items-center space-x-2 text-sm ${
                  darkMode ? "text-slate-300" : "text-slate-600"
                }`}
              >
                <VscGlobe className="text-yellow-500 text-lg" />
                <span>Freelance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div
          className={`border-t pt-6 ${
            darkMode ? "border-slate-600/30" : "border-white/30"
          }`}
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div
              className={`text-sm ${
                darkMode ? "text-slate-400" : "text-slate-800"
              }`}
            >
              © {currentYear} Jesús Calles.
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-slate-400" : "text-slate-700"
              }`}
            >
              Desarrollado con ❤️ y React
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
