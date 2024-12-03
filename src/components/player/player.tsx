"use client";

import styles from "@/components/player/player.module.css";
import { ChangeEvent, useEffect, useRef } from "react";
import ProgressBar from "./progressBar";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setIsLooping,
  setIsPlaying,
  setIsShuffle,
  setNextTrack,
  setPreviousTrack,
  setShuffle,
} from "@/store/features/playListSlice";
import { useLikeTrack } from "@/hooks/useLikeTrack";
import { useCallback } from "react";

type PlayerProps = {
  progress: {
    currentTime: number;
    duration: number;
  };
  audioRef: HTMLAudioElement | null;
};

export const Player = ({ progress, audioRef }: PlayerProps) => {
  const { curentTrack } = useAppSelector((state) => state.playList);
  const { isPlaying } = useAppSelector((state) => state.playList);
  const { isShuffle } = useAppSelector((state) => state.playList);
  const { isLooping } = useAppSelector((state) => state.playList);
  const dispatch = useAppDispatch();
  const classNames = require("classnames");

  const { isLiked, toggleLike } = useLikeTrack(Number(curentTrack?._id));

  // Включение и выключение песни
  const togglePlay = useCallback(() => {
    if (audioRef) {
      if (isPlaying === true) {
        audioRef?.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef?.play();
        dispatch(setIsPlaying(true));
      }
    }
  }, [isPlaying, audioRef, dispatch]);

  // Обработчик повтора
  const toggleLoop = useCallback(() => {
    if (audioRef) {
      if (isLooping === false) {
        audioRef.loop = true;
        dispatch(setIsLooping(!isLooping));
      } else {
        audioRef.loop = false;
        dispatch(setIsLooping(!isLooping));
      }
    }
  }, [isLooping, audioRef, dispatch]);

  // Обработчик рандомизации
  const toggleShufle = useCallback(() => {
    dispatch(setIsShuffle(!isShuffle));
    dispatch(setShuffle());
  }, [isShuffle, dispatch]);

  // Переключение трека вперед
  const nextTrack = useCallback(() => {
    dispatch(setNextTrack());
  }, [dispatch]);

  // переключение трека назад
  const prevTrack = useCallback(() => {
    dispatch(setPreviousTrack());
  }, [dispatch]);

  // изменение громкости
  const onchangeVolume = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (audioRef) {
        const volume = Number(e.target.value) / 100;
        if (audioRef) {
          audioRef.volume = volume;
        }
      }
    },
    [audioRef]
  );

  // установка выбранного времени
  const handleSeek = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (audioRef) {
        audioRef.currentTime = Number(e.currentTarget.value);
      }
    },
    [audioRef]
  );

  const notAlreadyExecuted = useRef(true);
  useEffect(() => {
    if (notAlreadyExecuted.current) {
      audioRef?.addEventListener("ended", () => dispatch(setNextTrack()));
      notAlreadyExecuted.current = false;
    }
  }, [audioRef, dispatch]);

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerBlock}>
          <ProgressBar
            max={audioRef !== null ? audioRef.duration : 0}
            value={progress}
            step={0.01}
            onChange={handleSeek}
            audioRef={audioRef}
          />
          <div className={styles.playerBlock}>
            <div className={styles.barPlayer}>
              <div className={styles.playerControls}>
                <div onClick={prevTrack} className={styles.playerBtnPrev}>
                  <svg className={styles.playerBtnPrevSvg}>
                    <use xlinkHref="/icon/sprite.svg#icon-prev" />
                  </svg>
                </div>
                <div
                  onClick={togglePlay}
                  className={classNames(styles.playerBtnPlay, styles.btn)}>
                  {!isPlaying ? (
                    <svg className={styles.playerBtnPlaySvg}>
                      {" "}
                      <use xlinkHref="/icon/sprite.svg#icon-play" />
                    </svg>
                  ) : (
                    <Image
                      src="/icon/pause.svg"
                      alt="pause"
                      width={22}
                      height={19}
                    />
                  )}
                </div>
                <div onClick={nextTrack} className={styles.playerBtnNext}>
                  <svg className={styles.playerBtnNextSvg}>
                    <use xlinkHref="/icon/sprite.svg#icon-next" />
                  </svg>
                </div>
                <div
                  onClick={toggleLoop}
                  className={classNames(
                    styles.playerBtnRepeat,
                    styles.btnIcon
                  )}>
                  <svg
                    className={classNames(styles.playerBtnRepeatSvg, {
                      [styles.activeg]: isLooping,
                    })}>
                    <use xlinkHref="/icon/sprite.svg#icon-repeat" />
                  </svg>
                </div>
                <div
                  onClick={toggleShufle}
                  className={classNames(
                    styles.playerBtnShuffle,
                    styles.btnIcon
                  )}>
                  <svg
                    className={classNames(styles.playerBtnShuffleSvg, {
                      [styles.activeg]: isShuffle,
                    })}>
                    <use xlinkHref="/icon/sprite.svg#icon-shuffle" />
                  </svg>
                </div>
              </div>
              <div className={styles.playerTrackPlay}>
                <div className={styles.trackPlayContain}>
                  <div className={styles.trackPlayImage}>
                    <svg className={styles.trackPlaySvg}>
                      <use xlinkHref="/icon/sprite.svg#icon-note" />
                    </svg>
                  </div>
                  <div className={styles.trackPlayAuthor}>
                    <a className={styles.trackPlayAuthorLink} href="">
                      {curentTrack?.name}
                    </a>
                  </div>
                  <div className={styles.trackPlayAlbum}>
                    <a className={styles.trackPlayAlbumLink} href="">
                      {curentTrack?.author}
                    </a>
                  </div>
                </div>
                <div className={styles.trackPlayLikeDis}>
                  <div
                    className={classNames(
                      styles.trackPlayLike,
                      styles.btnIcon
                    )}>
                    <svg
                      onClick={toggleLike}
                      className={classNames(styles.trackPlayLikeSvg, {
                        [styles.actives]: isLiked,
                      })}>
                      <use xlinkHref="/icon/sprite.svg#icon-like" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>{" "}
            <div></div>
            <div className={styles.barVolumeBlock}>
              <div className={styles.volumeContent}>
                <div className={styles.volumeImage}>
                  <svg className={styles.volumeSvg}>
                    <use xlinkHref="/icon/sprite.svg#icon-volume" />
                  </svg>
                </div>
                <div className={classNames(styles.volumeProgress, styles.btn)}>
                  <label className={styles.hide} htmlFor="volume">
                    volume
                  </label>{" "}
                  <input
                    onChange={onchangeVolume}
                    id="volume"
                    className={classNames(
                      styles.volumeProgressLine,
                      styles.btn
                    )}
                    type="range"
                    name="range"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
