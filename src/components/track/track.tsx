"use client";

import styles from "@/components/track/track.module.css";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playListSlice";
import { useAppDispatch } from "@/store/store";
import { TrackTypes } from "@/types/tracks";

type TrackProps = {
  track: TrackTypes;
  audioRef: HTMLAudioElement | null;
};

export const Track = ({ track, audioRef }: TrackProps) => {
  const classNames = require("classnames");

  const dispatch = useAppDispatch();

  const onClickCurentTrack = async (track: TrackTypes) => {
    if (audioRef) {
      await dispatch(setCurrentTrack(track));
      await dispatch(setIsPlaying(true));
      audioRef.addEventListener("loadstart", function () {
        if (audioRef.paused) {
          audioRef.play()
        }
      });
    }
  };

  // Форматирование времени треков
  let minutes: string = Math.floor(track.duration_in_seconds / 60)
    .toString()
    .padStart(2, "0");

  let seconds: string = (track.duration_in_seconds % 60)
    .toString()
    .padStart(2, "0");

  let playingDot;
  let pausingDot;

  if (audioRef && audioRef.played && audioRef.src === track.track_file) {
    playingDot = styles.playingDot;
    pausingDot = !pausingDot;
  }

  if (audioRef && audioRef.paused && audioRef.src === track.track_file) {
    pausingDot = styles.pausingDot;
    playingDot = !playingDot;
  }

  return (
    <div
      onClick={async () => {
        await onClickCurentTrack(track);
      }}
      key={track._id}
      className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <div className={classNames(playingDot, pausingDot)}></div>
            {audioRef &&
              audioRef.played &&
              audioRef.src !== track.track_file && (
                <svg className={styles.trackTitleSvg}>
                  <use xlinkHref="/icon/sprite.svg#icon-note" />
                </svg>
              )}
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
