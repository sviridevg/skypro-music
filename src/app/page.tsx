"use client";

import styles from "./page.module.css";
import { Nav } from "@/components/nav/nav";
import { Search } from "@/components/search/search";
import { Filter } from "@/components/filter/filter";
import { ContentPage } from "@/components/content/contentpage";
import { Sidebar } from "@/components/sidebar/sidebar";
import { favorites, getTracks } from "@/api/tracks";
import { TrackTypes } from "@/types/tracks";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchFavoritesTracks, fetchTracks, setFavoritesList } from "@/store/features/playListSlice";
import { Player } from "@/components/player/player";

export default function Home() {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(fetchTracks());
    dispatch(fetchFavoritesTracks());
  }, [dispatch]);

  const classNames = require("classnames");
  const [err, setError] = useState<string | null>(null);
  const { curentTrack } = useAppSelector((state) => state.playList);

  const audioRef = useRef<HTMLAudioElement>(null);

  const [progress, setProgress] = useState<{
    currentTime: number;
    duration: number;
  }>({
    currentTime: 0,
    duration: 0,
  });

  // Определение прогресса песни
  const onChangeProgress = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    setProgress({
      currentTime: e.currentTarget.currentTime,
      duration: e.currentTarget.duration,
    });
  };

  return (
    <div className={styles.wrapper}>
      <audio
        className={styles.audio}
        onTimeUpdate={onChangeProgress}
        ref={audioRef}
        controls
        src={curentTrack?.track_file}
      />
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div
            className={classNames(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filter />
            <ContentPage error={err} audioRef={audioRef.current} />
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
