import chartProps from "@/lib/types/chartProps";

const relativePronouns: chartProps = {
  chartCount: 2,
  name: "Relative Pronouns",
  chart: [
    {
      name: "Relative Pronouns Singular",
      labels: ["Form", "Masculine", "Feminine", "Neuter", "Function"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["quī", "quae", "quod", ["who", "which"]],
        },
        {
          rowTitle: "Genitive",
          rowContent: ["cuius", "cuius", "cuius", ["whose", "of which"]],
        },
        {
          rowTitle: "Dative",
          rowContent: ["cui", "cui", "cui", ["to whom", "for which"]],
        },
        {
          rowTitle: "Accusative",
          rowContent: ["quem", "quam", "quod", ["whom", "which"]],
        },
        {
          rowTitle: "Ablative",
          rowContent: ["quō", "quā", "quō", ["by whom", "by which"]],
        },
      ],
    },
    {
      name: "Relative Pronouns Plural",
      labels: ["Form", "Masculine", "Feminine", "Neuter", "Function"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["quī", "quae", "quae", ["who", "which"]],
        },
        {
          rowTitle: "Genitive",
          rowContent: ["quōrum", "quārum", "quōrum", ["whose", "of which"]],
        },
        {
          rowTitle: "Dative",
          rowContent: ["quibus", "quibus", "quibus", ["to whom", "for which"]],
        },
        {
          rowTitle: "Accusative",
          rowContent: ["quōs", "quās", "quae", ["whom", "which"]],
        },
        {
          rowTitle: "Ablative",
          rowContent: ["quibus", "quibus", "quibus", ["by whom", "by which"]],
        },
      ],
    },
  ],
};

export default relativePronouns;
