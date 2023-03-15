import TranslationCard from "../components/cards/translationCard/translationCard";
import removeExtraSpaces from "../lib/utils/removeExtraSpaces";
import cardStyles from "../components/cards/cards.module.css";
import macronHandler from "../lib/utils/macronHandler";
import styles from "../styles/translate.module.css";
import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout/layout";
import Button from "../components/button/button";
import Text from "../components/text/text";
import { useState } from "react";

const Translate = () => {
  const [translations, setTranslations] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [label, setLabel] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
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
      const response = await fetch(`/api/${type}?word=${cleanQuery}`);
      const data = await response.json();
      const newTranslations = Object.entries(
        data
      ).map(([word, translation]) => ({ word, translation }));
      setTranslations(newTranslations);
    } catch (error) {
      console.error(error);
    }
  };

  const removeCard = (word: string) => {
    setTranslations(translations.filter(t => t.word !== word));
    setLabel(label.replace(word, ""));
  };

  //TODO: add a clear button with a switch inside, the switch will toggle auto clear, if true the translations will be cleared after a new translation is made, if false the translations will stay until the user clears them
  return (
    <Layout title="Translator" label={label}>
      <section className={utilStyles.container}>
        <div className={utilStyles.heading2Xl}>
          <h1>Translator</h1>
        </div>
        <section className={styles.searchContainer}>
          <Text placeholder="Enter a word" onChange={onChange} value={query} />
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
            {translations.map(({ word, translation }) =>
              <TranslationCard
                word={word}
                translation={translation}
                removeCard={() => removeCard(word)}
              />
            )}
          </section>}
      </section>
    </Layout>
  );
};

export default Translate;
