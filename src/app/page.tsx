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

export default function Home() {
  const classNames = require("classnames");
  const [tracksList, setTracksList] = useState<TrackTypes[]>([]);
  const [curentTrack, setCurentTrack] = useState<TrackTypes | null>(null);
  const [err, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({
    currentTime: 0,
    duration: 0,
  });

  // запуск и остановка трека
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    }
  };

  // изменение статуса при конце песни
  audioRef.current?.addEventListener("ended", () => {
    setIsPlaying(false);
  });

  const [currentTrackDuration, setCurrentTrackDuration] = useState<
    number | undefined
  >(undefined);

  const onloadData = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    const duration = e.currentTarget.duration;
    setCurrentTrackDuration(duration);
  };

  const onChangeProgress = (e: SyntheticEvent<HTMLAudioElement, Event>) => {
    setProgress({
      currentTime: e.currentTarget.currentTime,
      duration: e.currentTarget.duration,
    });
  };

  // получение списка песен
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracks: TrackTypes[] = await getTracks();
        setTracksList(tracks);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <main className={styles.main}>
          <Nav />
          <div
            className={classNames(styles.mainCenterblock, styles.centerblock)}>
            <Search />
            <h2 className={styles.centerblockH2}>Треки</h2>
            <Filter tracks={tracksList} />
            <audio
              className={styles.audio}
              onTimeUpdate={onChangeProgress}
              ref={audioRef}
              controls
              src={curentTrack?.track_file}
              onLoadedData={onloadData}
            />
            <ContentPage
              error={err}
              setCurentTrack={setCurentTrack}
              tracks={tracksList}
              setIsPlaying={setIsPlaying}
              audioRef={audioRef.current}
            />
          </div>
          <Sidebar />
        </main>

        {curentTrack && (
          <Player
            isPlaying={isPlaying}
            audioRef={audioRef.current}
            togglePlay={togglePlay}
            curentTrack={curentTrack}
            progress={progress}
            currentTrackDuration={currentTrackDuration}
          />
        )}
        <footer className="footer" />
      </div>
    </div>
  );
}
