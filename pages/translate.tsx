import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout/layout";
import Button from "../components/button/button";
import TranslationCard from "../components/cards/translationCard/translationCard";
import cardStyles from "../components/cards/cards.module.css";
import { useState } from "react";
import styles from "../styles/translate.module.css";
import Text from "../components/text/text";

const Translate = () => {
  const [query, setQuery] = useState<string>("");
  const [translations, setTranslations] = useState<any[]>([]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const getTranslation = async (
    type: "latin-to-english" | "english-to-latin"
  ) => {
    try {
      const response = await fetch(`/api/${type}?word=${query}`);
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
  };

  //TODO: add a clear button with a switch inside, the switch will toggle auto clear, if true the translations will be cleared after a new translation is made, if false the translations will stay until the user clears them
  return (
    <Layout title="Translator">
      <section className={utilStyles.container}>
        <div className={utilStyles.heading2Xl}>
          <h1>Translator</h1>
        </div>
        <section className={styles.searchContainer}>
          <Text placeholder="Enter a word" onChange={onChange} />
          <div className="button-container">
            <Button onClick={() => getTranslation("latin-to-english")} class={utilStyles.fullWidth}>
              Latin To English
            </Button>
            <Button onClick={() => getTranslation("english-to-latin")} class={utilStyles.fullWidth}>
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
