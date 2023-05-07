import TranslationCard from "../components/cards/translationCard/translationCard";
import removeExtraSpaces from "../lib/utils/removeExtraSpaces";
import cardStyles from "../components/cards/cards.module.css";
import macronHandler from "../lib/utils/macronHandler";
import styles from "../styles/translate.module.css";
import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout/layout";
import Button from "../components/button/button";
import DetectLanguage from "detectlanguage";
import { useState, useEffect } from "react";
import Text from "../components/text/text";

const Translate = () => {
  const [translations, setTranslations] = useState<any[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [query, setQuery] = useState("");
  const [label, setLabel] = useState("");

  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_LANGUAGE_API_KEY;
    if (key) {
      setApiKey(key);
    }
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const onEnter = () => {
    const detectLanguage = new DetectLanguage(apiKey);
    detectLanguage.detect(query).then(function(result) {
      if (result[0].language === "en") {
        getTranslation("english-to-latin");
      } else if (result[0].language != "en") {
        getTranslation("latin-to-english");
      } else {
        return;
      }
    });
  };

  const getTranslation = async (
    type: "latin-to-english" | "english-to-latin"
  ) => {
    setLabel("");
    setLabel(query);
    setQuery("");

    try {
      let cleanQuery = macronHandler(query);
      //if there are extra spaces, empty cards will be created
      cleanQuery = removeExtraSpaces(cleanQuery);
      const response = await fetch(`/api/translate?word=${cleanQuery}&lang=${type}`);
      const data = await response.json();
      setTranslations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeCard = (word: string) => {
    setTranslations(translations.filter(t => t.word !== word));
    setLabel(label.replace(word, ""));
  };

  return (
    <Layout title="Translator" label={label}>
      <section className={utilStyles.container}>
        <div className={utilStyles.heading2Xl}>
          <h1>Translator</h1>
        </div>
        <section className={styles.searchContainer}>
          <Text
            placeholder="Enter a word"
            onChange={onChange}
            onKeyPress={onEnter}
            keyName="Enter"
            value={query}
          />
          <div className="button-container">
            <Button
              onClick={() => getTranslation("latin-to-english")}
              class={utilStyles.fullWidth}
            >
              Latin To English
            </Button>
            <Button
              onClick={() => getTranslation("english-to-latin")}
              class={utilStyles.fullWidth}
            >
              English To Latin
            </Button>
          </div>
        </section>

        {translations.length > 0 &&
          <section className={cardStyles.translationCardContainer}>
            {translations.map((t) => (
              <TranslationCard
                data={t}
                removeCard={() => removeCard(t.word)}
              />
            ))}
          </section>}
        <p>Translation functionality is in early development, if you find an issue, please open an issue on my github</p>
        <a href="https://github.com/Templar-Development/Open-Words-TS/issues/new/choose" target="_blank">Github Issue</a>
      </section>
    </Layout>
  );
};

export default Translate;
