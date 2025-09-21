import { useMemo } from "react";

// src/features/projects/hooks/useFilterProjects.js
export const useFilterProjects = (tag) => {
  const projects = useProjectStore((state) => state.projects);

  return useMemo(() => {
    return tag ? projects.filter((p) => p.tags.includes(tag)) : projects;
  }, [projects, tag]);
};
