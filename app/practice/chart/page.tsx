"use client";

import ChartFooter from "@/components/practice/chartFooter";
import Button from "@/components/shared/button";
import Chart from "@/components/practice/chart";
import chartProps from "@/lib/types/chartProps";
import clearChart from "@/utils/clearChart";
import { useState } from "react";
import Image from "next/image";
import {
  usePracticeChartContext,
  PracticeChartContextProvider,
  PracticeCharts,
} from "@/lib/contexts/practiceChartContext";

export default function PracticeChartWrapper() {
  return (
    <PracticeChartContextProvider>
      <PracticeChart />
    </PracticeChartContextProvider>
  );
}

function PracticeChart() {
  const [triggerClear, setTriggerClear] = useState(false); //used to trigger clearChart in chart
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentChartNumber, setCurrentChartNumber] = useState(1);
  const [linkedChartIndex] = useState([] as number[]);
  const [clearable, setClearable] = useState(false);
  const [chartIndex, setChartIndex] = useState(0);

  const { data, updateCurrentChart } = usePracticeChartContext() as {
    data: chartProps;
    updateCurrentChart: (chart: PracticeCharts) => void;
  };

  //Finds all charts that are accessed by a link, so they can be skipped when switching charts
  for (let i = 0; i < data.chart.length; i++) {
    if (data.chart[i].link) {
      for (let j = 0; j < data.chart.length; j++) {
        if (data.chart[j].name === data.chart[i].link) {
          linkedChartIndex.push(j);
        }
      }
    }
  }

  const updateTrigger = () => {
    setTriggerClear(!triggerClear);
  };

  const updateClearable = (status: boolean) => {
    setClearable(status);
  };

  const handleSwitchChart = (event: { target: { id: string } }) => {
    let input = event.target.id;
    setClearable(false);

    if (input === ">") {
      let nextIndex = chartIndex + 1;
      while (linkedChartIndex.includes(nextIndex)) {
        nextIndex++;
      }

      if (nextIndex < data.chart.length) {
        setChartIndex(nextIndex);
        setCurrentChartNumber(currentChartNumber + 1);
      }

      if (nextIndex === data.chart.length) {
        setChartIndex(0);
        setCurrentChartNumber(1);
      }
    }

    if (input === "<") {
      let prevIndex = chartIndex - 1;
      if (prevIndex < 0) {
        prevIndex = data.chart.length - 1;
      }

      while (linkedChartIndex.includes(prevIndex)) {
        prevIndex--;
      }

      if (linkedChartIndex.includes(chartIndex)) {
        setChartIndex(prevIndex - 1);
        setCurrentChartNumber(currentChartNumber - 1);
        return;
      }

      if (prevIndex >= 0) {
        setChartIndex(prevIndex);
        if (currentChartNumber > 1) {
          setCurrentChartNumber(currentChartNumber - 1);
        } else {
          setCurrentChartNumber(data.chartCount);
        }
      }
    }
  };

  const switchToLinkedChart = (link: string | undefined) => {
    for (let i = 0; i < data.chart.length; i++) {
      if (data.chart[i].name === link) {
        setChartIndex(i);
      }
    }
    return;
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
    const inputs = document.querySelectorAll("input");
    if (!showAnswers === true) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.add("border-green-500");
      }
    } else {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("border-green-500");
      }
    }
    updateClearable(false);
  };

  return (
    <section className="flex flex-col items-center">
      <div className="flex justify-center items-center gap-3">
        {data.chartCount > 1 ? (
          <Button
            onClick={handleSwitchChart}
            class="child:w-5 child:h-5"
            id="<"
          >
            <Image
              src="/arrowLeft.svg"
              alt="arrow left"
              width={20}
              height={20}
            />
          </Button>
        ) : null}
        <div className="text-center">
          <h1 className=" text-xl font-semibold">
            {data.chart[chartIndex].name}
          </h1>
          {data.chart[chartIndex].note ? (
            <p>{data.chart[chartIndex].note}</p>
          ) : null}
        </div>
        {data.chartCount > 1 ? (
          <Button
            onClick={handleSwitchChart}
            class="child:w-5 child:h-5"
            id=">"
          >
            <Image
              src="/arrowRight.svg"
              alt="arrow left"
              width={20}
              height={20}
            />
          </Button>
        ) : null}
      </div>
      {data.chartCount > 1 ? (
        <p className="text-lg font-medium">
          {currentChartNumber} / {data.chartCount}
        </p>
      ) : null}
      <Chart
        updateClearable={updateClearable}
        clearChart={clearChart}
        chartIndex={chartIndex}
        answers={showAnswers}
        clear={triggerClear}
        data={data}
      />
      <ChartFooter
        switchToLinkedChart={switchToLinkedChart}
        updateClearable={updateClearable}
        toggleAnswers={toggleAnswers}
        chartClearable={clearable}
        clearChart={updateTrigger}
        chartIndex={chartIndex}
        answers={showAnswers}
        data={data}
      />
    </section>
  );
}
