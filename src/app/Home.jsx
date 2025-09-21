import { Footer } from "../components/layout/Footer/Footer";
import { Header } from "../components/layout/Header/Header";
import { Educacion } from "../components/sections/Educacion";
import { Hero } from "../components/sections/Hero";
import { Proyecto } from "../components/sections/Proyecto";
import { Stack } from "../components/sections/stack";

export function Home({ setDarkMode, darkMode }) {
  return (
    <div
      className={`min-h-screen flex flex-col gap-10 p-10 ${
        darkMode ? "text-slate-100" : "text-slate-800"
      }`}
    >
      {/* Header */}
      <Header setDarkMode={setDarkMode} darkMode={darkMode} />
      {/* Imagen o presentación principal */}
      <Hero darkMode={darkMode} />
      {/* Scroll */}
      <Stack darkMode={darkMode} />
      {/* Grid de dos bloques */}
      <div className="flex gap-10 justify-center mt-2">
        {/* Proyectos */}
        <Proyecto darkMode={darkMode} />
        {/* Contacto */}
        <Educacion darkMode={darkMode} />
      </div>
      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
