import useScroll from "../../lib/hooks/useScroll";
import { useRouter } from "next/router";
import styles from "./nav.module.css";
import Button from "../button/button";
import Image from "next/image";
import Link from "next/link";

const NavBar = ({ title, back }: { title?: string, back?: boolean }) => {
  const routes = [
    ["Home", "/"],
    ["Practice", "/practice"],
    ["Translate", "/translate"],
    ["Resources", "/resources"]
  ];

  const router = useRouter();

  return (
    <nav
      className={`${styles.nav} ${useScroll("scrollOffSet", 10)
        ? styles.scrolled
        : ""}`}
    >
      <div className={styles.linkContainer}>
        {routes.map(([name, path]) =>
          <Link
            href={path}
            className={`${router.pathname === path
              ? styles.active
              : ""} ${styles.link}`}
          >
            {name}
          </Link>
        )}
      </div>
      <div className={styles.pageTitleContainer}>
        {back && (
          <Button onClick={() => router.back()}>
            <Image
              src="/arrowLeft.svg"
              alt="arrow left"
              width={20}
              height={20}
            />
          </Button>
        )}
        <h2 className={styles.pageTitle}>{title}</h2>
      </div>
    </nav>
  );
};

export default NavBar;
