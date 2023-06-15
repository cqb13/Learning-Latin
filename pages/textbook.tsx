import convertMarkdownContentToHtml from "@utils/textbook/convertMarkdownContentToHtml";
import TextbookSideNav from "@components/textbook/textbookSideNav";
import groupDataByPath from "@utils/textbook/groupTextbookMap";
import getTextbookMap from "@utils/textbook/getTextbookMap";
import Layout from "@components/shared/layout";
import { useEffect, useState } from "react";
import { NextPage } from "next";

export async function getStaticProps() {
  const textbookMap = await getTextbookMap();
  return {
    props: {
      textbookMap
    }
  };
}

const Textbook: NextPage = ({ textbookMap }: any) => {
  const [groupedTextBookMap, setGroupedTextBookMap] = useState<any>({});
  const [currentData, setCurrentData] = useState<any>(<h1>Test</h1>);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const order = ["nouns", "adjectives"]

  useEffect(() => {
    const fetchData = async () => {
      const groupedTextBookMap = groupDataByPath(textbookMap, order);

      setGroupedTextBookMap(groupedTextBookMap);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const updateCurrentData = (content: any) => {
    setCurrentData(convertMarkdownContentToHtml(content));
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title="Textbook">
      <section className="flex flex-col items-center min-h-5/6">
        <h1 className="text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)] text-center">
          Latin Grammar
        </h1>
        <section className="w-full flex flex-row justify-between gap-5 p-4">
          <TextbookSideNav data={groupedTextBookMap} update={updateCurrentData} />
          <article
            className="p-4 flex-2 w-2/3"
            dangerouslySetInnerHTML={{ __html: currentData }}
          />
          <section className="flex-auto w-3/12">
            {/**Just a placeholder for now, when i have more time, will be a table of context for a chapter*/}
          </section>
        </section>
      </section>
    </Layout>
  );
};

export default Textbook;
