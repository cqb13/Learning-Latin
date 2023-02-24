import ChartData from "../../types/chart";

const personalEndings: ChartData = {
  chartCount: 1,
  name: "Personal Endings",
  chart: [
    {
      name: "Personal Endings",
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "1st",
          rowContent: [["ō", "m"], "mus"]
        },
        {
          rowTitle: "2nd",
          rowContent: ["s", "tis"]
        },
        {
          rowTitle: "3rd",
          rowContent: ["t", "nt"]
        }
      ]
    },
    {
      name: "Personal Endings Meaning",
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "1st",
          rowContent: ["I", "we"]
        },
        {
          rowTitle: "2nd",
          rowContent: ["you", "you all"]
        },
        {
          rowTitle: "3rd",
          rowContent: [["he", "she", "it"], "they"]
        }
      ]
    }
  ]
};

export default personalEndings;
