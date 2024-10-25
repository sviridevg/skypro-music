"use client";

import Image from "next/image";
import styles from "@/components/nav/nav.module.css";
import { useState } from "react";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/store/store";

export const Nav = () => {
  const router = useRouter();

  const authState =
    typeof window !== "undefined" &&
    localStorage.getItem("authState") === "true"
      ? true
      : false;

  const [isOpen, setIsOpen] = useState(false);
  const toggleModalUser = () => {
    setIsOpen(true);
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
      <div onClick={toggleModalUser} className={styles.navBurger}>
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
        <span className={styles.burgerLine} />
      </div>
      {isOpen && (
        <div className={styles.navMenu}>
          <ul className={styles.menuList}>
            <li onClick={handleMainPageClick} className={styles.menuItem}>
              <a className={styles.menuLink}>Главное</a>
            </li>

            {authState === true && (
              <li className={styles.menuItem}>
                <a onClick={handleFavoritesClick} className={styles.menuLink}>
                  Мой плейлист
                </a>
              </li>
            )}

            <li className={styles.menuItem}>
              {authState === false && (
                <a onClick={handleLoginClick} className={styles.menuLink}>
                  Войти
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};
