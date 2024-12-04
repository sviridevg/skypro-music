"use client";

import styles from "@/app/favorites/page.module.css";
import { Nav } from "@/components/nav/nav";
import { Search } from "@/components/search/search";
import { Player } from "@/components/player/player";
import { Filter } from "@/components/filter/filter";
import { ContentPage } from "@/components/content/contentpage";
import { Sidebar } from "@/components/sidebar/sidebar";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchGenre } from "@/store/features/playListSlice";

export default function Dance() {
  const classNames = require("classnames");
  const { currentTrack } = useAppSelector((state) => state.playList);
  const { error } = useAppSelector((state) => state.playList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchGenre(3));
  }, [dispatch]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div
            className={classNames(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            <h2 className={styles.centerblockH2}>100 танцевальных хитов</h2>
            <Filter />
            <ContentPage error={error} />
          </div>
          <Sidebar />
        </main>
        <div
          className={classNames(styles.playerWrapper, {
            [styles.hidden]: currentTrack === null,
          })}>
          <Player />
        </div>
        <footer className="footer" />
      </div>
    </div>
  );
}
