import { javaTrainings } from "./java.training";
import { pythonTrainings } from "./python.training";
import { aiTrainings } from "./ai.training";
import { cyberTrainings } from "./cyber.training";
import { devopsTrainings } from "./devops.training";

export { javaTrainings } from "./java.training";
export { pythonTrainings } from "./python.training";
export { aiTrainings } from "./ai.training";
export { cyberTrainings } from "./cyber.training";
export { devopsTrainings } from "./devops.training";

export const trainings = [
  ...javaTrainings,
  ...pythonTrainings,
  ...aiTrainings,
  ...cyberTrainings,
  ...devopsTrainings,
];
