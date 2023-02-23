import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout/layout";

const Practice = () => {
  return (
    <Layout title="Practice">
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this in{" "}
          <a href='https://nextjs.org/learn'>our Next.js tutorial</a>.)
        </p>
      </section>
    </Layout>
  );
};

export default Practice;
