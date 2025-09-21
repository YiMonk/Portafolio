import { VscArrowCircleDown, VscGithub, VscMail } from "react-icons/vsc";

export function Hero({ darkMode }) {
  return (
    <div
      className={`h-80 mx-auto w-7/12 flex gap-16 justify-between ${
        darkMode ? "text-slate-100" : "text-slate-800"
      }`}
    >
      <section
        className={`w-2/5 ${
          darkMode ? "bg-slate-700" : "bg-gray-300"
        } rounded-4xl flex items-center justify-center`}
      >
        foto
      </section>

      <section className="w-3/5 flex flex-col items-start justify-center space-y-5">
        <p className="w-full text-xl">Hola! me llamo</p>
        <h1 className="w-full font-bold text-4xl">JESUS CALLES</h1>
        <h2
          className={`w-full text-xl font-medium ${
            darkMode ? "text-slate-200" : "text-slate-600"
          }`}
        >
          Developer FrontEnd
        </h2>
        <p
          className={`w-full text-base text-right ${
            darkMode ? "text-slate-200" : "text-slate-800"
          }`}
        >
          Soy un Desarrollador web con orientación al front-end, mis habilidades
          no se centran solo en el código, sino también he sido freelance como
          diseñador gráfico e ilustración digital y UX / UI Designer.
        </p>

        <div className="mt-4 w-full flex gap-4 justify-end">
          <div
            className={`bg-slate-400/40 shadow-xl p-5 rounded-2xl text-2xl transition-colors cursor-pointer ${
              darkMode
                ? "text-slate-200 hover:bg-slate-700 hover:text-slate-400"
                : "text-slate-600 hover:bg-gray-700 hover:text-slate-400"
            }`}
          >
            <VscGithub />
          </div>
          <div
            className={`bg-slate-400/40 shadow-xl p-5 rounded-2xl text-2xl transition-colors cursor-pointer ${
              darkMode
                ? "text-slate-200 hover:bg-slate-700 hover:text-slate-400"
                : "text-slate-600 hover:bg-gray-700 hover:text-slate-400"
            }`}
          >
            <VscMail />
          </div>
          <div
            className={`bg-slate-400/40 shadow-xl p-5 rounded-2xl text-2xl transition-colors cursor-pointer ${
              darkMode
                ? "text-slate-200 hover:bg-slate-700 hover:text-slate-400"
                : "text-slate-600 hover:bg-gray-700 hover:text-slate-400"
            }`}
          >
            <VscArrowCircleDown />
          </div>
        </div>
      </section>
    </div>
  );
}
