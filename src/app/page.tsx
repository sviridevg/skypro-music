"use client";

import styles from "./page.module.css";
import { Nav } from "@/components/nav/nav";
import { Search } from "@/components/search/search";
import { Filter } from "@/components/filter/filter";
import { ContentPage } from "@/components/content/contentpage";
import { Sidebar } from "@/components/sidebar/sidebar";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchFavoritesTracks,
  fetchTracks,
} from "@/store/features/playListSlice";
import { Player } from "@/components/player/player";
import { updateTokenUser } from "@/store/features/authSlice";
import classNames from "classnames";

export default function Home() {
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

  useEffect(() => {
    dispatch(fetchTracks());
    dispatch(fetchFavoritesTracks());
  }, [dispatch]);

  const [err, setError] = useState<string | null>(null);
  const { currentTrack } = useAppSelector((state) => state.playList);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div
            className={classNames(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filter />
            <ContentPage error={err} />
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
