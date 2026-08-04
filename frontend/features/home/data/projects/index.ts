export { aiProjects } from "./ai.projects";
export { enterpriseProjects } from "./enterprise.projects";
export { webProjects } from "./web.projects";
export { mobileProjects } from "./mobile.projects";
export { iotProjects } from "./iot.projects";
export { ieeeProjects } from "./ieee.projects";

import { aiProjects } from "./ai.projects";
import { enterpriseProjects } from "./enterprise.projects";
import { webProjects } from "./web.projects";
import { mobileProjects } from "./mobile.projects";
import { iotProjects } from "./iot.projects";
import { ieeeProjects } from "./ieee.projects";

export const projects = [
  ...aiProjects,
  ...enterpriseProjects,
  ...webProjects,
  ...mobileProjects,
  ...iotProjects,
  ...ieeeProjects,
];
