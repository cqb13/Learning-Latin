import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import { useEffect, useState } from "react";
import Text from "@components/shared/text";
import { NextPage } from "next";
import { get } from "http";

const Hangman: NextPage = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [lives, setLives] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    if (words.length === 0) {
      get_some_words(10);
    }
  }, [words]);

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    console.log(randomWord);
    setCurrentWord(randomWord);
  };

  const get_some_words = async (amount: number) => {
    try {
      const url = `https://translator.learninglatin.net/get_list?type_of_words=latin&pos_list=noun,verb&amount=10&random=true`;
      //TODO: also keep track of pos and senses to show after game is over
      //TODO: remember to implement principle part generator for latin words in the gen_list endpoint
      /*
        orth: String,
        parts: Vec<String>,
        senses: Vec<String>,
        pos: PartOfSpeech,
        form: Form,
        info: WordInfo,
        n: Option<Vec<NValue>>,
        modifiers: Option<Vec<Modifier>>,
        id: i32,
        extension_senses: Option<Vec<String>>,
       */
      let result = await fetch(url).then((res) => res.json());

      if (result.error) {
        setWords(["puella", "discipuli", "canis", "femina", "puer", "servus"]);
        console.error(result.error);
      } else {
        //TODO: in the future, get a random part from the list of parts
        let words = result.map((word: any) => word.orth);
        setWords(words);
      }
    } catch (error) {
      console.error(error);
      setWords(["puella", "discipuli", "canis", "femina", "puer", "servus"]);
    }
  };

  return (
    <Layout title='Translator' backgroundClass='bg-translate-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'>
          Hangman
        </h1>
        <section className='mt-6 flex flex-col items-center gap-3'>
          <Button
            onClick={startGame}
            locked={false}
            class='w-1/4 max-md:w-3/4 max-xs:w-11/12'
          >
            Start Game
          </Button>
        </section>
      </section>
    </Layout>
  );
};

export default Hangman;
