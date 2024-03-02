import convertMarkdownContentToHtml from "@utils/textbook/convertMarkdownContentToHtml";
import TextbookSideNav from "@components/textbook/textbookSideNav";
import textbook from "@data/textbook/textbookMap";
import Button from "@components/shared/button";
import Layout from "@components/shared/layout";
import { useEffect, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";

{
  /*Design inspiration from: https://tailwindcss.com/docs/installation*/
}

const Textbook: NextPage = () => {
  const [groupedTextBookMap, setGroupedTextBookMap] = useState<any>({});
  const [currentData, setCurrentData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setGroupedTextBookMap(textbook);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const updateSideBarVisibility = (newState: boolean) => {
    setSideBarOpen(newState);
  };

  const updateCurrentData = (content: string) => {
    setCurrentData(convertMarkdownContentToHtml(content));
    window.scrollTo(0, 0);
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout title='Textbook' backgroundClass=' bg-textbook-gradient'>
      <section className='flex max-mdLg:justify-center max-mdLg:flex-col'>
        <Button
          class={`mdLg:hidden sticky child:w-5 child:h-5 w-fit rounded-2xl rounded-tl-none rounded-bl-none mt-2 ${
            sideBarOpen ? "hidden" : ""
          }`}
          onClick={() => setSideBarOpen(!sideBarOpen)}
        >
          <Image src='/arrowRight.svg' alt='Expand' width={50} height={50} />
        </Button>
        <TextbookSideNav
          data={groupedTextBookMap}
          update={updateCurrentData}
          updateSideBarVisibility={updateSideBarVisibility}
          open={sideBarOpen}
        />
        <article
          className={`py-16 w-7/12 max-lg:w-10/12 max-mdLg:py-0 ${
            sideBarOpen ? "hidden" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: currentData }}
        />
      </section>
    </Layout>
  );
};

export default Textbook;
