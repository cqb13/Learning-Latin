import chartProps from "../../types/chartProps";

const perfectTense: chartProps = {
  chartCount: 1,
  name: "Perfect Tense",
  chart: [
    {
      name: "Perfect Active Tense",
      note: 'Drop "i" of 3rd principal part ➡ Add chart ending',
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "1st",
          rowContent: ["ī", "īmus"]
        },
        {
          rowTitle: "2nd",
          rowContent: ["istī", "istis"]
        },
        {
          rowTitle: "3rd",
          rowContent: ["it", "ērunt"]
        }
      ]
    }
  ]
};

export default perfectTense;
