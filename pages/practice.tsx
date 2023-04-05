import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout/layout";
import Button from "../components/button/button";
import styles from "../styles/practice.module.css";

const Practice = () => {
  const practiceRoutes = [
    ["Declension Endings", "/practice/declension-endings"],
    ["Future Tense", "/practice/future-tense"],
    ["Imperfect Tense", "/practice/imperfect-tense"],
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
        <section className={styles.practiceNav}>
          {practiceRoutes.map(route =>
            <Button
              link={`/practice/${route[0].toLowerCase().replace(" ", "-")}`}
              class={`${utilStyles.twoWidth} ${styles.practiceLink}`}
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
