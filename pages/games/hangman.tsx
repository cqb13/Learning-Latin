import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import { useEffect, useState } from "react";
import Text from "@components/shared/text";
import { NextPage } from "next";

const AMOUNT_OF_WORDS_PER_FETCH = 20;
const DEFAULT_WORD_LIST = [
  "puella",
  "discipuli",
  "canis",
  "femina",
  "puer",
  "servus",
];
const STARTING_LIVES = 10;

const Hangman: NextPage = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [lives, setLives] = useState(STARTING_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (words.length === 0) {
      get_some_words(AMOUNT_OF_WORDS_PER_FETCH);
    }
  }, [words]);

  const reset = () => {
    setWords([]);
    setGuessedLetters([]);
    setCurrentGuess("");
    setLives(STARTING_LIVES);
    setGameOver(false);
    setGameStarted(false);
  };

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
    setGameStarted(true);
  };

  const nextWord = (force: boolean) => {
    select_new_word();
    if (force) {
      if (lives - 1 === 0) {
        setGameOver(true);
      }

      setLives(lives - 1);
    }

    setGuessedLetters([]);
  };

  const updateCurrentGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(e.target.value);
  };

  const select_new_word = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    const newWords = words.filter((word) => word !== randomWord);
    setWords(newWords);
    setCurrentWord(randomWord);
  };

  const guess = () => {
    if (currentGuess.length === 1) {
      if (currentWord.includes(currentGuess.toLowerCase())) {
        setGuessedLetters([...guessedLetters, currentGuess.toLowerCase()]);

        if (currentWord.length <= 0) return; 
        if (currentWord.split("").every((letter) => guessedLetters.includes(letter)) && lives > 0 ) {
          nextWord(false); // continue to next word
        }
      } else {
        if (lives - 1 === 0) {
          setGameOver(true);
        }

        setLives(lives - 1);
      }
    } else {
      if (currentGuess.toLowerCase() === currentWord) {
        nextWord(false);
      } else {
        if (lives - 1 === 0) {
          setGameOver(true);
        }

        setLives(lives - 1);
      }
    }

    setCurrentGuess("");
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
        setWords(DEFAULT_WORD_LIST);
        console.error(result.error);
      } else {
        //TODO: in the future, get a random part from the list of parts
        let words = result.map((word: any) => word.orth);
        setWords(words);
      }
    } catch (error) {
      console.error(error);
      setWords(DEFAULT_WORD_LIST);
    }
  };

  return (
    <Layout title='Translator' backgroundClass='bg-translate-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'>
          Hangman
        </h1>
        <p>{currentWord}</p>
        <div className='flex flex-col gap-2 w-3/5 my-2'>
          <section className='flex gap-2 items-center justify-center'>
            {currentWord.split("").map((letter, index) => {
              return (
                <div
                  key={index}
                  className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border border-neutral-300 rounded flex justify-center items-center'
                >
                  {guessedLetters.includes(letter) ? letter : "_"}
                </div>
              );
            })}
          </section>

          <section className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <Text
                placeholder='Enter a letter/word'
                class=' bg-white bg-opacity-30 backdrop-blur-sm flex-grow'
                onChange={updateCurrentGuess}
                value={currentGuess}
                keyName='Enter'
              />
              <Button onClick={guess} locked={gameOver || !gameStarted}>
                Guess
              </Button>
              <div className='bg-white bg-opacity-30 backdrop-blur-sm text-md p-2 border border-neutral-300 rounded flex justify-center items-center'>
                {lives} lives left
              </div>
              <div className='bg-white bg-opacity-30 backdrop-blur-sm text-md p-2 border border-neutral-300 rounded flex justify-center items-center'>
                {guessedLetters.length} guesses
              </div>
            </div>
            {/**Keyboard display with used letters here */}
            <div className='flex items-center justify-center w-full gap-2'>
              {gameStarted ? (
                <Button onClick={reset} locked={false} class='w-full'>
                  Restart
                </Button>
              ) : (
                <Button onClick={startGame} locked={false} class='w-full'>
                  Start Game
                </Button>
              )}
              <Button
                onClick={() => nextWord(true)}
                locked={gameOver || !gameStarted}
                class='w-full'
              >
                Next
              </Button>
            </div>
          </section>
        </div>
      </section>
    </Layout>
  );
};

export default Hangman;
