"use client";

import { PracticeChartContextProvider } from "@/lib/contexts/practiceChartContext";

export default function WordLadderLayout({ children }: { children: any }) {
  return (
    <PracticeChartContextProvider>{children}</PracticeChartContextProvider>
  );
}
