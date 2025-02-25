"use client";

import fetchLatestCommits from "@/utils/fetchLatestCommits";
import FeatureCard from "@/components/home/featureCard";
import CommitCard from "@/components/home/commitCard";
import Button from "@/components/shared/button";
import FaqCard from "@/components/home/faqCard";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const [commits, setCommits] = useState([]);

  useEffect(() => {
    fetchLatestCommits().then(setCommits).catch(console.error);
  }, []);

  return (
    <section className="text-center mx-auto overflow-hidden">
      <div className="relative h-[90vh] bg-cover bg-center text-white flex flex-col justify-center items-center bg-hero-gradient">
        <h1 className="text-6xl text-zinc-800 font-bold m-0 [text-shadow:0_2px_2px_rgba(0,0,0,0.2)]">
          Learning Latin
        </h1>
        <sub className="font-semibold text-3xl text-zinc-700 [text-shadow:0_2px_2px_rgba(0,0,0,0.2)] mt-2">
          A comprehensive platform for both novice and seasoned Latin
          enthusiasts.
        </sub>
        <Button
          class="mt-6 w-fit bg-primary-500 bg-opacity-80 hover:bg-primary-700"
          link="/practice"
        >
          Begin Your Journey
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
      </div>
      <div className="py-16" id="about">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          Feature Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 px-5">
          <FeatureCard
            title="Interactive Charts"
            description="Master Latin grammar with dynamic charts and exercises."
            icon="/chart.svg"
          />
          <FeatureCard
            title="Latin Translator"
            description="Translate between Latin and English with grammar insights."
            icon="/translate.svg"
            link="https://github.com/cqb13/vocab-vault/tree/new-api"
          />
          <FeatureCard
            title="Games"
            description="Learn new words through games."
            icon="/games.svg"
          />
        </div>
      </div>
      <div className="bg-gray-100 py-12 px-5">
        <h2 className="text-3xl font-bold text-center mb-8">
          Open Source Community
        </h2>
        <p className="text-lg text-center max-w-2xl mx-auto mb-6">
          Contribute to a growing library of resources and tools, making Latin
          accessible to everyone.
        </p>
        <div className="flex items-center justify-center">
          <Button
            class="mt-6 w-fit bg-primary-500 bg-opacity-80 hover:bg-primary-700"
            href="https://github.com/cqb13/Learning-Latin"
            target="_blank"
          >
            Join Us on GitHub
          </Button>
        </div>
      </div>
      <div className="py-16 bg-white px-5" id="latest-updates">
        <h2 className="text-4xl font-bold text-center mb-8">Latest Updates</h2>
        <div className="flex flex-col items-center gap-2">
          {commits.map((commit: any) => (
            <CommitCard key={commit.sha} commit={commit} />
          ))}
        </div>
      </div>
      <div className="py-12 bg-gray-100 px-5" id="roadmap">
        <h2 className="text-3xl font-bold text-center mb-8">
          Upcoming Features & Roadmap
        </h2>
        <div className="max-w-4xl mx-auto text-center">
          <p className="mb-6">
            Get a glimpse of what we're working on and what's coming next to
            enhance your Latin learning experience.
          </p>
          <p className="text-lg font-semibold">
            - More practice charts - Some Time 2025
          </p>
        </div>
      </div>
      <div className="py-16 bg-white px-5" id="faqs">
        <h2 className="text-4xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="max-w-4xl mx-auto flex flex-col gap-2">
          <FaqCard
            question="Do I need any prior knowledge of Latin to start?"
            answer="No, our resources are designed to accommodate beginners with no prior knowledge of Latin, guiding you through from the basics to advanced topics."
          />
          <FaqCard
            question="Are there any costs involved?"
            answer="No, all our resources are completely free."
          />
        </div>
      </div>
    </section>
  );
}
