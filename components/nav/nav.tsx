import Link from "next/link";
import { useRouter } from "next/router";
import useScroll from "../../lib/hooks/useScroll";
import styles from "./nav.module.css";

const NavBar = ({title}: {title?: string}) => {
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
      <div className={styles.pageTitleContainer}>
        <h2 className={styles.pageTitle}>{title}</h2>
      </div>
    </nav>
  );
};

export default NavBar;
