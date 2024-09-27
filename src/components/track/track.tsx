import styles from "@/components/track/track.module.css";
import { TrackTypes } from "@/types/tracks";

type TrackProps = { track: TrackTypes };

export const Track = ({ track }: TrackProps) => {
  const classNames = require("classnames");

  let minutes: string = Math.floor(track.duration_in_seconds / 60)
    .toString()
    .padStart(2, "0");

  let seconds: string = (track.duration_in_seconds % 60)
    .toString()
    .padStart(2, "0");

  return (
    <div key={track._id} className={styles.playlistItem}>
      <div className={styles.playlistTrack}>
        <div className={styles.trackTitle}>
          <div className={styles.trackTitleImage}>
            <svg className={styles.trackTitleSvg}>
              <use xlinkHref="/icon/sprite.svg#icon-note" />
            </svg>
          </div>
          <div className={styles.trackTitleText}>
            <a className={styles.trackTitleLink} href="http://">
              {track.name} <span className={styles.trackTitleSpan} />
            </a>
          </div>
        </div>
        <div className={styles.trackAuthor}>
          <a className={styles.trackAuthorLink} href="http://">
            {track.author}
          </a>
        </div>
        <div className={styles.trackAlbum}>
          <a className={styles.trackAlbumLink} href="http://">
            {track.album}
          </a>
        </div>
        <div className={styles.trackTime}>
          <svg className={styles.trackTimeSvg}>
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
