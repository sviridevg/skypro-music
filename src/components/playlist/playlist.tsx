"use client";

import styles from "@/components/playlist/playlist.module.css";
import { Track } from "../track/track";
import { useAppSelector } from "@/store/store";

type PlaylistProps = {
  audioRef: HTMLAudioElement | null;
};

export const Playlist = (
  { audioRef }: PlaylistProps
) => {
  const { tracksList } = useAppSelector((state) => state.playList);

  return (
    <div className={styles.contentPlaylist}>
      {tracksList.map((track) => (
        <Track key={track._id} track={track}
         audioRef={audioRef} 
         userLikes={track.staredUser} />
      ))}
    </div>
  );
};
