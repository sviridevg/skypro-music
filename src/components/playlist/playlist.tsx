import styles from "@/components/playlist/playlist.module.css";
import { Track } from "../track/track";
import { TrackTypes } from "@/types/tracks";
type PlaylistProps = { tracks: TrackTypes[] };

export const Playlist = ({ tracks }: PlaylistProps) => {
  return (
    <div className={styles.contentPlaylist}>
      {tracks.map((track) => (
        <Track key={track._id} track={track} />
      ))}
    </div>
  );
};
