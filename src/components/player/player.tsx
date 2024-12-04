"use client";

import styles from "@/components/player/player.module.css";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ProgressBar from "./progressBar";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCurrentTime,
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
  currentTime: number;
  duration: number;
};

export const Player = () => {
  const { currentTrack } = useAppSelector((state) => state.playList);
  const { currentTime } = useAppSelector((state) => state.playList);
  const { isPlaying } = useAppSelector((state) => state.playList);
  const { isShuffle } = useAppSelector((state) => state.playList);
  const { isLooping } = useAppSelector((state) => state.playList);
  const dispatch = useAppDispatch();
  const classNames = require("classnames");
  const { isLiked, toggleLike } = useLikeTrack(Number(currentTrack?._id));


  // Инициализация audioRef
  const audioRef = useRef<HTMLAudioElement>(null);



  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.currentTime = currentTime;
    }
    // Только currentTrack и isPlaying как триггеры
    if (isPlaying && audioRef.current) {
      audioRef.current.play();
    } else {
      audioRef.current?.pause();
    }
  }, []);


  const [progress, setProgress] = useState<PlayerProps>({
    currentTime: 0,
    duration: 0,
  });



  const onChangeProgress = useCallback(() => {
    if (audioRef.current) {
      const newTime = audioRef.current.currentTime;
      setProgress({
        currentTime: newTime,
        duration: audioRef.current.duration,
      });
  
      // Проверяем, изменилось ли время
      if (newTime !== currentTime) {
        dispatch(setCurrentTime(newTime));  // Обновляем только при изменении
      }
    }
  }, [dispatch, currentTime]);


  // Включение и выключение песни
  const togglePlay = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        dispatch(setIsPlaying(false));
      } else {
        audioRef.current.play();
        dispatch(setIsPlaying(true));
      }
    }
  }, [isPlaying, dispatch]);

  // Обработчик повтора
  const toggleLoop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.loop = !audioRef.current.loop;
      dispatch(setIsLooping(audioRef.current.loop));
    }
  }, [dispatch]);

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
  const onchangeVolume = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      const volume = Number(e.target.value) / 100;
      audioRef.current.volume = volume;
    }
  }, []);

  // установка выбранного времени
  const handleSeek = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(e.currentTarget.value);
    }
  }, []);

  const notAlreadyExecuted = useRef(true);
  useEffect(() => {
    if (audioRef.current && notAlreadyExecuted.current) {
      audioRef.current.addEventListener("ended", () =>
        dispatch(setNextTrack())
      );
      notAlreadyExecuted.current = false;
    }
  }, [dispatch]);

  const handleCanPlay = () => {
    audioRef.current?.play();
    dispatch(setIsPlaying(true));
  };

  return (
    <div className={styles.bar}>
      <audio
        className={styles.audio}
        onCanPlay={handleCanPlay}
        onTimeUpdate={onChangeProgress}
        ref={audioRef}
        controls
        src={currentTrack?.track_file}
      />
      <div className={styles.barContent}>
        <div className={styles.barPlayerBlock}>
          <ProgressBar
            max={audioRef.current ? audioRef.current.duration : 0}
            value={progress}
            step={0.01}
            onChange={handleSeek}
            audioRef={audioRef.current}
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
                      {currentTrack?.name}
                    </a>
                  </div>
                  <div className={styles.trackPlayAlbum}>
                    <a className={styles.trackPlayAlbumLink} href="">
                      {currentTrack?.author}
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
