"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import relativePronouns from "@/lib/data/practice/relative-pronouns";
import personalPronouns from "@/lib/data/practice/personal-pronouns";
import personalEndings from "@/lib/data/practice/personal-endings";
import perfectTense from "@/lib/data/practice/perfect-tense";
import futureTense from "@/lib/data/practice/future-tense";
import declensions from "@/lib/data/practice/declensions";
import chartProps from "../types/chartProps";

export const PracticeChartContext = createContext({});

export const usePracticeChartContext = () => useContext(PracticeChartContext);

export enum PracticeCharts {
  DeclensionEndings,
  FutureTense,
  PerfectTense,
  PersonalEndings,
  PersonalPronouns,
  RelativePronouns,
}

interface PracticeChartContextProviderProps {
  children: ReactNode;
}

export function PracticeChartContextProvider({
  children,
}: PracticeChartContextProviderProps): JSX.Element {
  const [currentChart, setCurrentChart] = useState<PracticeCharts>(
    PracticeCharts.DeclensionEndings,
  );
  let chartData: chartProps = declensions;

  const updateCurrentChart = (chart: PracticeCharts) => {
    setCurrentChart(chart);

    switch (chart) {
      case PracticeCharts.DeclensionEndings:
        chartData = declensions;
        break;
      case PracticeCharts.FutureTense:
        chartData = futureTense;
        break;
      case PracticeCharts.PerfectTense:
        chartData = perfectTense;
        break;
      case PracticeCharts.PersonalEndings:
        chartData = personalEndings;
        break;
      case PracticeCharts.PersonalPronouns:
        chartData = personalPronouns;
        break;
      case PracticeCharts.RelativePronouns:
        chartData = relativePronouns;
        break;
    }
  };

  return (
    <PracticeChartContext.Provider
      value={{
        currentChart: currentChart,
        data: chartData,
        updateCurrentChart,
      }}
    >
      {children}
    </PracticeChartContext.Provider>
  );
}
