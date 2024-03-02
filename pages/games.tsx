import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import { NextPage } from "next";

/*
- Word Search,
- Word Scramble (give definition and letters, user has to unscramble)
*/

const Games: NextPage = () => {
  return (
    <Layout title='Practice' backgroundClass='bg-game-nav-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)] text-center'>
          Games
        </h1>
        <section className='mt-6 flex flex-wrap justify-center items-center gap-3 w-full max-md:flex-col'>
          <Button
            link='/games/hangman'
            locked={false}
            class=' w-1/4 max-md:w-3/4 max-xs:w-11/12'
          >
            Hangman
          </Button>
          <Button
            link='/games/word-search'
            locked={true}
            class=' w-1/4 max-md:w-3/4 max-xs:w-11/12'
          >
            Word Search
          </Button>
          <Button
            link='/games/word-scramble'
            locked={true}
            class=' w-1/4 max-md:w-3/4 max-xs:w-11/12'
          >
            Word Scramble
          </Button>
        </section>
      </section>
    </Layout>
  );
};

export default Games;
