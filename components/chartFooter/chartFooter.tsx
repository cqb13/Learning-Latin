import utilStyles from "../../styles/utils.module.css";
import chartProps from "../../lib/types/chartProps";
import clearChart from "../../lib/utils/clearChart";
import ToolTip from "../toolTip/toolTip";
import Button from "../button/button";
import Image from "next/image";

const chartFooter = ({
  switchToLinkedChart,
  chartClearable,
  toggleAnswers,
  chartIndex,
  answers,
  data
}: {
  switchToLinkedChart: (link: string | undefined) => void;
  toggleAnswers: () => void;
  chartClearable: boolean;
  chartIndex: number;
  answers: boolean;
  data: chartProps;
}) => {
  return (
    <section className={utilStyles.horizontalContainer}>
      <ToolTip
        direction="bottom"
        content={answers ? "questions" : "answers"}
        delay={20}
      >
        <Button onClick={toggleAnswers}>
          {answers
            ? <Image
                src="/question.svg"
                alt="question"
                width={20}
                height={20}
              />
            : <Image src="/answer.svg" alt="answer" width={20} height={20} />}
        </Button>
      </ToolTip>

      <ToolTip direction="bottom" content="clear" delay={20}>
        <Button onClick={clearChart} locked={!chartClearable}>
          <Image src="/clear.svg" alt="clear" width={20} height={20} />
        </Button>
      </ToolTip>

      {/*Switches between linked charts*/}
      {data.chart[chartIndex].link || data.chart[chartIndex].returnLink
        ? <ToolTip
            direction="bottom"
            content={
              data.chart[chartIndex].link || data.chart[chartIndex].returnLink
            }
            delay={20}
          >
            <Button
              onClick={() =>
                switchToLinkedChart(
                  data.chart[chartIndex].link ||
                    data.chart[chartIndex].returnLink
                )}
            >
              <Image src="/flip.svg" alt="flip" width={20} height={20} />
            </Button>
          </ToolTip>
        : null}
    </section>
  );
};

export default chartFooter;
