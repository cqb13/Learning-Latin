import TranslationCard from "@components/translationCard";
import removeExtraSpaces from "@utils/removeExtraSpaces";
import macronHandler from "@utils/macronHandler";
import Layout from "@components/layout";
import Button from "@components/button";
import { useState, useEffect } from "react";
import Text from "@components/text";
import { NextPage } from "next";

const Translate: NextPage = () => {
  const [translations, setTranslations] = useState<any[]>([]);
  const [query, setQuery] = useState("cur");

  useEffect(() => {
    getTranslation("latin-to-english", false);
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const getTranslation = async (
    type: "latin-to-english" | "english-to-latin",
    set: boolean
  ) => {
    setQuery("");

    //should increase performance
    if (translations.find(t => t.word === query)) {
      setTranslations(translations.filter(t => t.word === query));
      return;
    }

    try {
      let cleanQuery = macronHandler(query);
      //if there are extra spaces, empty cards will be created
      cleanQuery = removeExtraSpaces(cleanQuery);
      const response = await fetch(
        `/api/translate?word=${cleanQuery}&lang=${type}`
      );
      const data = await response.json();
      if (!set) return;
      setTranslations(data);
    } catch (error) {
      console.error(error);
    }
  };

  const removeCard = (word: string) => {
    setTranslations(translations.filter(t => t.word !== word));
  };

  return (
    <Layout
      title="Translator"
      backgroundClass="bg-translate-gradient"
    >
      <section className="flex flex-col items-center">
        <h1 className="text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]">
          Translator
        </h1>
        <section className="flex flex-col w-3/5 mt-2">
          <Text
            placeholder="Enter a word"
            onChange={onChange}
            class=" bg-white bg-opacity-30 backdrop-blur-sm"
            keyName="Enter"
            value={query}
          />
          <div className="flex gap-2 mt-2 max-sm:flex-col">
            <Button
              onClick={() => getTranslation("latin-to-english", true)}
              class="w-full"
            >
              Latin To English
            </Button>
            <Button
              onClick={() => getTranslation("english-to-latin", true)}
              class="w-full"
            >
              English To Latin
            </Button>
          </div>
        </section>

        {translations.length > 0 &&
          <section className="flex flex-col justify-center gap-3 w-3/5 mt-3">
            {translations.map(t =>
              <TranslationCard data={t} removeCard={() => removeCard(t.word)} />
            )}
          </section>}
        <p className="text-center">
          Translation functionality is in early development, if you find an
          issue, please open an issue on my github
        </p>
        <a
          className=" text-blue-500 hover:underline"
          href="https://github.com/Templar-Development/Open-Words-TS/issues/new/choose"
          target="_blank"
        >
          Github Issue
        </a>
      </section>
    </Layout>
  );
};

export default Translate;
