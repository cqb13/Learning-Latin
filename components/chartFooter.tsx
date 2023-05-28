import chartProps from "@prop-types/chartProps";
import ToolTip from "./toolTip";
import Button from "./button";
import Image from "next/image";

const chartFooter = ({
  switchToLinkedChart,
  updateClearable,
  chartClearable,
  toggleAnswers,
  chartIndex,
  answers,
  data,

  clearChart,
}: {
  switchToLinkedChart: (link: string | undefined) => void;
  updateClearable: (clearable: boolean) => void;
  toggleAnswers: () => void;
  chartClearable: boolean;
  chartIndex: number;
  answers: boolean;
  data: chartProps;

  clearChart: () => void;
}) => {
  //needed so button becomes locked after clear
  const clear = () => {
    clearChart();
    updateClearable(false);
  }

  return (
    <section className="flex items-center gap-3">
      <ToolTip
        content={answers ? "questions" : "answers"}
        delay={20}
      >
        <Button onClick={toggleAnswers} class="child:w-5 child:h-5">
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
      
      <ToolTip content="clear" delay={20}>
        <Button onClick={clear} locked={!chartClearable} class="child:w-5 child:h-5">
          <Image src="/clear.svg" alt="clear" width={20} height={20} />
        </Button>
      </ToolTip>

      {/*Switches between linked charts*/}
      {data.chart[chartIndex].link || data.chart[chartIndex].returnLink
        ? <ToolTip
            content={
              data.chart[chartIndex].link || data.chart[chartIndex].returnLink
            }
            delay={20}
          >
            <Button
              class="child:w-5 child:h-5"
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
