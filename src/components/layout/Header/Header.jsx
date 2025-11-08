import { AiFillMoon, AiFillSun } from "react-icons/ai";

export function Header({ setDarkMode, darkMode, onOpenProyectos, onOpenEducacion }) {
  return (
    <div className="min-h-10 flex justify-between items-center p-4 sm:p-5 mb-6 sm:mb-10">
      <div className="flex gap-x-5 sm:gap-x-10 text-sm sm:text-lg font-normal hover:cursor-pointer transition-all duration-200">
        <span
          className={`hover:cursor-pointer hover:text-blue-300 hover:font-bold underline-animated ${
            darkMode ? "text-slate-100" : "text-slate-600"
          }`}
          onClick={() => onOpenProyectos && onOpenProyectos()}
        >
          Proyectos
        </span>

        <span
          className={`hover:cursor-pointer hover:text-blue-300 hover:font-bold underline-animated ${
            darkMode ? "text-slate-100" : "text-slate-600"
          }`}
          onClick={() => onOpenEducacion && onOpenEducacion()}
        >
          Educacion
        </span>    
      </div>

      <div
        className={
          "border border-gray-300 rounded-full px-4 sm:px-6 py-2 hover:cursor-pointer hover:bg-gray-300 transition-colors duration-200 " +
          (darkMode ? "bg-slate-800 border-slate-500" : "")
        }
        onClick={() => setDarkMode((prev) => !prev)}
        title={darkMode ? "Tema claro" : "Tema oscuro"}
      >
        {darkMode ? (
          <AiFillSun className="text-lg sm:text-xl text-yellow-300" />
        ) : (
          <AiFillMoon className="text-lg sm:text-xl text-slate-700" />
        )}
      </div>
    </div>
  );
}
