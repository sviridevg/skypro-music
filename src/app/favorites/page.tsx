"use client";

import styles from "./page.module.css";
import { Nav } from "@/components/nav/nav";
import { Search } from "@/components/search/search";
import { Player } from "@/components/player/player";
import { Filter } from "@/components/filter/filter";
import { ContentPage } from "@/components/content/contentpage";
import { Sidebar } from "@/components/sidebar/sidebar";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchFavoritesTracks,
  setTracksList,
} from "@/store/features/playListSlice";

export default function Favorites() {
  const classNames = require("classnames");
  const { currentTrack } = useAppSelector((state) => state.playList);
  const { favoritesList } = useAppSelector((state) => state.playList);
  const { error } = useAppSelector((state) => state.playList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTracksList(favoritesList));
    if (favoritesList.length === 0) {
      dispatch(fetchFavoritesTracks());
      dispatch(setTracksList(favoritesList));
    }
  }, [dispatch, favoritesList]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div
            className={classNames(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            <h2 className={styles.centerblockH2}>Мои треки</h2>
            <Filter />
            <ContentPage error={error} />
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
