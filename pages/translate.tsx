import TranslationCard from "@components/translate/translationCard";
import Button from "@components/shared/button";
import Layout from "@components/shared/layout";
import Text from "@components/shared/text";
import { useState } from "react";
import { NextPage } from "next";

const Translate: NextPage = () => {
  const [translations, setTranslations] = useState<any[]>([]);
  const [query, setQuery] = useState("");
  const [maxDefinitions, setMaxDefinitions] = useState<number>(6);
  const [useTricks, setUseTricks] = useState<boolean>(true);
  const [sortOutput, setSortOutput] = useState<boolean>(true);
  const [nothingFound, setNothingFound] = useState<boolean>(false);
  const [currentKind, setCurrentKind] = useState<"latin" | "english">("latin");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const getTranslation = async (
    type: "latin-to-english" | "english-to-latin"
  ) => {
    if (query === "") {
      return;
    }

    if (type == "latin-to-english") {
      setCurrentKind("latin");
    } else {
      setCurrentKind("english");
    }

    setNothingFound(false);

    try {
      const url =
        type === "latin-to-english"
          ? `https://translator.learninglatin.net/latin_to_english?latin_text=${query.trim()}&max=${maxDefinitions}&tricks=${useTricks}&sort=${sortOutput}`
          : `https://translator.learninglatin.net/english_to_latin?english_text=${query.trim()}&max=${maxDefinitions}&sort=${sortOutput}`;

      let result = await fetch(url).then((res) => res.json());

      if (result.error) {
        setNothingFound(true);
        throw new Error(result.error);
      } else {
        if (result.length === 0) {
          setNothingFound(true);
        }

        setTranslations(result);
      }
      setQuery("");
    } catch (error) {
      setNothingFound(true);
      console.error(error);
    }
  };

  const removeCard = (word: string) => {
    setTranslations(translations.filter((t) => t.word !== word));
  };

  return (
    <Layout title="Translator" backgroundClass="bg-translate-gradient">
      <section className="flex flex-col items-center">
        <h1 className="text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]">
          Translator
        </h1>
        <section className="flex flex-col w-3/5 mt-2 max-xs:w-4/5">
          <Text
            placeholder="Enter a word"
            onChange={onChange}
            class=" bg-white bg-opacity-30 backdrop-blur-sm"
            keyName="Enter"
            value={query}
          />
          <a
            href="https://github.com/cqb13/vocab-vault/tree/api"
            className="text-xs my-2 hover:underline transition-all w-fit"
            target="_blank"
          >
            Powered by Vocab Vault
          </a>
          <section className="flex justify-between max-sm:flex-col gap-2">
            <div className="p-2 border border-neutral-300 rounded flex-grow bg-white bg-opacity-30 backdrop-blur-sm">
              <p>Max Definitions</p>
              <div className="flex gap-2 items-center justify-center">
                <input
                  type="range"
                  className="flex-grow h-2 bg-primary-color rounded appearance-none focus:outline-none ring-1 accent-primary-color-dark hover:accent-primary-color-dark transition-colors ring-gray-300 focus:ring-gray-100"
                  min={1}
                  max={10}
                  value={maxDefinitions}
                  onChange={(e) => setMaxDefinitions(parseInt(e.target.value))}
                />
                <p className="w-4">{maxDefinitions}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 border border-neutral-300 rounded flex-grow bg-white bg-opacity-30 backdrop-blur-sm">
              <p>Use Tricks</p>
              <div
                className={`w-5 h-5 ${
                  useTricks ? "bg-primary-color" : ""
                } rounded border border-primary-color cursor-pointer`}
                onClick={() => setUseTricks(!useTricks)}
              ></div>
            </div>
            <div className="flex items-center justify-center gap-2 p-2 border border-neutral-300 rounded flex-grow bg-white bg-opacity-30 backdrop-blur-sm">
              <p>Sort Output</p>
              <div
                className={`w-5 h-5 ${
                  sortOutput ? "bg-primary-color" : ""
                } rounded border border-primary-color cursor-pointer`}
                onClick={() => setSortOutput(!sortOutput)}
              ></div>
            </div>
          </section>
          <div className="flex gap-2 mt-2 max-sm:flex-col">
            <Button
              onClick={() => getTranslation("latin-to-english")}
              locked={false}
              class="w-full"
            >
              Latin To English
            </Button>
            <Button
              onClick={() => getTranslation("english-to-latin")}
              locked={false}
              class="w-full"
            >
              English To Latin
            </Button>
          </div>
        </section>
        <section className="flex flex-col justify-center gap-3 w-3/5 mt-3 max-xs:w-4/5">
          {translations.length > 0 && (
            <>
              {translations.map((t) => (
                <TranslationCard
                  kind={currentKind}
                  data={t}
                  removeCard={() => removeCard(t.word)}
                />
              ))}
            </>
          )}

          {nothingFound && (
            <section className="bg-slate-50 bg-opacity-10 rounded flex flex-col p-4 shadow-card">
              <p className="text-center">No translations found</p>
            </section>
          )}
        </section>
      </section>
    </Layout>
  );
};

export default Translate;
