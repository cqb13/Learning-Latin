import Layout from "@components/layout";
import Button from "@components/button";
import { NextPage } from "next";

const Practice: NextPage = () => {
  const practiceRoutes = [
    ["Declension Endings", "/practice/declension-endings"],
    ["Future Tense", "/practice/future-tense"],
    ["Perfect Tense", "/practice/perfect-tense"],
    ["Personal Endings", "/practice/personal-endings"],
    ["Personal Pronouns", "/practice/personal-pronouns"],
    ["Relative Pronouns", "/practice/relative-pronouns"]
  ];

  return (
    <Layout title="Practice" backgroundClass="bg-practice-nav-gradient">
      <section className="flex flex-col items-center">
        <h1 className="text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]">Practice Charts</h1>
        <section className="mt-6 flex flex-wrap justify-center items-center gap-3 w-4/5 text-center">
          {practiceRoutes.map(route =>
            <Button
              link={`/practice/${route[0].toLowerCase().replace(" ", "-")}`}
              class=" w-1/4"
            >
              {route[0]}
            </Button>
          )}
        </section>
      </section>
    </Layout>
  );
};

export default Practice;
