import { VscArrowCircleDown, VscGithub, VscMail } from "react-icons/vsc";
import foto from "../../img/foto.png";

export function Hero({ darkMode }) {
  return (
    <div
      className={`w-full max-w-7xl mx-auto flex flex-col sm:flex-row gap-6 sm:gap-16 justify-between px-2 sm:px-0 ${
        darkMode ? "text-slate-100" : "text-slate-800"
      }`}
    >
      <section
        className={`w-full sm:w-2/5 ${
          darkMode ? "bg-slate-700" : "bg-gray-300"
        } rounded-4xl flex items-center justify-center h-48 sm:h-80`}
      >
        <img
          src={foto}
          alt="Foto de perfil"
          className="w-full h-full object-cover rounded-4xl"
        />
      </section>

      <section className="w-full sm:w-3/5 flex flex-col items-start justify-center space-y-3 sm:space-y-5">
        <p className="w-full text-lg sm:text-xl">Hola! me llamo</p>
        <h1 className="w-full font-bold text-3xl sm:text-4xl">JESUS CALLES</h1>
        <h2
          className={`w-full text-lg sm:text-xl font-medium ${
            darkMode ? "text-slate-200" : "text-slate-600"
          }`}
        >
          Developer FrontEnd
        </h2>
        <p
          className={`w-full text-sm sm:text-base text-left ${
            darkMode ? "text-slate-200" : "text-slate-800"
          }`}
        >
          Soy un Desarrollador web con orientación al front-end, mis habilidades
          no se centran solo en el código, sino también he sido freelance como
          diseñador gráfico e ilustración digital y UX / UI Designer.
        </p>

        <div className="mt-4 w-full flex gap-4 justify-start sm:justify-end">
          <a href="https://github.com/YiMonk" target="_blank" rel="noreferrer"
            className={`bg-slate-400/40 shadow-xl p-5 rounded-2xl text-2xl transition-colors cursor-pointer ${
              darkMode
                ? "text-slate-200 hover:bg-slate-700 hover:text-slate-400"
                : "text-slate-600 hover:bg-gray-700 hover:text-slate-400"
            }`}
          >
            <VscGithub />
          </a>
          {/* <div
            className={`bg-slate-400/40 shadow-xl p-5 rounded-2xl text-2xl transition-colors cursor-pointer ${
              darkMode
                ? "text-slate-200 hover:bg-slate-700 hover:text-slate-400"
                : "text-slate-600 hover:bg-gray-700 hover:text-slate-400"
            }`}
          >
            <VscMail />
          </div> */}
          {/* <div
            className={`bg-slate-400/40 shadow-xl p-5 rounded-2xl text-2xl transition-colors cursor-pointer ${
              darkMode
                ? "text-slate-200 hover:bg-slate-700 hover:text-slate-400"
                : "text-slate-600 hover:bg-gray-700 hover:text-slate-400"
            }`}
          >
            <VscArrowCircleDown />
          </div> */}
        </div>
      </section>
    </div>
  );
}
