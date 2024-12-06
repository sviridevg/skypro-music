"use client";

import styles from "@/app/tracks/favorites/page.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchGenre, fetchTracks } from "@/store/features/playListSlice";

export default function Indie() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTracks()).then(() => {
      dispatch(fetchGenre(4));
    });
  }, [dispatch]);

  return <h2 className={styles.centerblockH2}>Инди заряд</h2>;
}
