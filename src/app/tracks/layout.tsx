"use client";

import styles from "./page.module.css";
import { Nav } from "@/components/nav/nav";
import { Search } from "@/components/search/search";
import { Filter } from "@/components/filter/filter";
import { ContentPage } from "@/components/content/contentpage";
import { Sidebar } from "@/components/sidebar/sidebar";
import { Player } from "@/components/player/player";
import classNames from "classnames";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { updateTokenUser } from "@/store/features/authSlice";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { currentTrack } = useAppSelector((state) => state.playList);
  const dispatch = useAppDispatch();
  const tokenUpdate = async () => {
    const reftoken = localStorage.getItem("refresh") ?? "";
    await dispatch(updateTokenUser(reftoken));
  };

  useEffect(() => {
    const accToken = localStorage.getItem("access");
    if (!accToken) {
      tokenUpdate();
    }
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div
            className={classNames(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            {children}
            <Filter />
            <ContentPage />
          </div>
          <Sidebar />
        </main>
        <div
          className={classNames(styles.playerWrapper, {
            [styles.hidden]: !currentTrack,
          })}>
          <Player />
        </div>
        <footer className="footer" />
      </div>
    </div>
  );
}
