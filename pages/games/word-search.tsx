import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import { useState } from "react";
import Text from "@components/shared/text";
import { NextPage } from "next";

const WordSearch: NextPage = () => {
  return (
    <Layout title='Translator' backgroundClass='bg-translate-gradient'>
      <section className='flex flex-col items-center'>
        <h1 className='text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'>
          Word Search
        </h1>
      </section>
    </Layout>
  );
};

export default WordSearch;
