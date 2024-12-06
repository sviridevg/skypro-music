"use client";

import styles from "@/components/playlist/playlist.module.css";
import { Track } from "../track/track";
import { useAppSelector } from "@/store/store";


export const Playlist = () => {
  const { tracksList } = useAppSelector((state) => state.playList);

  return (
    <div className={styles.contentPlaylist}>
      {tracksList.map((track) => (
        <Track key={track._id} track={track} />
      ))}
    </div>
  );
};
