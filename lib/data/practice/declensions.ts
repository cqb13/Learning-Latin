import ChartData from "../../types/chart";

const declensions: ChartData = {
  chartCount: 5,
  name: "Declension Endings",
  chart: [
    {
      name: "First Declension",
      labels: ["Form", "Singular", "Plural", "Function"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["a", "ae", "subject"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["ae", "ārum", "possession"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["ae", "īs", "indirect object"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["am", "ās", "direct object"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["ā", "īs", "by/with/from"]
        }
      ]
    },
    {
      name: "Second Declension",
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["us", "ī"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["ī", "ōrum"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["ō", "īs"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["um", "ōs"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["ō", "īs"]
        }
      ]
    },
    {
      name: "Third Declension",
      labels: ["Form", "Singular", "Plural"],
      link: "Third Declension Neuter",
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: [["r", "x", "s", "o", "n", "l"], "ēs"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["is", "um"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["ī", "ibus"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["em", "ēs"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["e", "ibus"]
        }
      ]
    },
    {
      name: "Third Declension Neuter",
      labels: ["Form", "Singular", "Plural"],
      returnLink: "Third Declension",
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: [["r", "x", "s", "o", "n", "l"], "a"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["is", "um"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["ī", "ibus"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["--", "a"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["e", "ibus"]
        }
      ]
    },
    {
      name: "Fourth Declension",
      labels: ["Form", "Singular", "Plural"],
      link: "Fourth Declension Neuter",
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["us", "ūs"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["ūs", "uum"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["ūi", "ibus"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["um", "ūs"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["ū", "ibus"]
        }
      ]
    },
    {
      name: "Fourth Declension Neuter",
      labels: ["Form", "Singular", "Plural"],
      returnLink: "Fourth Declension",
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["ū", "ua"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["ūs", "uum"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["ū", "ibus"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["ū", "ua"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["ū", "ibus"]
        }
      ]
    },
    {
      name: "Fifth Declension",
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["ēs", "ēs"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["ī", "ērum"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["eī", "ēbus"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["em", "ēs"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["ē", "ēbus"]
        }
      ]
    }
  ]
};

export default declensions;
