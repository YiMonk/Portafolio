import { AiFillMoon, AiFillSun } from "react-icons/ai";

export function Header({ setDarkMode, darkMode }) {
  return (
    <div className="h-10 px-50 flex justify-between items-center p-5 mb-15 ">
      <div className="flex gap-x-10 text-lg  font-normal ">
        <span
          className={`hover:cursor-pointer hover:text-sky-800 underline-animated ${
            darkMode ? "text-slate-100" : "text-slate-600"
          }`}
        >
          Proyectos
        </span>
        <span
          className={`hover:cursor-pointer hover:text-sky-800 underline-animated ${
            darkMode ? "text-slate-100" : "text-slate-600"
          }`}
        >
          Experiencia
        </span>
        <span
          className={`hover:cursor-pointer hover:text-sky-800 underline-animated ${
            darkMode ? "text-slate-100" : "text-slate-600"
          }`}
        >
          Educacion
        </span>
        <span
          className={`hover:cursor-pointer hover:text-sky-800 underline-animated ${
            darkMode ? "text-slate-100" : "text-slate-600"
          }`}
        >
          Contacto
        </span>
      </div>

      <div
        className={
          "border border-gray-300 rounded-full px-6 py-2 hover:cursor-pointer hover:bg-gray-600 transition-colors duration-200 " +
          (darkMode ? "bg-slate-800 border-slate-500" : "")
        }
        onClick={() => setDarkMode((prev) => !prev)}
        title={darkMode ? "Tema claro" : "Tema oscuro"}
      >
        {darkMode ? (
          <AiFillSun className="text-xl text-yellow-300" />
        ) : (
          <AiFillMoon className="text-xl text-slate-700" />
        )}
      </div>
    </div>
  );
}
