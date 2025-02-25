import Button from "@/components/shared/button";

export default function Games() {
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)] text-center">
        Games
      </h1>
      <section className="mt-6 flex flex-wrap justify-center items-center gap-3 w-full max-md:flex-col">
        <Button
          link="/games/hangman"
          locked={false}
          class=" w-1/4 max-md:w-3/4 max-xs:w-11/12"
        >
          Hangman
        </Button>
        <Button
          link="/games/wordle"
          locked={false}
          class=" w-1/4 max-md:w-3/4 max-xs:w-11/12"
        >
          Wordle
        </Button>
        <Button
          link="/games/word-scramble"
          locked={false}
          class=" w-1/4 max-md:w-3/4 max-xs:w-11/12"
        >
          Word Scramble
        </Button>
        <Button
          link="/games/word-search"
          locked={true}
          class=" w-1/4 max-md:w-3/4 max-xs:w-11/12"
        >
          Word Search
        </Button>
      </section>
    </section>
  );
}
