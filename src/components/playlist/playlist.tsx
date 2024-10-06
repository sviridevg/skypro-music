"use client";

import styles from "@/components/playlist/playlist.module.css";
import { Track } from "../track/track";
import { TrackTypes } from "@/types/tracks";
import { Dispatch, SetStateAction } from "react";

type PlaylistProps = {
  tracks: TrackTypes[];
  setCurentTrack: (track: TrackTypes) => void;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: HTMLAudioElement | null;
};

export const Playlist = ({
  tracks,
  setCurentTrack,
  setIsPlaying,
  audioRef,
}: PlaylistProps) => {
  return (
    <div className={styles.contentPlaylist}>
      {tracks.map((track) => (
        <Track
          setIsPlaying={setIsPlaying}
          setCurentTrack={setCurentTrack}
          key={track._id}
          track={track}
          audioRef={audioRef}
        />
      ))}
    </div>
  );
};
