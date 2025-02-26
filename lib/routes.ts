import { PracticeCharts } from "./contexts/practiceChartContext";

const routes: [string, string][] = [
  ["Home", "/"],
  ["Practice", "/practice"],
  ["Games", "/games"],
  ["Translate", "/translate"],
];

const practiceRoutes: [string, PracticeCharts][] = [
  ["Declension Endings", PracticeCharts.DeclensionEndings],
  ["Future Tense", PracticeCharts.FutureTense],
  ["Perfect Tense", PracticeCharts.PerfectTense],
  ["Personal Endings", PracticeCharts.PersonalEndings],
  ["Personal Pronouns", PracticeCharts.PersonalPronouns],
  ["Relative Pronouns", PracticeCharts.RelativePronouns],
];

export { routes, practiceRoutes };
