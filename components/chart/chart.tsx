import macronHandler, { checkForMacrons } from "../../lib/utils/macronHandler";
import chartProps from "../../lib/types/chartProps";
import styles from "./chart.module.css";
import Text from "../text/text";
 
const Chart = ({ data, chartIndex, answers }: { data: chartProps, chartIndex: number, answers: boolean }) => {
  const checkAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.id;
    const answer = event.target.value.toLowerCase();
    const hasMacron = checkForMacrons(answer);

    if (answer === "") {
      event.target.classList.remove(styles.right);
      event.target.classList.remove(styles.wrong);
      return;
    }

    if (answer === id) {
      changeAccuracyState(event, true);
      return;
    }

    //makes macrons in answers optional
    if (!hasMacron && answer === macronHandler(id)) {
      changeAccuracyState(event, true);
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
        changeAccuracyState(event, true);
        return;
      }
    }

    changeAccuracyState(event, false);
  };

  const changeAccuracyState = (
    event: React.ChangeEvent<HTMLInputElement>,
    right: boolean
  ) => {
    if (right) {
      event.target.classList.remove(styles.wrong);
      event.target.classList.add(styles.right);
    } else {
      event.target.classList.remove(styles.right);
      event.target.classList.add(styles.wrong);
    }
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