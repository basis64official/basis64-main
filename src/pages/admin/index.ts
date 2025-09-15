// src/pages/index.ts
import React from "react";
import type { ComponentType, LazyExoticComponent } from "react";
import { Utils } from "../../utils/utils";

const modules = import.meta.glob("./*.tsx");

type Page = {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
};

export const adminPages: Page[] = [];

for (const path in modules) {
  // Contoh: "./About.tsx" -> "/about"
  const routePath =
    path === "./admin/Dashboard.tsx" ? "/admin/" : "/admin/" + Utils.camelToKebab(path.replace(/^\.\/|\.tsx$/g, ""));

  const component = React.lazy(modules[path] as any);

  adminPages.push({ path: routePath, component });
}

