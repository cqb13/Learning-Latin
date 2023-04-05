import chartProps from "../../types/chartProps";

//TODO: fix name and note
const imperfectTense: chartProps = {
    chartCount: 1,
    name: "Imperfect Tense",
    chart: [
        {
            name: "Imperfect Tense 1st & 2nd Conjugation Verbs",
            note: 'Drop "re" of 2nd principal part/infinitive ➡ Add chart ending',
            labels: ["Form", "Singular", "Plural"],
            rows: [
                {
                    rowTitle: "1st",
                    rowContent: ["bam", "bāmus"]
                },
                {
                    rowTitle: "2nd",
                    rowContent: ["bās", "bātis"]
                },
                {
                    rowTitle: "3rd",
                    rowContent: ["bat", "bant"]
                }
            ]
        }
    ]
};

export default imperfectTense;
