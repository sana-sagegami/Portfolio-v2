"use client";

import { JSX } from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Navbar.module.scss";

export default function Navbar(): JSX.Element {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigate = (page: string) => {
    router.push(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navLinks}>
          <button
            onClick={() => handleNavigate("/")}
            className={`${styles.navLink} ${
              pathname === "/" ? styles.active : ""
            }`}
          >
            Home
          </button>
          <span className={styles.navSeparator}>/</span>
          <button
            onClick={() => handleNavigate("/products")}
            className={`${styles.navLink} ${
              pathname?.startsWith("/products") ? styles.active : ""
            }`}
          >
            Products
          </button>
        </div>
      </div>
    </nav>
  );
}
