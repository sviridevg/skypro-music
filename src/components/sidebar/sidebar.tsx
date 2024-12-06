"use client";

import Image from "next/image";
import styles from "@/components/sidebar/sidebar.module.css";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useRouter } from "next/navigation";
import { setAuthState } from "@/store/features/authSlice";
import { useEffect, useState } from "react";

export const Sidebar = () => {
  const classNames = require("classnames");
  const dispatch = useAppDispatch();
  const { authState } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState<String>("");

  useEffect(() => {
    setUsername(localStorage.getItem("username") ?? "");
  }, []);

  useEffect(() => {
    dispatch(
      setAuthState(localStorage.getItem("authState") === "true" ? true : false)
    );
  }, []);

  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
    dispatch(setAuthState(false));
  };

  // Переход на 100 танцевальных хитов
  const handleDayGenreClick = () => {
    router.push("/tracks/favorites/daygenre");
  };

  // Переход на 100 танцевальных хитов
  const handleDancesClick = () => {
    router.push("/tracks/favorites/dance");
  };

  // Переход на инди
  const handleIndieClick = () => {
    router.push("/tracks/favorites/indie");
  };

  return (
    <div className={classNames(styles.mainSidebar, styles.sidebar)}>
      <div className={styles.sidebarPersonal}>
        <p className={styles.sidebarPersonalName}>
          {authState === true ? username : "Привет - Гость"}
        </p>
        {authState === true && (
          <div onClick={handleLogout} className={styles.sidebarIcon}>
            <svg>
              <use xlinkHref="/icon/sprite.svg#logout" />
            </svg>
          </div>
        )}
      </div>
      <div className={styles.sidebarBlock}>
        <div className={styles.sidebarList}>
          <div onClick={handleDayGenreClick} className={styles.sidebarItem}>
            <a
              className={styles.sidebarLink}
              aria-label="Read more about Seminole tax hike"
              href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist01.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
          <div onClick={handleDancesClick} className={styles.sidebarItem}>
            <a
              className={styles.sidebarLink}
              aria-label="Read more about Seminole tax hike"
              href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist02.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
          <div onClick={handleIndieClick} className={styles.sidebarItem}>
            <a
              className={styles.sidebarLink}
              aria-label="Read more about Seminole tax hike"
              href="#">
              <Image
                className={styles.sidebarImg}
                src="/img/playlist03.png"
                alt="day's playlist"
                width={250}
                height={150}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
