"use client";

import { ChangeEvent } from "react";
import styles from "./player.module.css";

type progressBarProps = {
  max: number;
  value: number;
  step: number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  progress: { currentTime: number; duration: number };
  isPlaying: boolean;
  audioRef: HTMLAudioElement | null;
  currentTrackDuration: number | undefined;
};

export default function ProgressBar({
  max,
  value,
  step,
  onChange,
  progress,
  audioRef,
  currentTrackDuration,
}: progressBarProps) {
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
          {timer(progress.currentTime).minutes}:
          {timer(progress.currentTime).seconds}
        </div>
        <div>
          {!progress.duration && currentTrackDuration && (
            <div>
              {timer(currentTrackDuration).minutes}:
              {timer(currentTrackDuration).seconds}
            </div>
          )}
          {progress.currentTime > 0 && (
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
        value={value}
        step={step}
        onChange={onChange}
      />
    </div>
  );
}
