"use client";

import ChartFooter from "@/components/practice/chartFooter";
import chartProps from "@/lib/types/chartProps";
import Button from "@/components/shared/button";
import Chart from "@/components/practice/chart";
import clearChart from "@/utils/clearChart";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function ChartLayout({ data }: { data: chartProps }) {
  const [triggerClear, setTriggerClear] = useState(false); //used to trigger clearChart in chart
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentChart, setCurrentChart] = useState(1);
  const [linkedChartIndex] = useState([] as number[]);
  const [clearable, setClearable] = useState(false);
  const [chartIndex, setChartIndex] = useState(0);

  useEffect(() => {
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
  }, []);

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
        setCurrentChart(currentChart + 1);
      }

      if (nextIndex === data.chart.length) {
        setChartIndex(0);
        setCurrentChart(1);
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
        setCurrentChart(currentChart - 1);
        return;
      }

      if (prevIndex >= 0) {
        setChartIndex(prevIndex);
        if (currentChart > 1) {
          setCurrentChart(currentChart - 1);
        } else {
          setCurrentChart(data.chartCount);
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
          {currentChart} / {data.chartCount}
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
