import styles from "./layout.module.css";
import NavBar from "../nav/nav";
import Head from "next/head";

const Layout = ({
  children,
  title,
  label
}: {
  children: React.ReactNode;
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
          content="Learn how to build a personal website using Next.js"
        />
        <meta property="og:image" />
        <meta name="og:title" content={title} />
      </Head>
      <NavBar title={label} />
      <header className={styles.header} />
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
