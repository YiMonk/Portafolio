import { Route, Routes } from "react-router-dom";

import { routesConfig } from "./routesConfig";
export function MyRoutes() {
  return (
    <Routes>
      {routesConfig.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}
