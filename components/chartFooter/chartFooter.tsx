import utilStyles from "../../styles/utils.module.css";
import ChartData from "../../lib/types/chart";
import Button from "../button/button";
import Image from "next/image";
import ToolTip from "../toolTip/toolTip";

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
  return (
    <section className={utilStyles.horizontalContainer}>
      <ToolTip direction="bottom" content={answers? "questions" : "answers"}>
        <Button onClick={toggleAnswers}>
          {answers ? 
          <Image
            src="/question.svg"
            alt="question"
            width={20}
            height={20}
          /> : 
          <Image
            src="/answer.svg"
            alt="answer"
            width={20}
            height={20}
          />
          }
        </Button>
      </ToolTip>

      <ToolTip direction="bottom" content="clear">
        <Button onClick={clearChart}>
          <Image
            src="/clear.svg"
            alt="clear"
            width={20}
            height={20}
          />
        </Button>
      </ToolTip>

      {/*Switches between linked charts*/}
      {data.chart[chartIndex].link || data.chart[chartIndex].returnLink
        ? 
        <ToolTip direction="bottom" content={data.chart[chartIndex].link || data.chart[chartIndex].returnLink}> 
          <Button
              onClick={() =>
                switchToLinkedChart(
                  data.chart[chartIndex].link || data.chart[chartIndex].returnLink
                )}
            >
              <Image
                src="/flip.svg"
                alt="flip"
                width={20}
                height={20}
              />
          </Button>
          </ToolTip>
        : null}
    </section>
  );
};

export default chartFooter;
