// src/pages/index.js
import { lazy } from "react";

export const componentsByKey = {
  home: lazy(() => import("./Home")),
  campaigns: lazy(() => import("./Campaigns")),
  flows: lazy(() => import("./Flows")),
  forms: lazy(() => import("./Forms")),
//   reviews: lazy(() => import("./Reviews")),
//   inbox: lazy(() => import("./Inbox")),
//   audience: lazy(() => import("./Audience")),
//   content: lazy(() => import("./Content")),
//   analytics: lazy(() => import("./Analytics")),
};