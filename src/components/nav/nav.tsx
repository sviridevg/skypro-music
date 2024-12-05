"use client";

import Image from "next/image";
import styles from "@/components/nav/nav.module.css";
import { useState } from "react";

import { useRouter } from "next/navigation";

export const Nav = () => {
  const router = useRouter();

  const authState =
    typeof window !== "undefined" &&
    localStorage.getItem("authState") === "true"
      ? true
      : false;

  const [isOpen, setIsOpen] = useState(false);
  const toggleModalUser = () => {
    setIsOpen(!isOpen);
  };

  // Переход на страницу авторизации
  const handleLoginClick = () => {
    router.push("/signin");
  };

  // Переход на страницу избранного
  const handleFavoritesClick = () => {
    router.push("/favorites");
  };

  //Переход на главную страницу
  const handleMainPageClick = () => {
    router.push("/");
  };

  return (
    <nav className={styles.mainNav}>
      <div className={styles.navLogo}>
        <Image
          onClick={handleMainPageClick}
          className={styles.logoImage}
          src="/img/logo.png"
          alt="Logo"
          width={113}
          height={17}
        />
      </div>
      <div role="button" onClick={toggleModalUser} className={styles.navBurger}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpen && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li onClick={handleMainPageClick} className={styles.menuItem}>
              <div className={styles.menuLink} onClick={handleMainPageClick}>
                Главное
              </div>
            </li>

            {authState === true && (
              <li className={styles.menuItem}>
                <div onClick={handleFavoritesClick} className={styles.menuLink}>
                  Мой плейлист
                </div>
              </li>
            )}

            <li role="button" className={styles.menuItem}>
              {authState === false && (
                <div onClick={handleLoginClick} className={styles.menuLink}>
                  Войти
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
