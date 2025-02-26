"use client";

import { PracticeChartContextProvider } from "@/lib/contexts/practiceChartContext";
import { useEffect } from "react";
import {
  usePracticeChartContext,
  PracticeCharts,
} from "@/lib/contexts/practiceChartContext";

export default function WordLadderLayoutWrapper({
  children,
}: {
  children: any;
}) {
  return (
    <PracticeChartContextProvider>
      <WordLadderLayout>{children}</WordLadderLayout>
    </PracticeChartContextProvider>
  );
}

function WordLadderLayout({ children }: { children: any }) {
  const { updateCurrentChart } = usePracticeChartContext() as {
    updateCurrentChart: (chart: PracticeCharts) => void;
  };

  useEffect(() => {
    const updateChartFromUrl = () => {
      const url = new URL(window.location.href);
      if (!url.toString().includes("chart")) {
        return;
      }
      let type = url.searchParams.get("type");

      switch (type) {
        case "declension-endings":
          updateCurrentChart(PracticeCharts.DeclensionEndings);
          break;
        case "future-tense":
          updateCurrentChart(PracticeCharts.FutureTense);
          break;
        case "perfect-tense":
          updateCurrentChart(PracticeCharts.PerfectTense);
          break;
        case "personal-endings":
          updateCurrentChart(PracticeCharts.PersonalEndings);
          break;
        case "personal-pronouns":
          updateCurrentChart(PracticeCharts.PersonalPronouns);
          break;
        case "relative-pronouns":
          updateCurrentChart(PracticeCharts.RelativePronouns);
          break;
        default:
          updateCurrentChart(PracticeCharts.DeclensionEndings);
          break;
      }
    };

    updateChartFromUrl(); // Initial check

    window.addEventListener("popstate", updateChartFromUrl);
    return () => window.removeEventListener("popstate", updateChartFromUrl);
  }, []);

  return children;
}
