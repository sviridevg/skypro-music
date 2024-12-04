"use client";

import styles from "@/app/favorites/page.module.css";
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
  fetchGenre,
  fetchTracks,
  setTracksList,
} from "@/store/features/playListSlice";

export default function Indie() {
  const classNames = require("classnames");

  const { curentTrack } = useAppSelector((state) => state.playList);
  const { tracksList } = useAppSelector((state) => state.playList);
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
    dispatch(fetchTracks()).then(() => dispatch(fetchGenre(4)));
  }, [dispatch]);

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
            <h2 className={styles.centerblockH2}>Инди заряд</h2>
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
