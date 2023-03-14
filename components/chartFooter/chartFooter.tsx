import utilStyles from "../../styles/utils.module.css";
import Question from "../../lib/images/question";
import ChartData from "../../lib/types/chart";
import Answer from "../../lib/images/answer";
import Clear from "../../lib/images/clear";
import Flip from "../../lib/images/flip";
import Button from "../button/button";

const chartFooter = ({
  switchToLinkedChart,
  toggleAnswers,
  clearChart,
  chartIndex,
  answers,
  data
}: {
  switchToLinkedChart: (link: string | undefined) => void;
  toggleAnswers: () => void;
  clearChart: () => void;
  chartIndex: number;
  answers: boolean;
  data: ChartData;
}) => {
  //TODO: give all buttons same dimensions
  return (
    <section className={utilStyles.horizontalContainer}>
      <Button onClick={toggleAnswers}>
        {answers ? <Question /> : <Answer />}
      </Button>

      <Button onClick={clearChart}>
        <Clear />
      </Button>

      {/*Switches between linked charts*/}
      {data.chart[chartIndex].link || data.chart[chartIndex].returnLink
        ? <Button
            onClick={() =>
              switchToLinkedChart(
                data.chart[chartIndex].link || data.chart[chartIndex].returnLink
              )}
          >
            <Flip />
          </Button>
        : null}
    </section>
  );
};

export default chartFooter;
