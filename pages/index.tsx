import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout/layout";
import Button from "../components/button/button";

const Home = () => {
  return (
    <Layout>
      <section className={`${utilStyles.container} ${utilStyles.centered} ${utilStyles.red}`}>
        <div className={`${utilStyles.heading2Xl} ${utilStyles.centered}`}>
          <h1>Learning Latin</h1>
        </div>
        <p className={`${utilStyles.centered} ${utilStyles.sevenWidth}`}>
          This project was started to help me study declensions endings for a
          Latin test. I plan to add many more features to this website, such as
          sentence translation practice, and word form identification practice.
          This is a side project, and my first time using React to build a
          website. Development will be slow. If you find any bugs please open an
          issue in the github repository.
        </p>
        <Button
          href="https://github.com/cqb13"
          target="_blank"
          class={utilStyles.margin}
        >
          View Github
        </Button>
      </section>
    </Layout>
  );
};

export default Home;
