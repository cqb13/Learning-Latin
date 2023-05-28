import NavBar from "./nav";
import Image from "next/image";
import Head from "next/head";

const Layout = ({
  children,
  backgroundClass,
  title,
  label,
}: {
  children: React.ReactNode;
  backgroundClass?: string;
  title?: string;
  label?: string;
}) => {
  if (!title && !label) {
    title = "Learning Latin";
  } else {
    title = `Latin | ${title ? title : label}`;
  }

  return (
    <div className={`${backgroundClass}`}>
      <Head>
        <title>
          {title}
        </title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="description"
          content="A website with many resources to help you learn Latin."
        />
        <meta name="og:type" content="website" />
        <meta
          name="og:keywords"
          content="cqb13, cqb13 github, learning latin, latin, learning, latin language, latin charts, learn latin, learn latin live, learninglatin, translate latin, whitakers words, latin translation"
        />
        <meta name="og:url" content="https://learninglatin.net/" />
        <meta name="og:site_name" content="Learning Latin" />
        <meta
          name="og:description"
          content="A website with many resources to help you learn Latin."
        />
        <meta name="og:image" content="https://learninglatin.net/favicon.svg" />
        <meta property="og:image" />
        <meta name="og:title" content={title} />
      </Head>
      <div className="flex flex-col min-h-screen">
        <NavBar/>
        <main className="flex-1">
          {children}
        </main>
        <footer className="flex shrink-0 justify-between items-center px-2 my-1">
          <p>Learning Latin | By: cqb13</p>
          <a href="https://github.com/cqb13" target="_blank">
            <Image src="/github.svg" alt="github" width={30} height={30} />
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
