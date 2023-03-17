import styles from "./layout.module.css";
import NavBar from "../nav/nav";
import Head from "next/head";

const Layout = ({
  children,
  title,
  label,
  back
}: {
  children: React.ReactNode;
  back?: boolean;
  title?: string;
  label?: string;
}) => {
  if (!title && !label) {
    title = "Learning Latin";
  } else {
    title = `Latin | ${title ? title : label}`;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {title}
        </title>
        <link rel="icon" href="/favicon.svg" />
        <meta
          name="description"
          content="A website with many resources to help you learn Latin."
        />
        <meta name="og:type" content="website" />
        <meta
          name="og:keywords"
          content="cqb13, cqb13 github, learning latin, latin, learning, latin language, latin charts, learn latin, learn latin live"
        />
        <meta name="og:url" content="https://learninglatin.net/" />
        <meta name="og:site_name" content="Learning Latin" />
        <meta
          name="og:description"
          content="A website with many resources to help you learn Latin."
        />
        <meta name="og:image" content="https://learninglatin.net/favicon.png" />
        <meta property="og:image" />
        <meta name="og:title" content={title} />
      </Head>
      <NavBar title={label} back={back} />
      <header className={styles.header} />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
