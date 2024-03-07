import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import { useEffect, useState } from "react";
import Text from "@components/shared/text";
import { NextPage } from "next";
import Keyboard from "@components/games/general/keyboard";

// daily word option
// infinite word option
// custom word option (send link to friend with encrypted word in url)

enum GameMode {
  Daily,
  Infinite,
  Custom,
}

enum WordleGuessStatus {
  Correct,
  Incorrect,
  Invalid,
  Unknown,
}

type WordleGridItem = {
  value: string;
  status: WordleGuessStatus;
};

const WordleGridItem: WordleGridItem = {
  value: "",
  status: WordleGuessStatus.Unknown,
};

const WordSearch: NextPage = () => {
  const [word, setWord] = useState<string>("");
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.Daily);
  const [keyStats, setKeyStats] = useState<{
    [key: string]: "correct" | "incorrect" | "default";
  }>({});
  const [wordleGrid, setWordleGrid] = useState<WordleGridItem[][]>([
    [
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
    ], // 0
    [
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
    ], // 1
    [
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
    ], // 2
    [
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
    ], // 3
    [
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
    ], // 4
    [
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
      WordleGridItem,
    ], // 5
  ]);
  const [currentRow, setCurrentRow] = useState<number>(0);

  useEffect(() => {}, []);

  const colorFromGridItemStatus = (status: WordleGuessStatus) => {
    switch (status) {
      case WordleGuessStatus.Correct:
        return "bg-green-500";
      case WordleGuessStatus.Incorrect:
        return "bg-red-500";
      case WordleGuessStatus.Invalid:
        return "bg-neutral-300";
      case WordleGuessStatus.Unknown:
        return "bg-white";
      default:
        return "bg-white";
    }
  };

  const onChar = (char: string) => {
    let grid = wordleGrid;
    // find the next empty cell in the current row, if there are none, select the last cell
    let selectedCell = grid[currentRow].findIndex((cell) => cell.value == "");
    if (selectedCell == -1) {
      selectedCell = grid[currentRow].length - 1;
    }
    grid[currentRow][selectedCell].value = char;
    console.log(grid);
    setWordleGrid(grid);
  };

  const onDelete = () => {
    const newGrid = wordleGrid;
    newGrid[currentRow][0].value = "";
    setWordleGrid(newGrid);
  };

  const onEnter = () => {
    const newGrid = wordleGrid;
    newGrid[currentRow][0].status = WordleGuessStatus.Correct;
    setWordleGrid(newGrid);
    setCurrentRow(currentRow + 1);
  };

  return (
    <Layout title='Wordle' backgroundClass='bg-translate-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'>
          Latin Wordle
        </h1>

        <section className='flex flex-col gap-2 w-3/5 mt-2 max-xs:w-4/5'>
          <section className='flex gap-2 items-center justify-center'>
            {wordleGrid.map((row, rowIndex) => {
              return (
                <div className='' key={rowIndex}>
                  {row.map((gridItem, letterIndex) => {
                    return (
                      <div
                        key={`${rowIndex}-${letterIndex}`}
                        className={`${colorFromGridItemStatus(
                          gridItem.status
                        )} bg-opacity-30 backdrop-blur-sm text-3xl p-2 border max-xs:p-1 border-neutral-300 rounded flex justify-center items-center`}
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

          <section className='flex flex-col gap-2'></section>
        </section>
      </section>
    </Layout>
  );
};

export default WordSearch;
