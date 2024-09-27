"use client";

import Image from "next/image";
import styles from "@/components/nav/nav.module.css";
import { useState } from "react";

export const Nav = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleModalUser = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          className={styles.logoImage}
          src="/img/logo.png"
          alt="Logo"
          width={113}
          height={17}
        />
      </div>
      <div onClick={toggleModalUser} className={styles.navBurger}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpen && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Главное
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="#" className={styles.menuLink}>
                Мой плейлист
              </a>
            </li>
            <li className={styles.menuItem}>
              <a href="../signin.html" className={styles.menuLink}>
                Войти
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
