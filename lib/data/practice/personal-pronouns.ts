import ChartData from "../../types/chart";

const personalPronouns: ChartData = {
  chartCount: 3,
  name: "Personal Pronouns",
  chart: [
    {
      name: "Personal Pronouns [I, of me]",
      note: "I, of me",
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["ego", "nōs"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["meī", ["nostrum", "nostrī"]]
        },
        {
          rowTitle: "Dative",
          rowContent: ["mihi", "nōbīs"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["mē", "nos"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["me", "nōbīs"]
        }
      ]
    },
    {
      name: "Personal Pronouns [I, of me] Meaning",
      note: "I, of me",
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["I", "we"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["of me", "of us"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["to/for me", "to/for us"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["me", "us"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["in/at/by/with/from you", "in/at/by/with/from you"]
        }
      ]
    },
    {
      name: "Personal Pronouns [You, of you]",
      note: "You, of you",
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["tū", "vōs"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["tūī", ["vestrum", "vestrī"]]
        },
        {
          rowTitle: "Dative",
          rowContent: ["tibi", "vōbīs"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["tē", "vōs"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["tē", "vōbīs"]
        }
      ]
    },
    {
      name: "Personal Pronouns [You, of you] Meaning",
      note: "You, of you",
      labels: ["Form", "Singular", "Plural"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["you", "you"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["of you", "of you"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["to/for you", "to/for you"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["you", "you"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["in/at/by/with/from you", "in/at/by/with/from you"]
        }
      ]
    },
    {
      name: "Personal Pronouns [He, She, It] Singular",
      note: "He, She, It (Is, Ea, Id)",
      labels: ["Form", "Masculine", "Feminine", "Neuter"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["is", "ea", "id"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["ēius", "ēius", "ēius"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["ēī", "ēī", "ēī"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["eum", "eam", "id"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["eō", "eā", "eō"]
        }
      ]
    },
    {
      name: "Personal Pronouns [He, She, It] Singular Meaning",
      note: "He, She, It (Is, Ea, Id)",
      labels: ["Form", "Masculine", "Feminine", "Neuter"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["he", "she", "it"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["of him", "of her", "of it"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["to/for him", "to/for her", "to/for it"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["him", "her", "it"]
        },
        {
          rowTitle: "Ablative",
          rowContent: [
            "in/at/by/with/from him",
            "in/at/by/with/from her",
            "in/at/by/with/from it"
          ]
        }
      ]
    },
    {
      name: "Personal Pronouns [He, She, It] Plural",
      note: "He, She, It (Is, Ea, Id)",
      labels: ["Form", "Masculine", "Feminine", "Neuter"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["eī", "eae", "ea"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["eōrum", "eārum", "eōrum"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["eīs", "eīs", "eīs"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["eōs", "eās", "ea"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["eīs", "eīs", "eīs"]
        }
      ]
    },
    {
      name: "Personal Pronouns [He, She, It] Plural Meaning",
      note: "He, She, It (Is, Ea, Id)",
      labels: ["Form", "Masculine", "Feminine", "Neuter"],
      rows: [
        {
          rowTitle: "Nominative",
          rowContent: ["they", "they", "they"]
        },
        {
          rowTitle: "Genitive",
          rowContent: ["of them", "of them", "of them"]
        },
        {
          rowTitle: "Dative",
          rowContent: ["to/for them", "to/for them", "to/for them"]
        },
        {
          rowTitle: "Accusative",
          rowContent: ["them", "them", "them"]
        },
        {
          rowTitle: "Ablative",
          rowContent: ["to/for them", "to/for them", "to/for them"]
        }
      ]
    }
  ]
};

export default personalPronouns;
