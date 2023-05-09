import useScroll from "../../lib/hooks/useScroll";
import { useRouter } from "next/router";
import styles from "./nav.module.css";
import Link from "next/link";

const NavBar = () => {
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
    </nav>
  );
};

export default NavBar;
