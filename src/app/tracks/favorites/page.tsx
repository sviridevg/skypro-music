"use client";

import styles from "./page.module.css";
import { useEffect, } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchFavoritesTracks,
  setTracksList,
} from "@/store/features/playListSlice";

export default function Favorites() {
  const { favoritesList } = useAppSelector((state) => state.playList);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setTracksList(favoritesList));
    if (favoritesList.length === 0) {
      dispatch(fetchFavoritesTracks());
      dispatch(setTracksList(favoritesList));
    }
  }, [dispatch, favoritesList]);

  return <h2 className={styles.centerblockH2}>Мои треки</h2>;
}
