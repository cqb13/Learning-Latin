import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import { useState } from "react";
import Text from "@components/shared/text";
import { NextPage } from "next";

const Hangman: NextPage = () => {
  const [words, setWords] = useState(["hello", "world", "test"]);
  const [currentWord, setCurrentWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [lives, setLives] = useState(6);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  const startGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setCurrentWord(randomWord);
  };

  return (
    <Layout title='Translator' backgroundClass='bg-translate-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'>
          Hangman
        </h1>
      </section>
    </Layout>
  );
};

export default Hangman;
