import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import { useEffect, useState } from "react";
import Text from "@components/shared/text";
import { NextPage } from "next";
import Keyboard from "@components/games/general/keyboard";

enum WordleGuessStatus {
  Correct,
  Incorrect,
  Invalid,
  Unknown
}

const generateWordleGrid = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: "",
      status: WordleGuessStatus.Unknown
    }))
  );
};

const Wordle: NextPage = () => {
  const wordLength = 5;
  const maxTries = 6;
  const AMOUNT_OF_WORDS_PER_FETCH = 10;
  const [correctWord, setCorrectWord] = useState("");
  const [words, setWords] = useState<LatinWord[]>([]);
  const [completedWords, setCompletedWords] = useState<LatinWord[]>([]);
  type LatinWord = {
    orth: string;
    parts: string[];
    senses: string[];
    pos: string;
    id: number;
  };
  const [wordleGrid, setWordleGrid] = useState(() =>
    generateWordleGrid(maxTries, wordLength)
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [keyStats, setKeyStats] = useState<{
    [key: string]: "correct" | "incorrect" | "default" | "gray" | "orange";
  }>({});
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (words.length === 0) {
      get_some_words(AMOUNT_OF_WORDS_PER_FETCH);
    }
    reset();
    setGameStarted(true);
  }, [gameStarted]);

  useEffect(() => {
    selectNewWord();
  }, [words]);

  const reset = () => {
    setWordleGrid(generateWordleGrid(maxTries, wordLength));
    setCurrentRow(0);
    setKeyStats({});
    setGameOver(false);
  };

  const selectNewWord = () => {
    if (words.length === 0) return;

    const randomIndex = Math.floor(Math.random() * words.length);
    const newWord = words[randomIndex].orth;
    console.log(newWord);
    setCorrectWord(newWord);
  };

  const onChar = (char: string) => {
    const firstEmptyCellIndex = getIndexOfFirstEmptyCell(
      wordleGrid[currentRow]
    );

    setWordleGrid((currentGrid) => {
      const newGrid = currentGrid.map((row, rowIndex) => {
        if (rowIndex !== currentRow) return row;
        const newRow = [...row];
        if (firstEmptyCellIndex === wordLength) return newRow;
        newRow[firstEmptyCellIndex].value = char;
        return newRow;
      });
      return newGrid;
    });
  };

  const onDelete = () => {
    const currentRowCells = wordleGrid[currentRow];

    for (let i = currentRowCells.length - 1; i >= 0; i--) {
      if (currentRowCells[i].value !== "") {
        setWordleGrid((currentGrid) => {
          const newGrid = currentGrid.map((row, rowIndex) => {
            if (rowIndex !== currentRow) return row;
            const newRow = [...row];
            newRow[i].value = "";
            return newRow;
          });
          return newGrid;
        });
        break;
      }
    }
  };

  const getIndexOfFirstEmptyCell = (
    row: {
      value: string;
      status: WordleGuessStatus;
    }[]
  ) => {
    let index = row.findIndex((cell) => cell.value === "");
    return index === -1 ? wordLength : index;
  };

  const onEnter = () => {
    if (wordleGrid[currentRow].some((cell) => cell.value === "")) {
      return;
    }

    processCurrentRow();

    if (currentRow + 1 === maxTries) {
      setGameOver(true);

      return;
    }

    setCurrentRow(currentRow + 1);
  };

  const processCurrentRow = () => {
    const currentRowCells = wordleGrid[currentRow];
    const currentRowWord = currentRowCells.map((cell) => cell.value).join("");

    if (currentRowWord.toLowerCase() === correctWord) {
      const newKeyStats = { ...keyStats };
      for (let i = 0; i < wordLength; i++) {
        const cell = currentRowCells[i];
        cell.status = WordleGuessStatus.Correct;
        newKeyStats[cell.value] = "correct";
      }
      setKeyStats(newKeyStats);
      return;
    }

    const newKeyStats = { ...keyStats };

    const contained_letters = correctWord.split("");

    for (let i = 0; i < wordLength; i++) {
      const cell = currentRowCells[i];

      if (cell.value.toLowerCase() === correctWord[i]) {
        cell.status = WordleGuessStatus.Correct;
        newKeyStats[cell.value] = "correct";
        contained_letters[i] = "";
        continue;
      }
    }

    for (let i = 0; i < wordLength; i++) {
      const cell = currentRowCells[i];

      if (cell.status === WordleGuessStatus.Correct) {
        continue;
      }

      if (contained_letters.includes(cell.value.toLowerCase())) {
        cell.status = WordleGuessStatus.Incorrect;
        newKeyStats[cell.value] = "orange";
        contained_letters[contained_letters.indexOf(cell.value.toLowerCase())] =
          "";
      }
    }

    for (let i = 0; i < wordLength; i++) {
      const cell = currentRowCells[i];

      if (cell.status === WordleGuessStatus.Unknown) {
        cell.status = WordleGuessStatus.Invalid;
        newKeyStats[cell.value] = "gray";
      }
    }

    setKeyStats(newKeyStats);
  };

  const colorFromGridItemStatus = (status: WordleGuessStatus) => {
    switch (status) {
      case WordleGuessStatus.Correct:
        return "bg-green-300";
      case WordleGuessStatus.Incorrect:
        return "bg-orange-300";
      case WordleGuessStatus.Invalid:
        return "bg-neutral-300";
      case WordleGuessStatus.Unknown:
        return "bg-white";
      default:
        return "bg-white";
    }
  };

  const get_some_words = async (amount: number) => {
    if (words.length > 0) return;
    try {
      const url = `https://translator.learninglatin.net/get_list?type_of_words=latin&pos_list=noun&amount=${amount}&exact=5&random=true`;
      let result = await fetch(url).then((res) => res.json());

      if (result.error) {
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

        console.log(latinWordList);

        setWords(latinWordList);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title='Wordle' backgroundClass='bg-wordle-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'>
          Infinite Latin Wordle
        </h1>
        <section className='flex flex-col gap-2 w-3/5 mt-2 max-xs:w-4/5'>
          <section className='flex flex-col gap-2 items-center justify-center'>
            {wordleGrid.map((row, rowIndex) => {
              return (
                <div className='flex gap-2' key={rowIndex}>
                  {row.map((gridItem, letterIndex) => {
                    return (
                      <div
                        key={`${rowIndex}-${letterIndex}`}
                        className={`${colorFromGridItemStatus(
                          gridItem.status
                        )} bg-opacity-30 backdrop-blur-sm text-3xl p-2 w-12 h-12 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center`}
                      >
                        {gridItem.value}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </section>

          <section className='flex flex-col gap-2'>
            <Keyboard
              onChar={onChar}
              onDelete={onDelete}
              onEnter={onEnter}
              keyStats={keyStats}
              locked={false}
            />
          </section>

          <section className='flex flex-col gap-2'>
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

export default Wordle;