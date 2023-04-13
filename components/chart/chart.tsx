import changeTextAccuracyState from "../../lib/utils/changeTextAccuracyState";
import checkForMacrons from "../../lib/utils/checkForMacrons";
import chartClearable from "../../lib/utils/chartClearable";
import macronHandler from "../../lib/utils/macronHandler";
import chartProps from "../../lib/types/chartProps";
import styles from "./chart.module.css";
import { useEffect } from "react";
import Text from "../text/text";

import textStyles from "../text/text.module.css"

const Chart = ({
  data,
  answers,
  chartIndex,
  clearChart,
  updateClearable
}: {
  answers: boolean;
  data: chartProps;
  chartIndex: number;
  clearChart: () => void;
  updateClearable: (clearable: boolean) => void;
}) => {
  useEffect(
    () => {
      if (answers) {
        const inputs = document.querySelectorAll("input");
        for (let i = 0; i < inputs.length; i++) {
          inputs[i].classList.add(styles.right);
        }
        return;
      }
      clearChart();
    },
    [chartIndex]
  );

  const checkAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const answer = event.target.value.toLowerCase();
    const hasMacron = checkForMacrons(answer);

    if (answer === "") {
      event.target.classList.remove(styles.right);
      event.target.classList.remove(styles.wrong);
      updateClearable(chartClearable());
      return;
    }

    updateClearable(chartClearable());

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

  const formatID = (id: string | string[]) => {
      if (Array.isArray(id)) {
        return id.join(",");
      } else {
        return id;
      }
  }

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
        {data.chart[chartIndex].rows.map(row =>
          <tr>
            <td>
              {row.rowTitle}
            </td>
            {row.rowContent.map((content, index) =>
              <td key={index}>
                {answers ? (
                  <Text placeholder="" value={content}/>
                ) : (
                  <>
                    {/*
                    TODO: make the text component support this
                    <Text placeholder="Answer" id={content} onChange={checkAnswer}/> */}

                    {/** 
                     * the issue is that the clearChart function clears the value, but not the state value in the text component
                    */}
                    <input
                    type="text"
                    placeholder="Answer"
                    onChange={checkAnswer}
                    className={textStyles.input}
                    id={formatID(content)}
                  />
                  </>
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
