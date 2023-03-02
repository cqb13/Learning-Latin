import styles from "./layout.module.css";
import NavBar from "../nav/nav";
import Head from "next/head";

const Layout = ({ children, title }: { children: React.ReactNode, title?: string }) => {
  if (!title) {
    title = "Learning Latin";
  } else {
    title = `Latin | ${title}`;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <link rel='icon' href='/favicon.ico' />
        <meta
          name='description'
          content='Learn how to build a personal website using Next.js'
        />
        <meta
          property='og:image'
        />
        <meta name='og:title' content={title} />
      </Head>
      <NavBar />
      <header className={styles.header}></header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
