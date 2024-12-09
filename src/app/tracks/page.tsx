"use client";

import styles from "./page.module.css";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/store";
import {
  fetchFavoritesTracks,
  fetchTracks,
} from "@/store/features/playListSlice";


export default function Home() {
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(fetchTracks());
    dispatch(fetchFavoritesTracks());
  }, [dispatch]);

  return <h2 className={styles.centerblockH2}>Треки</h2>;
}
