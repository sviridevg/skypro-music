"use client";

import styles from "@/components/track/track.module.css";
import { TrackTypes } from "@/types/tracks";
import { Dispatch, SetStateAction } from "react";

type TrackProps = {
  track: TrackTypes;
  setCurentTrack: (track: TrackTypes) => void;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
  audioRef: HTMLAudioElement | null;
};

export const Track = ({
  track,
  setCurentTrack,
  setIsPlaying,
  audioRef,
}: TrackProps) => {
  const classNames = require("classnames");

  const onClickCurentTrack = async () => {
    if (audioRef) {
      await setCurentTrack(track);
      audioRef.play();
      setIsPlaying(true);
    }
  };

  // Форматирование времени треков
  let minutes: string = Math.floor(track.duration_in_seconds / 60)
    .toString()
    .padStart(2, "0");

  let seconds: string = (track.duration_in_seconds % 60)
    .toString()
    .padStart(2, "0");

  return (
    <div
      onClick={onClickCurentTrack}
      key={track._id}
      className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink}>
              {track.name} <span className={styles.trackTitleSpan} />
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink}>{track.author}</a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink}>{track.album}</a>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
            <use xlinkHref="/icon/sprite.svg#icon-like" />
          </svg>
          <span className={styles.trackTimeText}>
            {minutes}:{seconds}
          </span>
        </div>
      </div>
    </div>
  );
};
