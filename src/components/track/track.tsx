"use client";

import styles from "@/components/track/track.module.css";
import { useLikeTrack } from "@/hooks/useLikeTrack";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playListSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TrackTypes } from "@/types/tracks";

type TrackProps = {
  track: TrackTypes;
  audioRef: HTMLAudioElement | null;
  userLikes: number[];
};

export const Track = ({ track, audioRef, userLikes }: TrackProps) => {
  const classNames = require("classnames");
  const dispatch = useAppDispatch();

  const { isLiked } = useLikeTrack(track._id);

  // ручной запуск песен
  const onClickCurentTrack = () => {
    if (audioRef) {
      dispatch(setCurrentTrack(track));
      dispatch(setIsPlaying(true));
      audioRef.addEventListener("loadstart", function () {
        if (audioRef.paused) {
          audioRef.play();
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

  // Отметка мигающей точкой играющего или паузы трека
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
    <div key={track._id} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div onClick={() => onClickCurentTrack()} className={styles.trackTitle}>
          <div
          
          className={styles.trackTitleImage}>
            <div className={classNames(playingDot, pausingDot)}></div>

            {audioRef &&
              audioRef.played &&
              audioRef.src !== track.track_file && (
                <svg className={styles.trackTitleSvg}>
                  <use xlinkHref="/icon/sprite.svg#icon-note" />
                </svg>
              )}
          </div>
          <div
            
            className={styles.trackTitleText}>
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
          <div className={styles.userLike}>{userLikes.length}</div>
          <svg
            className={classNames(styles.trackTimeSvg, {
              [styles.activeg]: isLiked,
            })}>
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
