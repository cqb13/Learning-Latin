import changeTextAccuracyState from "@utils/changeTextAccuracyState";
import createValueArrayMap from "@utils/createValueArrayMap";
import checkForMacrons from "@utils/checkForMacrons";
import chartClearable from "@utils/chartClearable";
import macronHandler from "@utils/macronHandler";
import chartProps from "@prop-types/chartProps";
import { useEffect, useState } from "react";
import styles from "./chart.module.css";
import Text from "../text/text";

const Chart = ({
  data,
  clear,
  answers,
  chartIndex,
  clearChart,
  updateClearable
}: {
  clear: boolean;
  answers: boolean;
  data: chartProps;
  chartIndex: number;
  clearChart: (chart: string[][]) => {};
  updateClearable: (clearable: boolean) => void;
}) => {
  const [valueArrayMap, setValueArrayMap] = useState(
    createValueArrayMap(data, chartIndex)
  );

  useEffect(
    () => {
      if (answers) {
        const inputs = document.querySelectorAll("input");
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].classList.remove(styles.wrong);
          inputs[i].classList.add(styles.right);
        }
        return;
      }

      setValueArrayMap(clearChart(valueArrayMap));
      setValueArrayMap(createValueArrayMap(data, chartIndex));
    },
    [chartIndex, answers]
  );

  useEffect(
    () => {
      clearChart(valueArrayMap);
      setValueArrayMap(createValueArrayMap(data, chartIndex));
    },
    [clear]
  );

  useEffect(
    () => {
      updateClearable(chartClearable(valueArrayMap));
    },
    [valueArrayMap]
  );

  const checkAnswer = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    index: number
  ) => {
    const id = event.target.id;
    const answer = event.target.value.toLowerCase();
    const hasMacron = checkForMacrons(answer);

    let tempValueMap = [...valueArrayMap];

    tempValueMap[rowIndex][index] = answer;
    setValueArrayMap(tempValueMap);

    if (answer === "") {
      event.target.classList.remove(styles.right);
      event.target.classList.remove(styles.wrong);
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
        list.every(element => answer.includes(element)) &&
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
    <table className={styles.chart}>
      <thead>
        <tr>
          {data.chart[chartIndex].labels.map((label, index) =>
            <th key={index}>
              {label}
            </th>
          )}
        </tr>
      </thead>
      <tbody>
        {data.chart[chartIndex].rows.map((row, rowIndex) =>
          <tr>
            <td>
              {row.rowTitle}
            </td>
            {row.rowContent.map((content, index) =>
              <td key={index}>
                {answers ? (
                  <Text placeholder="" value={content}/>
                ) : (
                  <Text 
                    placeholder="Answer" 
                    id={content}
                    class={styles.right}
                    onChange={(event) => checkAnswer(event, rowIndex, index)}
                    value={valueArrayMap[rowIndex][index]}
                  />
                )}
              </td>
            )}
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Chart;
