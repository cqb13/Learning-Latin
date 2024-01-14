import TranslationCard from "@components/translate/translationCard";
import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import { useState } from "react";
import Text from "@components/shared/text";
import { NextPage } from "next";

const Translate: NextPage = () => {
  const [translations, setTranslations] = useState<any[]>([]);
  const [query, setQuery] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const getTranslation = async (
    type: "latin-to-english" | "english-to-latin"
  ) => {
    try {
      const url =
        type === "latin-to-english"
          ? `https://translator.learninglatin.net/latin_to_english?text=${query}&max_definitions=6&use_tricks=true&format_output=true&clean_output=false&sort_output=true&filter_uncommon_translations=true`
          : `https://translator.learninglatin.net/english_to_latin?text=${query}&max_definitions=6&format_output=true&clean_output=false&sort_output=true`;

      let result = await fetch(url).then((res) => res.json());

      if (result.error) {
        throw new Error(result.error);
      } else {
        console.log(result.translations);
        setTranslations(result);
      }
      setQuery("");
    } catch (error) {
      console.error(error);
    }
  };

  const removeCard = (word: string) => {
    setTranslations(translations.filter((t) => t.word !== word));
  };

  return (
    <Layout title='Translator' backgroundClass='bg-translate-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'>
          Translator
        </h1>
        <section className='flex flex-col w-3/5 mt-2 max-xs:w-4/5'>
          <Text
            placeholder='Enter a word'
            onChange={onChange}
            class=' bg-white bg-opacity-30 backdrop-blur-sm'
            keyName='Enter'
            value={query}
          />
          <div className='flex gap-2 mt-2 max-sm:flex-col'>
            <Button
              onClick={() => getTranslation("latin-to-english")}
              class='w-full'
            >
              Latin To English
            </Button>
            <Button
              onClick={() => getTranslation("english-to-latin")}
              class='w-full'
            >
              English To Latin
            </Button>
          </div>
        </section>

        {translations.length > 0 && (
          <section className='flex flex-col justify-center gap-3 w-3/5 mt-3 max-xs:w-4/5'>
            {translations.map((t) => (
              <TranslationCard data={t} removeCard={() => removeCard(t.word)} />
            ))}
          </section>
        )}
      </section>
    </Layout>
  );
};

export default Translate;
