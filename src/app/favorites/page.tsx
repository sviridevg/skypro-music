"use client";

import styles from "./page.module.css";
import { Nav } from "@/components/nav/nav";
import { Search } from "@/components/search/search";
import { Player } from "@/components/player/player";
import { Filter } from "@/components/filter/filter";
import { ContentPage } from "@/components/content/contentpage";
import { Sidebar } from "@/components/sidebar/sidebar";
import {
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchFavoritesTracks,
  setTracksList,
} from "@/store/features/playListSlice";

export default function Favorites() {
  const classNames = require("classnames");

  const { curentTrack } = useAppSelector((state) => state.playList);
  const { favoritesList } = useAppSelector((state) => state.playList);
  const { error } = useAppSelector((state) => state.playList);
  const audioRef = useRef<HTMLAudioElement>(null);
  const dispatch = useAppDispatch();

  const [progress, setProgress] = useState<{
    currentTime: number;
    duration: number;
  }>({
    currentTime: 0,
    duration: 0,
  });

  // Определение прогресса песни
  const onChangeProgress = useCallback(
    (e: SyntheticEvent<HTMLAudioElement, Event>) => {
      setProgress({
        currentTime: e.currentTarget.currentTime,
        duration: e.currentTarget.duration,
      });
    },
    []
  );

  useEffect(() => {
    dispatch(setTracksList(favoritesList));
    if (favoritesList.length === 0) {
      dispatch(fetchFavoritesTracks());
      dispatch(setTracksList(favoritesList));
    }
  }, [dispatch, favoritesList]);

  const audioSrc = useMemo(() => curentTrack?.track_file, [curentTrack]);

  return (
    <div className={styles.wrapper}>
      <audio
        className={styles.audio}
        onTimeUpdate={onChangeProgress}
        ref={audioRef}
        controls
        src={audioSrc}
      />
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div
            className={classNames(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            <h2 className={styles.centerblockH2}>Мои треки</h2>
            <Filter />
            <ContentPage error={error} audioRef={audioRef.current} />
          </div>
          <Sidebar />
        </main>
        {curentTrack && (
          <Player progress={progress} audioRef={audioRef.current} />
        )}
        <footer className="footer" />
      </div>
    </div>
  );
}
