import convertMarkdownContentToHtml from "@utils/textbook/convertMarkdownContentToHtml";
import TextbookSideNav from "@components/textbook/textbookSideNav";
import textbook from "@data/textbook/textbookMap";
import Layout from "@components/shared/layout";
import { useEffect, useState } from "react";
import { NextPage } from "next";

{/*Design inspiration from: https://tailwindcss.com/docs/installation*/}

const Textbook: NextPage = ({ textbookMap }: any) => {
  const [groupedTextBookMap, setGroupedTextBookMap] = useState<any>({});
  const [currentData, setCurrentData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      setGroupedTextBookMap(textbook);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const updateCurrentData = (content: string) => {
    setCurrentData(convertMarkdownContentToHtml(content));
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title="Textbook">
      <section className="flex flex-col items-center">
        <section className="w-full flex flex-row justify-between gap-5 p-4">
          <TextbookSideNav
            data={groupedTextBookMap}
            update={updateCurrentData}
          />
          <article
            className="pl-[21rem] flex-2 w-2/3 max-h-max overflow-y-auto"
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
