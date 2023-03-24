import macronHandler, { checkForMacrons } from "../../lib/utils/macronHandler";
import changeTextAccuracyState from "../../lib/utils/changeTextAccuracyState";
import chartClearable from "../../lib/utils/chartClearable";
import chartProps from "../../lib/types/chartProps";
import styles from "./chart.module.css";
import { useEffect } from "react";
import Text from "../text/text";

//!!!: when answers are shown and switching charts, the right class is not added to new inputs
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
                  <Text placeholder="Answer" id={content} onChange={checkAnswer}/>
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