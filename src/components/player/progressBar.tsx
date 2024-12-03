"use client";

import { ChangeEvent } from "react";
import styles from "./player.module.css";

type progressBarProps = {
  max: number;
  value: { currentTime: number; duration: number };
  step: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  audioRef: HTMLAudioElement | null;
};

export default function ProgressBar({
  max,
  value,
  step,
  onChange,
  audioRef,
}: progressBarProps) {
  const currentTrackDuration = audioRef?.duration;

  const timer = (time: number) => {
    let minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    let seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return { minutes: minutes, seconds: seconds };
  };

  return (
    <div>
      <div className={styles.timerBlock}>
        <div>
          {timer(value.currentTime).minutes}:{timer(value.currentTime).seconds}
        </div>
        <div>
          {!value.duration && currentTrackDuration && (
            <div>
              {timer(currentTrackDuration).minutes}:
              {timer(currentTrackDuration).seconds}
            </div>
          )}
          {value.currentTime > 0 && (
            <div>
              {timer(Number(currentTrackDuration)).minutes}:
              {timer(Number(currentTrackDuration)).seconds}
            </div>
          )}
        </div>
      </div>

      <input
        title="Прогресс"
        className={styles.styledProgressInput}
        type="range"
        min="0"
        max={String(max)}
        value={value.currentTime}
        step={step}
        onChange={onChange}
      />
    </div>
  );
}
