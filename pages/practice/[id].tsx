import personalPronouns from "../../lib/data/practice/personal-pronouns";
import relativePronouns from "../../lib/data/practice/relative-pronouns";
import personalEndings from "../../lib/data/practice/personal-endings";
import futureTense from "../../lib/data/practice/future-tense";
import declensions from "../../lib/data/practice/declensions";
import utilStyles from "../../styles/utils.module.css";
import Layout from "../../components/layout/layout";
import ChartData from "../../lib/types/chart";
import Button from "../../components/button/button";
import { useState } from "react";

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
  const [chartIndex, setChartIndex] = useState(0);

  const handleSwitchChart = (event: { target: { innerHTML: string; }; }) => {
    // &gt; = > | &lt; = <
    if (event.target.innerHTML === "&gt;") {
      if (chartIndex < data.chart.length - 1) {
        setChartIndex(chartIndex + 1);
      }
    } else {
      if (chartIndex > 0) {
        setChartIndex(chartIndex - 1);
      }
    }

    if (chartIndex === data.chart.length - 1 && event.target.innerHTML === "&gt;") {
      setChartIndex(0);
    }

    if (chartIndex === 0 && event.target.innerHTML === "&lt;") {
      setChartIndex(data.chart.length - 1);
    }
  };

  return (
    <Layout title={data.name}>
      <section className={utilStyles.container}>
        <div className={utilStyles.heading2Xl}>
          <h1>
            {data.name}
          </h1>
        </div>

        <section>
          <Button onClick={handleSwitchChart}>{"<"}</Button>
          <h1>{data.chart[chartIndex].name}</h1>
          {data.chart[chartIndex].note? <p>{data.chart[chartIndex].note}</p> : null}
          <Button onClick={handleSwitchChart}>{">"}</Button>
          <table>
            <thead>
              <tr>
                {data.chart[chartIndex].labels.map((label, index) => (
                  <th key={index}>{label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.chart[chartIndex].rows.map((row) => (
                <tr>
                  <td>
                    {row.rowTitle}
                  </td>
                  {row.rowContent.map((content, index) => (
                    <td key={index}>{content}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>

      </section>
    </Layout>
  );
};

export default PracticeChart;
