import utilStyles from "../styles/utils.module.css";
import Layout from "../components/layout/layout";
import Button from "../components/button/button";
import styles from "../styles/index.module.css";
import Image from "next/image";

const Home = () => {
  return (
    <Layout>
      <section className={`${utilStyles.container} ${utilStyles.centered}`}>
        <section className={`${utilStyles.centered} ${styles.hero}`}>
          <div className={`${utilStyles.heading2Xl} ${styles.shadow}`}>
            <h1>Learning Latin</h1>
          </div>
          <sub
            className={`${utilStyles.noMargin} ${utilStyles.sub} ${styles.shadow}`}
          >
            A modern tool with many resources for learning Latin.
          </sub>
          <Button locked={false} class={styles.callToActionButton}>
            Start Learning Now!
          </Button>
          <a
            href="#about"
            className={`${styles.learnMoreButton} ${utilStyles.bounce}`}
          >
            Learn More
            <div className={styles.learnMoreArrow}>
              <Image
                src="/arrowLeft.svg"
                alt="arrow left"
                width={40}
                height={40}
              />
            </div>
          </a>
        </section>
        <br />
        <section className={styles.sectionContainer} id="about">
          <h2>Welcome!</h2>
          <div className={styles.featureContainer}>
            <p>
              Welcome to Learning Latin! Our goal is to provide a modern tool to
              help you learn Latin. We have a wide variety of resources
              available, including interactive exercises, charts, and more.
              Whether you're a beginner or an expert, we hope that you'll find
              something useful here. Our mission is to make Latin accessible to
              anyone who is interested in learning this ancient and beautiful
              language
            </p>
          </div>
          <br />
        </section>
        <section className={styles.sectionContainer} id="data">
          <h2>Features &amp; Benefits</h2>
          <div className={styles.featureContainer}>
            <h3>Interactive Exercises</h3>
            <p>
              Learning Latin includes a wide variety of interactive exercises
              that will help you practice and reinforce what you've learned.
              From fill-in-the-blank exercises to translation challenges, and
              even games, our exercises are designed to be engaging and
              effective.
            </p>
          </div>
          <div className={styles.featureContainer}>
            <h3>Open Source!</h3>
            <p>
              learning Latin is open source, which means that the code is freely
              available for anyone to modify. This has many benefits for our
              users, as it allows them to contribute to the project by adding
              new features, fixing bugs, and improving the overall user
              experience. For example, users can add charts and grammatical data
              to the site, which can enhance the learning experience for
              everyone. By making our website open source, we're able to create
              a collaborative community that is dedicated to making Latin more
              accessible and enjoyable for learners of all levels.
            </p>
          </div>
        </section>
      </section>
    </Layout>
  );
};

export default Home;
