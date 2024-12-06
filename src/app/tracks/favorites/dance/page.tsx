"use client";

import styles from "@/app/tracks/favorites/page.module.css";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchGenre, fetchTracks } from "@/store/features/playListSlice";

export default function Dance() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTracks()).then(() => {
      dispatch(fetchGenre(3));
    });
  }, [dispatch]);

  return <h2 className={styles.centerblockH2}>100 танцевальных хитов</h2>;
}
