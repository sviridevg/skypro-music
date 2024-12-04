"use client";

import styles from "@/components/track/track.module.css";
import { useLikeTrack } from "@/hooks/useLikeTrack";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playListSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { TrackTypes } from "@/types/tracks";

type TrackProps = {
  track: TrackTypes;
  audioRef: HTMLAudioElement | null;
};

import { useCallback, useEffect, useMemo } from "react";

export const Track = ({ track }: TrackProps) => {
  const classNames = require("classnames");
  const dispatch = useAppDispatch();

  const { isPlaying } = useAppSelector((state) => state.playList);
  const { currentTrack } = useAppSelector((state) => state.playList);
  const { isLiked, toggleLike } = useLikeTrack(track._id);

  // Оптимизация с использованием useCallback
  const onClickCurentTrack = useCallback(() => {
    dispatch(setCurrentTrack(track));
    dispatch(setIsPlaying(true));
  }, [track, dispatch]);

  // Форматирование времени треков
  const { minutes, seconds } = useMemo(() => {
    const minutes = Math.floor(track.duration_in_seconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (track.duration_in_seconds % 60)
      .toString()
      .padStart(2, "0");
    return { minutes, seconds };
  }, [track.duration_in_seconds]);

  // Отметка мигающей точкой играющего или паузы трека
  let playingDot;
  let pausingDot;

  if (isPlaying && currentTrack === track) {
    playingDot = styles.playingDot;
    pausingDot = !pausingDot;
  }

  if (!isPlaying && currentTrack === track) {
    pausingDot = styles.pausingDot;
    playingDot = !playingDot;
  }

  useEffect(() => {
    if (currentTrack?._id === track._id && isPlaying) {
      // При монтировании компонента проверяем, если это тот же трек и он играет
      // Трек должен продолжать воспроизведение
      dispatch(setCurrentTrack(currentTrack));
    }
  }, [track, currentTrack, dispatch, isPlaying]);

  return (
    <div key={track._id} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div onClick={onClickCurentTrack} className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <div className={classNames(playingDot, pausingDot)}></div>
            {isPlaying && currentTrack === track && ""}
            {!isPlaying && currentTrack === track && ""}
            {!isPlaying && currentTrack !== track && (
              <svg className={styles.trackTitleSvg}>
                <use xlinkHref="/icon/sprite.svg#icon-note" />
              </svg>
            )}
            {isPlaying && currentTrack !== track && (
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
          <svg
            onClick={toggleLike}
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
