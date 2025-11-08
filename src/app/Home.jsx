import { Footer } from "../components/layout/Footer/Footer";
import { Header } from "../components/layout/Header/Header";
import { Educacion } from "../components/sections/Educacion";
import { Hero } from "../components/sections/Hero";
import { Proyecto } from "../components/sections/Proyecto";
import { Stack } from "../components/sections/stack";
import { useState } from "react";

export function Home({ setDarkMode, darkMode }) {
  const [proyectosOpen, setProyectosOpen] = useState(false);
  const [educacionOpen, setEducacionOpen] = useState(false);
  return (
    <div
      className={`min-h-screen flex flex-col gap-10 p-4 sm:p-10 ${
        darkMode ? "text-slate-100" : "text-slate-800"
      }`}
    >
      {/* Header */}
      <Header
        setDarkMode={setDarkMode}
        darkMode={darkMode}
        onOpenProyectos={() => setProyectosOpen(true)}
        onOpenEducacion={() => setEducacionOpen(true)}
      />
      {/* Imagen o presentación principal */}
      <Hero darkMode={darkMode} />
      {/* Scroll */}
      <Stack darkMode={darkMode} />
      {/* Grid de dos bloques */}
      <div className="flex flex-col sm:flex-row gap-6 sm:gap-10 justify-center mt-2">
        {/* Proyectos */}
        <Proyecto
          darkMode={darkMode}
          open={proyectosOpen}
          setOpen={setProyectosOpen}
        />
        {/* Contacto */}
        <Educacion
          darkMode={darkMode}
          open={educacionOpen}
          setOpen={setEducacionOpen}
        />
      </div>
      {/* Footer */}
      <Footer darkMode={darkMode} />
    </div>
  );
}
