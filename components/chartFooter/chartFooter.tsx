import ChartData from "../../lib/types/chart";
import Button from "../button/button";

const chartFooter = ({
  data,
  chartIndex,
  clearChart,
  toggleAnswers,
  switchToLinkedChart
}: {
  data: ChartData;
  chartIndex: number;
  clearChart: () => void;
  toggleAnswers: () => void;
  switchToLinkedChart: (event: { target: { innerHTML: string } }) => void;
}) => {
  //TODO: replace names with icons, add info popup on hover
  return (
    <section>
      <Button onClick={toggleAnswers}>Answers</Button>

      <Button onClick={clearChart}>Clear</Button>

      {/*Switches between linked charts*/}
      {data.chart[chartIndex].link || data.chart[chartIndex].returnLink
        ? <Button onClick={switchToLinkedChart}>
            {data.chart[chartIndex].link || data.chart[chartIndex].returnLink}
          </Button>
        : null}
    </section>
  );
};

export default chartFooter;
