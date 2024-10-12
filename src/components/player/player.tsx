"use client";

import styles from "@/components/player/player.module.css";
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import ProgressBar from "./progressBar";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  setCurrentTrack,
  setIsPlaying,
  setIsShuffle,
  setNextTrack,
  setPreviousTrack,
  setShuffle,
} from "@/store/features/playListSlice";
import { TrackTypes } from "@/types/tracks";

interface TrackData {
  togglePlay: () => void;
  audioRef: HTMLAudioElement | null;
}

export const Player = ({ togglePlay, audioRef }: TrackData) => {
  const { curentTrack } = useAppSelector((state) => state.playList);
  const { progress } = useAppSelector((state) => state.playList);
  const { isPlaying } = useAppSelector((state) => state.playList);
  const { isShuffle } = useAppSelector((state) => state.playList);
  const { shuffledList } = useAppSelector((state) => state.playList);
  const { tracksList } = useAppSelector((state) => state.playList);
  const { historyList } = useAppSelector((state) => state.playList);

  const dispatch = useAppDispatch();

  const classNames = require("classnames");
  const [trackLoop, setTrackLoop] = useState<Boolean>(false);
  const [playList, setPlayList] = useState<TrackTypes[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    if (curentTrack) {
      const indextrack = playList.findIndex((e) => e._id === curentTrack?._id);
      setCurrentTrackIndex(indextrack);
    }
  }, [curentTrack, playList]);

  useEffect(() => {
    if (tracksList && shuffledList) {
      setPlayList(!isShuffle ? tracksList : shuffledList);
    }
  }, [playList, isShuffle, shuffledList, tracksList]);

  let loopClass;
  if (trackLoop === true) {
    loopClass = styles.activeg;
  }

  let isShuffleClass;
  if (isShuffle === true) {
    isShuffleClass = styles.activeg;
  }

  const toggleLoop = () => {
    if (audioRef) {
      setTrackLoop(!trackLoop);
      if (!trackLoop) {
        audioRef.loop = true;
      } else {
        audioRef.loop = false;
      }
    }
  };

  const toggleShufle = async () => {
    await dispatch(setIsShuffle(!isShuffle));
    await dispatch(setShuffle());
  };

  const nextTrack = async () => {
    const indextrack = playList.findIndex((e) => e._id === curentTrack?._id);
    if (indextrack === playList.length - 1) return;

    await dispatch(setNextTrack());
    if (audioRef && curentTrack) {
      audioRef.addEventListener("loadstart", function () {
        if (audioRef.paused) {
          audioRef.play();
        }
      });
    }
  };

  const prevTrack = async () => {
    const indextrack = playList.findIndex((e) => e._id === curentTrack?._id);
    if (indextrack === 0) return;

    await dispatch(setPreviousTrack());
    if (audioRef && curentTrack) {
      audioRef.addEventListener("loadstart", function () {
        if (audioRef.paused) {
          audioRef.play();
        }
      });
    }
  };

  // изменение громкости
  const onchangeVolume = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef) {
      const volume = Number(e.target.value) / 100;
      audioRef.volume = volume;
    }
  };

  // установка выбранного времени
  const handleSeek = (e: ChangeEvent<HTMLInputElement>) => {
    if (audioRef) {
      audioRef.currentTime = Number(e.currentTarget.value);
    }
  };

  const handleEnded = () => {
    // Проверяем, не является ли текущий трек последним в плейлисте
    if (currentTrackIndex < playList.length - 1) {
      // Переход к следующему треку
      setCurrentTrackIndex(currentTrackIndex + 1);
    } else {
      // Или начинаем плейлист с начала
      setCurrentTrackIndex(0);
    }
  };

  // Устанавливаем источник аудио и обработчик события `ended` при изменении трека
  useEffect(() => {
    const audio = audioRef;

    if (audio !== null && playList[currentTrackIndex] !== undefined) {
      audio.src = playList[currentTrackIndex].track_file;
      audio.addEventListener("ended", handleEnded);

      audio.addEventListener("loadstart", function () {
        audio.play();
        dispatch(setIsPlaying(true));
      });

      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentTrackIndex, playList]);

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerBlock}>
          <ProgressBar
            max={Number(progress.duration)}
            value={progress.currentTime}
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
                    className={classNames(
                      styles.playerBtnRepeatSvg,
                      loopClass
                    )}>
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
                    className={classNames(
                      styles.playerBtnShuffleSvg,
                      isShuffleClass
                    )}>
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
                    <a className={styles.trackPlayAuthorLink} href="http://">
                      {curentTrack?.name}
                    </a>
                  </div>
                  <div className={styles.trackPlayAlbum}>
                    <a className={styles.trackPlayAlbumLink} href="http://">
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
                    <svg className={styles.trackPlayLikeSvg}>
                      <use xlinkHref="/icon/sprite.svg#icon-like" />
                    </svg>
                  </div>
                  <div
                    className={classNames(
                      styles.trackPlayDislike,
                      styles.btnIcon
                    )}>
                    <svg className={styles.trackPlayDislikeSvg}>
                      <use xlinkHref="/icon/sprite.svg#icon-dislike" />
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
