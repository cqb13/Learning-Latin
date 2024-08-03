import Keyboard from "@components/games/general/keyboard";
import { useEffect, useState, useCallback } from "react";
import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import Text from "@components/shared/text";
import { NextPage } from "next";

const AMOUNT_OF_WORDS_PER_FETCH = 20;
const DEFAULT_WORD_LIST: LatinWord[] = [
  {
    orth: "puella",
    parts: ["puella", "puellae"],
    senses: [
      "girl, (female) child/daughter",
      "maiden",
      "young woman/wife",
      "sweetheart"
    ],
    pos: "noun",
    id: 32256
  },
  {
    orth: "discipulus",
    parts: ["discipulus", "discipuli"],
    senses: ["student, pupil, trainee", "follower, disciple"],
    pos: "noun",
    id: 18070
  }
];
const STARTING_LIVES = 10;

type WordList = {
  word: string;
  info: LatinWord;
};

type LatinWord = {
  orth: string;
  parts: string[];
  senses: string[];
  pos: string;
  id: number;
};

const Hangman: NextPage = () => {
  const [words, setWords] = useState<LatinWord[]>([]);
  const [currentWord, setCurrentWord] = useState<WordList>({
    word: "",
    info: {
      orth: "",
      parts: [],
      senses: [],
      pos: "",
      id: 0
    }
  });
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [completedWords, setCompletedWords] = useState<LatinWord[]>([]);
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

  const nextWord = (force: boolean) => {
    setGuessedLetters([]);
    setKeyStats({});
    // the player skips a word as they think they can't solve it
    if (force) {
      deductLife();
    }
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

    let wordParts = randomWord.parts;
    wordParts = wordParts.filter((part) => !part.includes("---"));
    const randomPartIndex = Math.floor(Math.random() * wordParts.length);

    const word = {
      word: randomWord.parts[randomPartIndex].replace(" | undeclined", ""),
      info: randomWord
    };

    setCurrentWord(word);
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
    if (guessedLetters.includes(currentGuess.toLowerCase())) {
      setCurrentGuess("");
      return;
    }
    if (currentGuess.length === 1) {
      const guessLower = currentGuess.toLowerCase();
      if (currentWord.word.includes(guessLower)) {
        setGuessedLetters((prev) => [...prev, guessLower]);
        setKeyStats((prev) => ({
          ...prev,
          [currentGuess.toUpperCase()]: "correct"
        }));

        if (
          currentWord.word
            .split("")
            .every((letter) =>
              [...guessedLetters, currentGuess].includes(letter)
            )
        ) {
          setCompletedWords((prev) => [currentWord.info, ...prev]);
          nextWord(false);
        }
      } else {
        deductLife();
        setGuessedLetters((prev) => [...prev, guessLower]);
        setKeyStats((prev) => ({
          ...prev,
          [currentGuess.toUpperCase()]: "incorrect"
        }));
      }
    } else if (currentGuess.toLowerCase() === currentWord.word) {
      setCompletedWords((prev) => [currentWord.info, ...prev]);
      nextWord(false);
    } else {
      deductLife();
    }
    setCurrentGuess("");
  };

  const get_some_words = async (amount: number) => {
    if (words.length > 0) return;
    try {
      const url = `https://translator.learninglatin.net/get_list?type_of_words=latin&pos_list=noun,verb&amount=${amount}&random=true`;
      let result = await fetch(url).then((res) => res.json());

      if (result.error) {
        setWords(DEFAULT_WORD_LIST);
        console.error(result.error);
      } else {
        let latinWordList: LatinWord[] = result.map((word: any) => {
          return {
            orth: word.orth,
            parts: word.parts,
            senses: word.senses,
            pos: word.pos,
            id: word.id
          };
        });

        setWords(latinWordList);
      }
    } catch (error) {
      console.error(error);
      setWords(DEFAULT_WORD_LIST);
    }
  };

  const onChar = (key: string) => {
    const letter = key.toLowerCase();
    setCurrentGuess((prev) => prev + letter);
  };

  const onDelete = () => {
    setCurrentGuess((prev) => prev.slice(0, -1));
  };

  const onEnter = () => {
    guess();
  };

  return (
    <Layout title='Hangman' backgroundClass='bg-hangman-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'>
          Hangman
        </h1>
        <section className='flex flex-col gap-2 w-3/5 mt-2 max-xs:w-4/5'>
          <section className='flex gap-2 items-center justify-center'>
            {currentWord.word != "" && gameStarted ? (
              currentWord.word.split("").map((letter, index) => {
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
                onClick={() => nextWord(true)}
                locked={gameOver || !gameStarted}
                class='w-full'
              >
                Next
              </Button>
            </div>
          </section>

          <section className='flex flex-col gap-2'>
            {gameOver && lives === 0 ? (
              <div
                key={currentWord.info.id}
                className='bg-white bg-opacity-30 backdrop-blur-sm p-2 border border-neutral-300 rounded'
              >
                <h2>
                  {currentWord.info.orth} | {currentWord.info.pos}
                </h2>
                <p>{currentWord.info.parts.join(", ")}</p>
                <p>{currentWord.info.senses.join(", ")}</p>
              </div>
            ) : null}
            {completedWords.map((word) => (
              <div
                key={word.id}
                className='bg-white bg-opacity-30 backdrop-blur-sm p-2 border border-neutral-300 rounded'
              >
                <h2>
                  {word.orth} | {word.pos}
                </h2>
                <p>{word.parts.join(", ")}</p>
                <p>{word.senses.join(", ")}</p>
              </div>
            ))}
          </section>
        </section>
      </section>
    </Layout>
  );
};

export default Hangman;
