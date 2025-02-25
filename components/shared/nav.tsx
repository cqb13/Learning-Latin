"use client";

import useScroll from "@/lib/hooks/useScroll";
import { useRouter, usePathname } from "next/navigation";
import { routes } from "@/lib/routes";
import Link from "next/link";

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav
      className={`${
        useScroll("scrollOffSet", 10) ? "shadow-bar backdrop-blur-md" : ""
      }
        flex flex-row items-center justify-between px-4 py-2 sticky top-0 z-50
        `}
    >
      <div className="flex gap-4 flex-wrap items-center justify-center">
        {routes.map(([name, path], i) => (
          <Link
            href={path}
            key={i}
            className={`${
              pathname === path
                ? "bg-primary-color text-white"
                : "text-primary-color"
            } text-base hover:bg-primary-color hover:text-white font-bold transition-all px-4 py-2 rounded duration-200 ease-in-out`}
          >
            {name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default NavBar;
