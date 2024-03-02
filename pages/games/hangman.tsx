import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import { useEffect, useState, useCallback } from "react";
import Text from "@components/shared/text";
import { NextPage } from "next";
import Keyboard from "@components/games/general/keyboard";

const AMOUNT_OF_WORDS_PER_FETCH = 20;
const DEFAULT_WORD_LIST = [
  "puella",
  "discipuli",
  "canis",
  "femina",
  "puer",
  "servus"
];
const STARTING_LIVES = 10;

const Hangman: NextPage = () => {
  const [words, setWords] = useState<string[]>([]);
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [completedWords, setCompletedWords] = useState<string[]>([]);
  const [keyStats, setKeyStats] = useState<{
    [key: string]: "correct" | "incorrect" | "default";
  }>({});
  const [currentGuess, setCurrentGuess] = useState("");
  const [lives, setLives] = useState(STARTING_LIVES);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (words.length === 0) {
      get_some_words(AMOUNT_OF_WORDS_PER_FETCH);
    }
  }, [gameStarted]);

  const reset = () => {
    setGuessedLetters([]);
    setCurrentGuess("");
    setLives(STARTING_LIVES);
    setGameOver(false);
    setGameStarted(false);
    setCompletedWords([]);
    setKeyStats({});
  };

  const startGame = () => {
    reset();
    selectNewWord();
    setGameStarted(true);
  };

  const nextWord = () => {
    setGuessedLetters([]);
    setKeyStats({});
    deductLife();
    selectNewWord();
  };

  const selectNewWord = useCallback(() => {
    if (words.length === 0) {
      console.warn("No words available. Refetching.");
      get_some_words(AMOUNT_OF_WORDS_PER_FETCH);
      return;
    }
    const randomIndex = Math.floor(Math.random() * words.length);
    const randomWord = words[randomIndex];
    setCurrentWord(randomWord);
    setWords((prevWords) =>
      prevWords.filter((_, index) => index !== randomIndex)
    );
  }, [words]);

  const deductLife = useCallback(() => {
    setLives((prevLives) => {
      if (prevLives - 1 <= 0) {
        setGameOver(true);
        return 0;
      }
      return prevLives - 1;
    });
  }, []);

  const guess = () => {
    if (!currentGuess) return;
    if (currentGuess.length === 1) {
      const guessLower = currentGuess.toLowerCase();
      if (currentWord.includes(guessLower)) {
        setGuessedLetters((prev) => [...prev, guessLower]);
        setKeyStats((prev) => ({
          ...prev,
          [currentGuess.toUpperCase()]: "correct"
        }));
      } else {
        deductLife();
        setKeyStats((prev) => ({
          ...prev,
          [currentGuess.toUpperCase()]: "incorrect"
        }));
      }
    } else if (currentGuess.toLowerCase() === currentWord) {
      setCompletedWords((prev) => [...prev, currentWord]);
      selectNewWord();
    } else {
      deductLife();
    }
    setCurrentGuess("");
  };

  const get_some_words = async (amount: number) => {
    if (words.length > 0) return;
    console.log("Fetching words");
    try {
      const url = `https://translator.learninglatin.net/get_list?type_of_words=latin&pos_list=noun,verb&amount=${amount}&random=true`;
      let result = await fetch(url).then((res) => res.json());

      if (result.error) {
        setWords(DEFAULT_WORD_LIST);
        console.error(result.error);
      } else {
        let newWords = result.map((word: any) => word.orth);
        setWords(newWords);
      }
    } catch (error) {
      console.error(error);
      setWords(DEFAULT_WORD_LIST);
    }
  };

  const updateCurrentGuess = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentGuess(e.target.value);
  };

  const onChar = (key: string) => {
    const letter = key.toLowerCase();
    if (!guessedLetters.includes(letter)) {
      setCurrentGuess(letter);
    }
  };

  const onDelete = () => {
    setCurrentGuess("");
  };

  const onEnter = () => {
    guess();
  };

  return (
    <Layout title='Translator' backgroundClass='bg-translate-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'>
          Hangman
        </h1>
        <p>{currentWord}</p>
        <section className='flex flex-col gap-2 w-3/5 mt-2 max-xs:w-4/5'>
          <section className='flex gap-2 items-center justify-center'>
            {currentWord != "" && gameStarted ? (
              currentWord.split("").map((letter, index) => {
                return (
                  <div
                    key={index}
                    className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 max-xs:p-1 border border-neutral-300 rounded flex justify-center items-center'
                  >
                    {guessedLetters.includes(letter) ? letter : "_"}
                  </div>
                );
              })
            ) : (
              <div className='flex gap-2 items-center justify-center'>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  p
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  r
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  e
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  s
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  s
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'></div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  s
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  t
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  a
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  r
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center'>
                  t
                </div>
              </div>
            )}
          </section>

          <section className='flex flex-col gap-2'>
            <div className='flex gap-2 max-lg:flex-col'>
              <div className='flex gap-2 flex-grow'>
                <Text
                  placeholder='Enter a letter/word'
                  class=' bg-white bg-opacity-30 backdrop-blur-sm flex-grow'
                  onChange={updateCurrentGuess}
                  value={currentGuess}
                  keyName='Enter'
                />
                <Button
                  onClick={guess}
                  locked={gameOver || !gameStarted}
                  class='max-xs:hidden'
                >
                  Guess
                </Button>
              </div>
              <Button
                onClick={guess}
                locked={gameOver || !gameStarted}
                class='xs:hidden'
              >
                Guess
              </Button>
              <div className='flex gap-2'>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-md p-2 border border-neutral-300 rounded flex justify-center items-center max-lg:flex-grow'>
                  {lives} lives left
                </div>
                <div className='bg-white bg-opacity-30 backdrop-blur-sm text-md p-2 border border-neutral-300 rounded flex justify-center items-center max-lg:flex-grow'>
                  {completedWords.length} completed
                </div>
              </div>
            </div>
            <Keyboard
              onChar={onChar}
              onDelete={onDelete}
              onEnter={onEnter}
              keyStats={keyStats}
              locked={gameOver || !gameStarted}
            />
            <div className='flex items-center justify-center w-full gap-2'>
              {gameStarted ? (
                <Button onClick={reset} locked={false} class='w-full'>
                  Restart
                </Button>
              ) : (
                <Button onClick={startGame} locked={false} class='w-full'>
                  Start
                </Button>
              )}
              <Button
                onClick={nextWord}
                locked={gameOver || !gameStarted}
                class='w-full'
              >
                Next
              </Button>
            </div>
          </section>
        </section>
      </section>
    </Layout>
  );
};

export default Hangman;
