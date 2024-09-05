import styles from "@/components/playlist/playlist.module.css";

import { Track } from "../track/track";

export const Playlist = () => {
  return (
    <div className={styles.contentPlaylist}>
      <Track />
    </div>
  );
};
