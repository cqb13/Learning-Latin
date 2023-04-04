import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout/layout";
import Button from "../components/button/button";
import styles from "../styles/learn.module.css";

const Practice = () => {
  const practiceRoutes = [
    ["Declension Endings", "/learn/declension-endings"],
    ["Future Tense", "/learn/future-tense"],
    ["Personal Endings", "/learn/personal-endings"],
    ["Personal Pronouns", "/learn/personal-pronouns"],
    ["Relative Pronouns", "/learn/relative-pronouns"]
  ];

  return (
    <Layout title="Learn">
      <section className={utilStyles.container}>
        <div className={utilStyles.heading2Xl}>
          <h1>Learn</h1>
        </div>
        <section className={styles.practiceNav}>
          {practiceRoutes.map(route =>
            <Button
              link={`/learn/${route[0].toLowerCase().replace(" ", "-")}`}
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
