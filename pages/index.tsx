import Layout from "@components/layout";
import Button from "@components/button";
import { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <Layout>
      <section className="flex flex-col items-center text-center mx-auto">
        <section className="flex flex-col items-center pt-40 pb-4 h-[calc(100vh_-_2rem)] bg-gradient-radiant bg-hero-gradient w-screen">
          <h1 className="text-5xl text-zinc-800 font-bold m-0 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]">
            Learning Latin
          </h1>
          <sub className="font-semibold text-2xl text-zinc-700 [text-shadow:0_1px_1px_rgba(0,0,0,0.2)]">
            A modern tool with many resources for learning Latin.
          </sub>
          <Button class=" mt-4 w-fit">
            Start Learning Now!
          </Button>
          <a
            href="#about"
            className="flex flex-col items-center justify-center text-md text-white animate-bounce mt-5 hover:[text-shadow:0_1px_1px_rgba(0,0,0,0.2)]"
          >
            Learn More
            <div className="-rotate-90">
              <Image
                src="/arrowLeft.svg"
                alt="arrow left"
                width={25}
                height={25}
              />
            </div>
          </a>
        </section>
        <br />
        <article className="my-12 text-zinc-900" id="about">
          <h2 className="m-1 text-3xl font-bold">Welcome!</h2>
          <div className="mb-8 mx-auto rounded-xl w-11/12 sm:w-[calc(75vw)] px-8 py-4 shadow-card bg-slate-50">
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
        </article>
        <article className="my-12 text-zinc-900" id="data">
          <h2 className="m-1 text-3xl font-bold">Features &amp; Benefits</h2>
          <div className="mb-8 mx-auto rounded-xl w-11/12 sm:w-[calc(75vw)] px-8 py-4 shadow-card bg-slate-50">
            <h3 className="m-1 text-xl font-bold">Interactive Exercises</h3>
            <p>
              Learning Latin includes a wide variety of interactive exercises
              that will help you practice and reinforce what you've learned.
              From fill-in-the-blank exercises to translation challenges, and
              even games, our exercises are designed to be engaging and
              effective.
            </p>
          </div>
          <div className="mb-8 mx-auto rounded-xl w-11/12 sm:w-[calc(75vw)] px-8 py-4 shadow-card bg-slate-50">
            <h3 className="m-1 text-xl font-bold">Open Source!</h3>
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
        </article>
      </section>
    </Layout>
  );
};

export default Home;
