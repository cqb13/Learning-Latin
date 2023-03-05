import personalPronouns from "../../lib/data/practice/personal-pronouns";
import relativePronouns from "../../lib/data/practice/relative-pronouns";
import personalEndings from "../../lib/data/practice/personal-endings";
import ChartFooter from "../../components/chartFooter/chartFooter";
import chartStyles from "../../components/chart/chart.module.css";
import futureTense from "../../lib/data/practice/future-tense";
import declensions from "../../lib/data/practice/declensions";
import arrowHandler from "../../lib/utils/arrowHandler";
import utilStyles from "../../styles/utils.module.css";
import styles from "../../styles/practice.module.css";
import Layout from "../../components/layout/layout";
import Button from "../../components/button/button";
import Chart from "../../components/chart/chart";
import ChartData from "../../lib/types/chart";
import { useState, useEffect } from "react";

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

const PracticeChart = ({ data }: { data: ChartData }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [currentChart, setCurrentChart] = useState(1);
  const [linkedChartIndex] = useState([] as number[]);
  const [chartIndex, setChartIndex] = useState(0);

  useEffect(() => {
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

  const handleSwitchChart = (event: { target: { innerHTML: string } }) => {
    let cleanInput = arrowHandler(event.target.innerHTML);

    if (cleanInput === ">") {
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

    if (cleanInput === "<") {
      let prevIndex = chartIndex - 1;
      if (prevIndex < 0) {
        prevIndex = data.chart.length - 1;
      }

      while (linkedChartIndex.includes(prevIndex)) {
        prevIndex--;
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

    clearChart();
  };

  const clearChart = () => {
    if (showAnswers) return;
    const inputs = document.querySelectorAll("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove(chartStyles.right);
      inputs[i].classList.remove(chartStyles.wrong);
      inputs[i].value = "";
    }
  };

  const switchToLinkedChart = (event: { target: { innerHTML: string } }) => {
    for (let i = 0; i < data.chart.length; i++) {
      if (data.chart[i].name === event.target.innerHTML) {
        setChartIndex(i);
      }
    }
  };

  const toggleAnswers = () => {
    setShowAnswers(!showAnswers);
    clearChart();
  };

  /*
  - add an options popup, that saves settings in browser storage
    - options to check check chart as you go, or after you finish
  */

  //prettier-ignore
  return (
    <Layout title={data.name}>
      <section className={utilStyles.container}>
        <div className={utilStyles.heading2Xl}>
          <h1>
            {data.name}
          </h1>
        </div>

        <section className={utilStyles.container}>
          <div className={styles.chartTitleContainer}>
            {data.chartCount > 1? <Button onClick={handleSwitchChart}>{"<"}</Button>: null}
            <div className={utilStyles.centerText}>
              <h1>{data.chart[chartIndex].name}</h1>
              {data.chart[chartIndex].note? <p>{data.chart[chartIndex].note}</p>: null}
            </div>
            {data.chartCount > 1? <Button onClick={handleSwitchChart}>{">"}</Button>: null}
          </div>
          <p>{currentChart} / {data.chartCount}</p>

          <Chart data={data} chartIndex={chartIndex} answers={showAnswers}/>

          <ChartFooter 
            data={data} 
            chartIndex={chartIndex} 
            switchToLinkedChart={switchToLinkedChart} 
            clearChart={clearChart}
            toggleAnswers={toggleAnswers}
            />
        </section>
      </section>
    </Layout>
  );
};

export default PracticeChart;
