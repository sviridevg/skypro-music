"use client";

import styles from "@/components/player/player.module.css";
import { TrackTypes } from "@/types/tracks";
import { ChangeEvent, SyntheticEvent, useState } from "react";
import ProgressBar from "./progressBar";
import Image from "next/image";

interface TrackData {
  curentTrack: TrackTypes | null;
  togglePlay: () => void;
  audioRef: HTMLAudioElement | null;
  isPlaying: boolean;
  progress: { currentTime: number; duration: number };
  currentTrackDuration: number | undefined;
}

export const Player = ({
  curentTrack,
  togglePlay,
  audioRef,
  isPlaying,
  progress,
  currentTrackDuration,
}: TrackData) => {
  const classNames = require("classnames");
  const [trackLoop, setTrackLoop] = useState<Boolean>(false);

  let loopClass;
  if (trackLoop === true) {
    loopClass = styles.activeg;
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

  const toggleSwitching = () => {
    alert("Еще не реализовано");
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

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerBlock}>
          <ProgressBar
            max={Number(progress.duration)}
            value={progress.currentTime}
            step={0.01}
            onChange={handleSeek}
            progress={progress}
            isPlaying={isPlaying}
            audioRef={audioRef}
            currentTrackDuration={currentTrackDuration}
          />
          <div className={styles.playerBlock}>
            <div className={styles.barPlayer}>
              <div className={styles.playerControls}>
                <div onClick={toggleSwitching} className={styles.playerBtnPrev}>
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
                <div onClick={toggleSwitching} className={styles.playerBtnNext}>
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
                  className={classNames(
                    styles.playerBtnShuffle,
                    styles.btnIcon
                  )}>
                  <svg className={styles.playerBtnShuffleSvg}>
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
