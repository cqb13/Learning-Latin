import ChartData from "../../types/chart";

const futureTense: ChartData = {
  chartCount: 2,
  chart: [
    {
      name: "Future Tense 1st & 2nd Conjugation Verbs",
      note: 'Drop "re" of 2nd principal part/infinitive ➡ Add chart ending',
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "1st",
          rowContent: ["bō", "bimus"]
        },
        {
          rowTitle: "2nd",
          rowContent: ["bis", "bitis"]
        },
        {
          rowTitle: "3rd",
          rowContent: ["bit", "bunt"]
        }
      ]
    },
    {
      name: "Future Tense 3rd, 3rd-io, and 4th Conjugation Verbs",
      note: 'Drop "o" of 1st principal part/infinitive ➡ Add chart ending',
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "1st",
          rowContent: ["am", "ēmus"]
        },
        {
          rowTitle: "2nd",
          rowContent: ["ēs", "ētis"]
        },
        {
          rowTitle: "3rd",
          rowContent: ["ēt", "ent"]
        }
      ]
    }
  ]
};

export default futureTense;
