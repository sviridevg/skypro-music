"use client";

import styles from "@/components/content/contentpage.module.css";
import { Playlist } from "../playlist/playlist";

interface Playlist {
  error: string | null;
  audioRef: HTMLAudioElement | null;
}

export const ContentPage = ({ error, audioRef }: Playlist) => {
  const classNames = require("classnames");

  return (
    <div
      className={classNames(styles.centerblockContent, styles.playlistContent)}>
      <div className={classNames(styles.contentTitle, styles.playlistTitle)}>
        <div className={classNames(styles.playlistTitleCol, styles.col01)}>
          Трек
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col02)}>
          Исполнитель
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col03)}>
          Альбом
        </div>
        <div className={classNames(styles.playlistTitleCol, styles.col04)}>
          <svg className={styles.playlistTitleSvg}>
            <use xlinkHref="/icon/sprite.svg#icon-watch" />
          </svg>
        </div>
      </div>
      <Playlist audioRef={audioRef} />
      {error && <div>Error: {error}</div>}
    </div>
  );
};
