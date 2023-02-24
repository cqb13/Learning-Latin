import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout/layout";
import Button from "../components/button/button";

const Practice = () => {
  const practiceRoutes = [
    ["Declension Endings", "/practice/declension-endings"],
    ["Future Tense", "/practice/future-tense"],
    ["Personal Endings", "/practice/personal-endings"],
    ["Personal Pronouns", "/practice/personal-pronouns"],
    ["Relative Pronouns", "/practice/relative-pronouns"]
  ];

  return (
    <Layout title="Practice">
      <section className={utilStyles.container}>
        <div className={utilStyles.heading2Xl}>
          <h1>Practice</h1>
        </div>
        {practiceRoutes.map(route =>
          <Button
            link={`/practice/${route[0].toLowerCase().replace(" ", "-")}`}
          >
            {route[0]}
          </Button>
        )}
      </section>
    </Layout>
  );
};

export default Practice;
