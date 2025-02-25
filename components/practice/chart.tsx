"use client";

import changeTextAccuracyState from "@/utils/changeTextAccuracyState";
import createValueArrayMap from "@/utils/createValueArrayMap";
import checkForMacrons from "@/utils/checkForMacrons";
import chartClearable from "@/utils/chartClearable";
import macronHandler from "@/utils/macronHandler";
import chartProps from "@/lib/types/chartProps";
import { useEffect, useState } from "react";
import Text from "@/components/shared/text";

const Chart = ({
  data,
  clear,
  answers,
  chartIndex,
  clearChart,
  updateClearable,
}: {
  clear: boolean;
  answers: boolean;
  data: chartProps;
  chartIndex: number;
  clearChart: (chart: string[][]) => {};
  updateClearable: (clearable: boolean) => void;
}) => {
  const [valueArrayMap, setValueArrayMap] = useState(
    createValueArrayMap(data, chartIndex),
  );

  useEffect(() => {
    if (answers) {
      const inputs = document.querySelectorAll("input");
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("border-red-500", "border-neutral-300");
        inputs[i].classList.add("border-green-500");
      }
      return;
    }

    setValueArrayMap(clearChart(valueArrayMap));
    setValueArrayMap(createValueArrayMap(data, chartIndex));
  }, [chartIndex, answers]);

  useEffect(() => {
    clearChart(valueArrayMap);
    setValueArrayMap(createValueArrayMap(data, chartIndex));
  }, [clear]);

  useEffect(() => {
    updateClearable(chartClearable(valueArrayMap));
  }, [valueArrayMap]);

  const checkAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    index: number,
  ) => {
    const id = event.target.id;
    const answer = event.target.value.toLowerCase();
    const hasMacron = checkForMacrons(answer);

    let tempValueMap = [...valueArrayMap];

    tempValueMap[rowIndex][index] = answer;
    setValueArrayMap(tempValueMap);

    if (answer === "") {
      event.target.classList.remove("border-red-500", "border-green-500");
      event.target.classList.add("border-neutral-300");
      return;
    }

    if (answer === id) {
      changeTextAccuracyState(event, true);
      return;
    }

    //makes macrons in answers optional
    if (!hasMacron && answer === macronHandler(id)) {
      changeTextAccuracyState(event, true);
      return;
    }

    //check list answers
    if (id.includes(",")) {
      const list = id.split(",");
      let value = answer;
      value = value.split(" ").join("");
      value = value.replace(/[^a-zA-Z]/g, "");
      //make sure that the answer has all the elements in the list and no extra elements
      if (
        list.every((element) => answer.includes(element)) &&
        list.length === value.length
      ) {
        changeTextAccuracyState(event, true);
        return;
      }
    }

    changeTextAccuracyState(event, false);
  };

  //prettier-ignore
  return (
    <div className="flex items-center justify-center my-1 p-3">
      <table className="w-1/2 max-lg:w-4/5 max-md:w-11/12 table-fixed shadow-card bg-slate-50 bg-opacity-60 rounded">
        <thead>
          <tr>
            {data.chart[chartIndex].labels.map((label, index) =>
              <th key={index} className="py-2 px-4">
                {label}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.chart[chartIndex].rows.map((row, rowIndex) =>
            <tr key={rowIndex}>
              <td className="py-2 px-4 text-center">
                {row.rowTitle}
              </td>
              {row.rowContent.map((content, index) =>
                <td key={index} className="py-2 px-4">
                  {answers ? (
                    <Text placeholder="" value={content} class="w-full text-center bg-slate-50 bg-opacity-30"/>
                  ) : (
                    <Text 
                      placeholder="Answer" 
                      id={content}
                      class="w-full text-center bg-slate-50 bg-opacity-30"
                      onChange={(event: any) => checkAnswer(event, rowIndex, index)}
                      value={valueArrayMap[rowIndex][index]}
                    />
                  )}
                </td>
                )}
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Chart;
