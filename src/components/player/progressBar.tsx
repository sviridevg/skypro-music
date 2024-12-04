"use client";

import { ChangeEvent } from "react";
import styles from "./player.module.css";
import { useAppSelector } from "@/store/store";

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
  const currentTrackDuration = audioRef?.duration ?? 0;

  const timer = (time: number) => {
    let minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    let seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return { minutes: minutes, seconds: seconds };
  };

  // Функция для безопасного отображения длительности трека
  const getTrackDuration = () => {
    if (isNaN(currentTrackDuration) || currentTrackDuration === 0) {
      return null;
    }
    return timer(currentTrackDuration);
  };

  return (
    <div>
      <div className={styles.timerBlock}>
        <div>
          {timer(value.currentTime).minutes}:{timer(value.currentTime).seconds}
        </div>
        <div>
          {value.duration === 0 &&
            currentTrackDuration > 0 &&
            getTrackDuration() && (
              <div>
                {getTrackDuration()?.minutes}:{getTrackDuration()?.seconds}
              </div>
            )}
          {value.currentTime > 0 && getTrackDuration() && (
            <div>
              {getTrackDuration()?.minutes}:{getTrackDuration()?.seconds}
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
