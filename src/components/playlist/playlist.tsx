"use client";

import styles from "@/components/playlist/playlist.module.css";
import { Track } from "../track/track";
import { useAppSelector } from "@/store/store";
import { useParams } from "react-router-dom";

type PlaylistProps = {
  audioRef: HTMLAudioElement | null;
};

export const Playlist = ({ audioRef }: PlaylistProps) => {
  const { tracksList } = useAppSelector((state) => state.playList);
  const { status } = useAppSelector((state) => state.playList);

  return (
    <div className={styles.contentPlaylist}>
      {status === "pending" && <p>Загружаем музыку для Вас ... </p> }
      {tracksList.map((track) => (
        <Track
          key={track._id}
          track={track}
          audioRef={audioRef}
          userLikes={track.staredUser}
        />
      ))}
    </div>
  );
};
