"use client";

import Notification from "@/components/shared/notification";
import Keyboard from "@/components/games/general/keyboard";
import Button from "@/components/shared/button";
import { useEffect, useState } from "react";

enum GameMode {
  Daily,
  Infinite,
}

enum WordleGuessStatus {
  Correct,
  Incorrect,
  Invalid,
  Unknown,
}

type LatinWord = {
  extension_senses: null;
  form: string;
  id: number;
  info: {
    age: string;
    area: string;
    freq: string;
    geo: string;
    source: string;
  };
  modifiers: null;
  n: number[];
  orth: string;
  parts: string[];
  pos: string;
  senses: string[];
};

const generateWordleGrid = (rows: number, cols: number) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      value: "",
      status: WordleGuessStatus.Unknown,
    })),
  );
};

export default function Wordle() {
  const [notification, setNotification] = useState(false);
  const [notificationTitle, setNotificationTitle] = useState("");
  const [notificationType, setNotificationType] = useState<
    "success" | "error" | "warning"
  >("success");
  const [notificationMessage, setNotificationMessage] = useState("");
  const wordLength = 5;
  const maxTries = 6;
  const [correctWord, setCorrectWord] = useState<LatinWord>();
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.Daily);
  const [words, setWords] = useState<LatinWord[]>([]);
  const [completedWords, setCompletedWords] = useState<LatinWord[]>([]);
  const [finished, setFinished] = useState(false);

  const [wordleGrid, setWordleGrid] = useState(() =>
    generateWordleGrid(maxTries, wordLength),
  );
  const [currentRow, setCurrentRow] = useState(0);
  const [keyStats, setKeyStats] = useState<{
    [key: string]: "correct" | "incorrect" | "default" | "gray" | "orange";
  }>({});

  useEffect(() => {
    get_words();
  }, []);

  useEffect(() => {
    reset();
  }, [GameMode]);

  useEffect(() => {
    selectNewWord(gameMode);
  }, [words]);

  const reset = () => {
    setWordleGrid(generateWordleGrid(maxTries, wordLength));
    setCurrentRow(0);
    setKeyStats({});
    setFinished(false);
  };

  const selectNewWord = (mode: GameMode) => {
    if (words.length === 0) return;

    if (mode === GameMode.Daily) {
      const dayOfYear = new Date().getDate();
      const wordIndex = dayOfYear % words.length;
      const word = words[wordIndex];
      setCorrectWord(word);
    } else {
      const randomIndex = Math.floor(Math.random() * words.length);
      const newWord = words[randomIndex];
      setCorrectWord(newWord);
    }
  };

  const onChar = (char: string) => {
    const firstEmptyCellIndex = getIndexOfFirstEmptyCell(
      wordleGrid[currentRow],
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
    if (finished) return;

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
    }[],
  ) => {
    let index = row.findIndex((cell) => cell.value === "");
    return index === -1 ? wordLength : index;
  };

  const wordIsInList = (word: string) => {
    for (let i = 0; i < words.length; i++) {
      if (words[i].orth.toLowerCase() === word.toLowerCase()) {
        return true;
      }
    }
  };

  const onEnter = () => {
    if (wordleGrid[currentRow].some((cell) => cell.value === "")) {
      triggerNotification(
        "Incomplete Word",
        "warning",
        "Please fill in all the letters.",
      );
      return;
    }

    if (
      !wordIsInList(wordleGrid[currentRow].map((cell) => cell.value).join(""))
    ) {
      triggerNotification(
        "Invalid Word",
        "warning",
        "Word is not in the list of valid words.",
      );
      return;
    }

    processCurrentRow();

    if (
      wordleGrid[currentRow].every(
        (cell) => cell.status === WordleGuessStatus.Correct,
      ) ||
      currentRow + 1 === maxTries
    ) {
      setCompletedWords([correctWord as LatinWord, ...completedWords]);
      return;
    }

    setCurrentRow(currentRow + 1);
  };

  const processCurrentRow = () => {
    const currentRowCells = wordleGrid[currentRow];
    const currentRowWord = currentRowCells.map((cell) => cell.value).join("");

    if (correctWord === undefined) {
      triggerNotification(
        "Error",
        "error",
        "Correct word is not defined. Please try reloading the page.",
      );
      return;
    }

    if (currentRowWord.toLowerCase() === correctWord.orth.toLowerCase()) {
      const newKeyStats = { ...keyStats };
      for (let i = 0; i < wordLength; i++) {
        const cell = currentRowCells[i];
        cell.status = WordleGuessStatus.Correct;
        newKeyStats[cell.value] = "correct";
      }
      setKeyStats(newKeyStats);
      setFinished(true);
      return;
    }

    const newKeyStats = { ...keyStats };

    const contained_letters = correctWord.orth.toLowerCase().split("");

    for (let i = 0; i < wordLength; i++) {
      const cell = currentRowCells[i];

      if (cell.value.toLowerCase() === correctWord.orth.toLowerCase()[i]) {
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

  const get_words = async () => {
    const jsonTokens = await import("../../../lib/data/words.json");
    const jsonData = JSON.stringify(jsonTokens);
    const words = JSON.parse(jsonData);

    setWords(words);
  };

  const switchToOtherGameMode = () => {
    setGameMode(
      gameMode === GameMode.Daily ? GameMode.Infinite : GameMode.Daily,
    );
    if (gameMode === GameMode.Daily) {
      selectNewWord(GameMode.Infinite);
    } else {
      selectNewWord(GameMode.Daily);
    }
    setCompletedWords([]);
    reset();
  };

  const continueGame = () => {
    reset();
    selectNewWord(GameMode.Infinite);
  };

  const triggerNotification = (
    title: string,
    type: "success" | "error" | "warning",
    message: string,
  ) => {
    setNotification(true);
    setNotificationTitle(title);
    setNotificationType(type);
    setNotificationMessage(message);
  };
  return (
    <>
      <section className="flex flex-col items-center">
        <h1 className="text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]">
          Latin Wordle
        </h1>
        <section className="border-neutral-300 border rounded-xl bg-white bg-opacity-30 backdrop-blur-sm xl:w-1/5 flex items-center lg:w-2/5 max-lg:w-2/5 max-sm:w-4/5">
          <button
            onClick={switchToOtherGameMode}
            className={`grow rounded-l-xl transition-all duration-150 ${
              gameMode == GameMode.Daily
                ? "bg-primary-color bg-opacity-30"
                : "hover:bg-primary-color hover:bg-opacity-10"
            }`}
          >
            Daily
          </button>
          <button
            onClick={switchToOtherGameMode}
            className={`grow rounded-r-xl transition-all duration-150  ${
              gameMode == GameMode.Infinite
                ? "bg-primary-color bg-opacity-30"
                : "hover:bg-primary-color hover:bg-opacity-10"
            }`}
          >
            Infinite
          </button>
        </section>
        <section className="flex flex-col gap-2 w-3/5 mt-2 max-xs:w-4/5">
          <section className="flex flex-col gap-2 items-center justify-center">
            {wordleGrid.map((row, rowIndex) => {
              return (
                <div className="flex gap-2" key={rowIndex}>
                  {row.map((gridItem, letterIndex) => {
                    return (
                      <div
                        key={`${rowIndex}-${letterIndex}`}
                        className={`${colorFromGridItemStatus(
                          gridItem.status,
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

          <section className="flex flex-col gap-2">
            <Keyboard
              onChar={onChar}
              onDelete={onDelete}
              onEnter={onEnter}
              keyStats={keyStats}
              locked={false}
            />
          </section>
          <Button
            locked={false}
            class={`w-full ${gameMode === GameMode.Infinite ? "" : "hidden"}`}
            onClick={continueGame}
          >
            Next Word
          </Button>
          <section className="flex flex-col gap-2">
            {completedWords.map((word) => (
              <div
                key={word.id}
                className="bg-white bg-opacity-30 backdrop-blur-sm p-2 border border-neutral-300 rounded"
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
      {notification ? (
        <Notification
          title={notificationTitle}
          type={notificationType}
          message={notificationMessage}
          timeout={5000}
          updateNotificationAction={(value) => setNotification(value)}
        />
      ) : null}
    </>
  );
}
