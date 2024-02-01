import Layout from "@components/shared/layout";
import Button from "@components/shared/button";
import Image from "next/image";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <section className='text-center mx-auto overflow-hidden'>
        <div className='relative h-[90vh] bg-cover bg-center text-white flex flex-col justify-center items-center bg-hero-gradient'>
          <h1 className='text-6xl text-zinc-800 font-bold m-0 [text-shadow:0_2px_2px_rgba(0,0,0,0.2)]'>
            Master Latin with Modern Tools
          </h1>
          <sub className='font-semibold text-3xl text-zinc-700 [text-shadow:0_2px_2px_rgba(0,0,0,0.2)] mt-2'>
            A comprehensive platform for both novice and seasoned Latin
            enthusiasts.
          </sub>
          <Button
            class='mt-6 w-fit bg-primary-500 bg-opacity-80 hover:bg-primary-700'
            link='/textbook'
          >
            Begin Your Journey
          </Button>
          <a
            href='#about'
            className='flex flex-col items-center justify-center text-md text-white animate-bounce mt-5 hover:[text-shadow:0_1px_1px_rgba(0,0,0,0.2)]'
          >
            Learn More
            <div className='-rotate-90'>
              <Image
                src='/arrowLeft.svg'
                alt='arrow left'
                width={25}
                height={25}
              />
            </div>
          </a>
        </div>
        <div className='py-16' id='about'>
          <h2 className='text-4xl font-bold text-gray-800 mb-8'>
            Feature Highlights
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-10 px-5'>
            <FeatureCard
              title='Interactive Charts'
              description='Master Latin grammar with dynamic charts and exercises.'
              icon='/chart.svg'
            />
            <FeatureCard
              title='Latin Translator'
              description='Translate between Latin and English with grammar insights.'
              icon='/translate.svg'
              link='https://github.com/cqb13/vocab-vault/tree/api'
            />
            <FeatureCard
              title='Custom Textbook'
              description='Learn systematically with our curated Latin textbook.'
              icon='/book.svg'
            />
          </div>
        </div>
        <div className='bg-gray-100 py-12'>
          <h2 className='text-3xl font-bold text-center mb-8'>
            Open Source Community
          </h2>
          <p className='text-lg text-center max-w-2xl mx-auto mb-6'>
            Contribute to a growing library of resources and tools, making Latin
            accessible to everyone.
          </p>
          <div className='flex items-center justify-center'>
            <Button
              class='mt-6 w-fit bg-primary-500 bg-opacity-80 hover:bg-primary-700'
              href='https://github.com/cqb13/Learning-Latin'
            >
              Join Us on GitHub
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const FeatureCard = ({ title, description, icon, link, action }: any) => (
  <div
    className='rounded-lg shadow-lg p-6 bg-white hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer'
    onClick={action}
  >
    <div className='flex items-center justify-center'>
      <Image src={icon} alt={title} width={100} height={100} />
    </div>
    <h3 className='text-2xl font-bold mt-5'>{title}</h3>
    <p className='mt-2 text-gray-600'>{description}</p>
    {link && (
      <a
        className='text-blue-500 hover:underline mt-2 inline-block'
        href={link}
      >
        Learn More
      </a>
    )}
  </div>
);

export default Home;
