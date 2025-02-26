"use client";

import Button from "@/components/shared/button";
import { practiceRoutes } from "@/lib/routes";
import {
  usePracticeChartContext,
  PracticeCharts,
} from "@/lib/contexts/practiceChartContext";

import { useRouter } from "next/navigation";

export default function Practice() {
  const router = useRouter();

  const { updateCurrentChart } = usePracticeChartContext() as {
    updateCurrentChart: (chart: PracticeCharts) => void;
  };

  const gotoChart = (route: string, type: PracticeCharts) => {
    updateCurrentChart(type);
    router.push(route);
  };

  return (
    <section className="flex flex-col items-center">
      <h1 className="text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)] text-center">
        Practice Charts
      </h1>
      <section className="mt-6 flex flex-wrap justify-center items-center gap-3 w-full max-md:flex-col">
        {practiceRoutes.map((route, i) => (
          <Button
            onClick={() =>
              gotoChart(
                `/practice/chart?type=${route[0].toLowerCase().replace(" ", "-")}`,
                route[1],
              )
            }
            class=" w-1/4 max-md:w-3/4 max-xs:w-11/12"
            key={i}
          >
            {route[0]}
          </Button>
        ))}
      </section>
    </section>
  );
}
