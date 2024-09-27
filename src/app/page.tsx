"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { Nav } from "@/components/nav/nav";
import { Search } from "@/components/search/search";
import { Player } from "@/components/player/player";
import { Filter } from "@/components/filter/filter";
import { Content } from "next/font/google";
import { ContentPage } from "@/components/content/contentpage";
import { Sidebar } from "@/components/sidebar/sidebar";
import { getTracks } from "@/api/tracks";
import { TrackTypes } from "@/types/tracks";
import { useEffect, useState } from "react";

export default function Home() {
  const classNames = require("classnames");
  const [tracksList, setTracksList] = useState<TrackTypes[]>([]);

  let err: string | null = null;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tracks = await getTracks();
        setTracksList(tracks);
      } catch (error) {
        if (error instanceof Error) {
          err = error.message;
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
            <ContentPage tracks={tracksList} />
          </div>
          <Sidebar />
        </main>
        <Player />
        <footer className="footer" />
      </div>
    </div>
  );
}
