"use client";

import styles from "./page.module.css";
import { Nav } from "@/components/nav/nav";
import { Search } from "@/components/search/search";
import { Player } from "@/components/player/player";
import { Filter } from "@/components/filter/filter";
import { ContentPage } from "@/components/content/contentpage";
import { Sidebar } from "@/components/sidebar/sidebar";
import { getTracks } from "@/api/tracks";
import { TrackTypes } from "@/types/tracks";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCurrentTrackDuration,
  setIsPlaying,
  setProgress,
  setTracksList,
} from "@/store/features/playListSlice";

export default function Home() {
  const classNames = require("classnames");
  const [err, setError] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const { curentTrack } = useAppSelector((state) => state.playList);
  const { isPlaying } = useAppSelector((state) => state.playList);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.current?.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current?.play();
        dispatch(setIsPlaying(true));
      }
    }
  };

  const onloadData = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const duration = e.currentTarget.duration;
    dispatch(setCurrentTrackDuration(duration));
  };

  const onChangeProgress = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    dispatch(
      setProgress({
        currentTime: e.currentTarget.currentTime,
        duration: e.currentTarget.duration,
      })
    );
  };

  // получение списка песен
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracks: TrackTypes[] = await getTracks();
        dispatch(setTracksList(tracks));
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, [dispatch]);

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
            <audio
              className={styles.audio}
              onTimeUpdate={onChangeProgress}
              ref={audioRef}
              controls
              src={curentTrack?.track_file}
              onLoadedData={onloadData}
            />
            <ContentPage error={err} audioRef={audioRef.current} />
          </div>
          <Sidebar />
        </main>
        {curentTrack && (
          <Player audioRef={audioRef.current} togglePlay={togglePlay} />
        )}
        <footer className="footer" />
      </div>
    </div>
  );
}
