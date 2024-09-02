import styles from "@/components/player/player.module.css";

export const Player = () => {
  const classNames = require("classnames");

  return (
    <div className={styles.bar}>
      <div className={styles.barContent}>
        <div className={styles.barPlayerProgress} />
        <div className={styles.barPlayerBlock}>
          <div className={styles.barPlayer}>
            <div className={styles.playerControls}>
              <div className={styles.playerBtnPrev}>
                <svg className={styles.playerBtnPrevSvg}>
                  <use xlinkHref="/icon/sprite.svg#icon-prev" />
                </svg>
              </div>
              <div className={classNames(styles.playerBtnPlay, styles.btn)}>
                <svg className={styles.playerBtnPlaySvg}>
                  <use xlinkHref="/icon/sprite.svg#icon-play" />
                </svg>
              </div>
              <div className={styles.playerBtnNext}>
                <svg className={styles.playerBtnNextSvg}>
                  <use xlinkHref="/icon/sprite.svg#icon-next" />
                </svg>
              </div>
              <div className={classNames(styles.playerBtnRepeat, styles.btnIcon)}>
                <svg className={styles.playerBtnRepeatSvg}>
                  <use xlinkHref="/icon/sprite.svg#icon-repeat" />
                </svg>
              </div>
              <div className={classNames(styles.playerBtnShuffle, styles.btnIcon)}>
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
                    Ты та...
                  </a>
                </div>
                <div className={styles.trackPlayAlbum}>
                  <a className={styles.trackPlayAlbumLink} href="http://">
                    Баста
                  </a>
                </div>
              </div>
              <div className={styles.trackPlayLikeDis}>
                <div className={classNames(styles.trackPlayLike, styles.btnIcon)}>
                  <svg className={styles.trackPlayLikeSvg}>
                    <use xlinkHref="/icon/sprite.svg#icon-like" />
                  </svg>
                </div>
                <div className={classNames(styles.trackPlayDislike, styles.btnIcon)}>
                  <svg className={styles.trackPlayDislikeSvg}>
                    <use xlinkHref="/icon/sprite.svg#icon-dislike" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
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
                  id="volume"
                  className={classNames(styles.volumeProgressLine, styles.btn)}
                  type="range"
                  name="range"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
