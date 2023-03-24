import personalPronouns from "../../lib/data/practice/personal-pronouns";
import relativePronouns from "../../lib/data/practice/relative-pronouns";
import personalEndings from "../../lib/data/practice/personal-endings";
import ChartFooter from "../../components/chartFooter/chartFooter";
import chartStyles from "../../components/chart/chart.module.css";
import futureTense from "../../lib/data/practice/future-tense";
import declensions from "../../lib/data/practice/declensions";
import utilStyles from "../../styles/utils.module.css";
import styles from "../../styles/practice.module.css";
import Layout from "../../components/layout/layout";
import Button from "../../components/button/button";
import chartProps from "../../lib/types/chartProps";
import clearChart from "../../lib/utils/clearChart";
import Chart from "../../components/chart/chart";
import { useState, useEffect } from "react";
import Image from "next/image";

export async function getStaticPaths() {
  const paths = [
    { params: { id: "declension-endings" } },
    { params: { id: "future-tense" } },
    { params: { id: "personal-endings" } },
    { params: { id: "personal-pronouns" } },
    { params: { id: "relative-pronouns" } }
  ];

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { id: string } }) {
  const { id } = params;

  let data;
  if (id === "declension-endings") {
    data = declensions;
  } else if (id === "future-tense") {
    data = futureTense;
  } else if (id === "personal-pronouns") {
    data = personalPronouns;
  } else if (id === "relative-pronouns") {
    data = relativePronouns;
  } else if (id === "personal-endings") {
    data = personalEndings;
  } else {
    data = {};
  }

  return {
    props: { data }
  };
}

const PracticeChart = ({ data }: { data: chartProps }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentChart, setCurrentChart] = useState(1);
  const [linkedChartIndex] = useState([] as number[]);
  const [clearable, setClearable] = useState(false);
  const [chartIndex, setChartIndex] = useState(0);

  useEffect(() => {
    //Finds all charts that are accessed by a link, so they can be skipped when switching charts
    for (let i = 0; i < data.chart.length; i++) {
      if (data.chart[i].link) {
        for (let j = 0; j < data.chart.length; j++) {
          if (data.chart[j].name === data.chart[i].link) {
            linkedChartIndex.push(j);
          }
        }
      }
    }
  }, []);

  const updateClearable = (status: boolean) => {
    setClearable(status);
  };

  const handleSwitchChart = (event: { target: { id: string } }) => {
    let input = event.target.id;
    setClearable(false);

    if (input === ">") {
      let nextIndex = chartIndex + 1;
      while (linkedChartIndex.includes(nextIndex)) {
        nextIndex++;
      }

      if (nextIndex < data.chart.length) {
        setChartIndex(nextIndex);
        setCurrentChart(currentChart + 1);
      }

      if (nextIndex === data.chart.length) {
        setChartIndex(0);
        setCurrentChart(1);
      }
    }

    if (input === "<") {
      let prevIndex = chartIndex - 1;
      if (prevIndex < 0) {
        prevIndex = data.chart.length - 1;
      }

      while (linkedChartIndex.includes(prevIndex)) {
        prevIndex--;
      }

      if (linkedChartIndex.includes(chartIndex)) {
        setChartIndex(prevIndex - 1);
        setCurrentChart(currentChart - 1);
        return;
      }

      if (prevIndex >= 0) {
        setChartIndex(prevIndex);
        if (currentChart > 1) {
          setCurrentChart(currentChart - 1);
        } else {
          setCurrentChart(data.chartCount);
        }
      }
    }
  };

  const switchToLinkedChart = (link: string | undefined) => {
    for (let i = 0; i < data.chart.length; i++) {
      if (data.chart[i].name === link) {
        setChartIndex(i);
      }
    }
    return;
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
    clearChart();
    const inputs = document.querySelectorAll("input");
    if (!showAnswers === true) {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.add(chartStyles.right);
      }
    } else {
      for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove(chartStyles.right);
      }
    }
    updateClearable(false);
  };

  /*
  TODO:
  - add an options popup, that saves settings in browser storage
    - options to check check chart as you go, or after you finish
  */

  //prettier-ignore
  return (
    <Layout label={data.name} back={true}>
      <section className={utilStyles.container}>
        <section className={utilStyles.container}>
          <div className={styles.chartTitleContainer}>
            {data.chartCount > 1? <Button onClick={handleSwitchChart} id="<">
              <Image
                src="/arrowLeft.svg"
                alt="arrow left"
                width={20}
                height={20}
              />
            </Button>: null}

            <div className={`${utilStyles.centerText} ${styles.chartTitle}`}>
              <h1>{data.chart[chartIndex].name}</h1>
              {data.chart[chartIndex].note? <p>{data.chart[chartIndex].note}</p>: null}
            </div>

            {data.chartCount > 1? <Button onClick={handleSwitchChart} id=">">
            <Image
                src="/arrowRight.svg"
                alt="arrow left"
                width={20}
                height={20}
              />
            </Button>: null}
          </div>
          <p>{currentChart} / {data.chartCount}</p>

          <Chart 
            updateClearable={updateClearable}
            clearChart={clearChart} 
            chartIndex={chartIndex} 
            answers={showAnswers} 
            data={data} 
          />

          <ChartFooter 
            switchToLinkedChart={switchToLinkedChart} 
            toggleAnswers={toggleAnswers}
            chartClearable={clearable}
            chartIndex={chartIndex} 
            answers={showAnswers}
            data={data} 
          />
        </section>
      </section>
    </Layout>
  );
};

export default PracticeChart;
