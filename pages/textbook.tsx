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
  const [currentData, setCurrentData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const order = ["nouns", "adjectives"];

  useEffect(() => {
    const fetchData = async () => {
      const groupedTextBookMap = groupDataByPath(textbookMap, order);

      setGroupedTextBookMap(groupedTextBookMap);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const updateCurrentData = (content: string) => {
    setCurrentData(convertMarkdownContentToHtml(content));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title="Textbook" mainClass="max-h-screen">
      <section className="flex flex-col items-center">
        <section className="w-full flex flex-row justify-between gap-5 p-4 h-[calc(100vh-7rem)]">
          <TextbookSideNav
            data={groupedTextBookMap}
            update={updateCurrentData}
          />
          <article
            className="p-4 flex-2 w-2/3 max-h-max overflow-y-scroll"
            dangerouslySetInnerHTML={{ __html: currentData }}
          />
          <section className="flex-auto w-3/12 h-fit max-lg:hidden">
            {/**Just a placeholder for now, when i have more time, will be a table of context for a chapter*/}
          </section>
        </section>
      </section>
    </Layout>
  );
};

export default Textbook;
