"use client";

import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import {
  fetchFavoritesTracks,
  fetchTracks,
} from "@/store/features/playListSlice";
import { updateTokenUser } from "@/store/features/authSlice";

export default function Home() {
  const dispatch = useAppDispatch();

  const tokenUpdate = async () => {
    const reftoken = localStorage.getItem("refresh") ?? "";
    await dispatch(updateTokenUser(reftoken));
  };

  useEffect(() => {
    const accToken = localStorage.getItem("access");
    if (!accToken) {
      tokenUpdate();
    }
  }, []);

  useEffect(() => {
    dispatch(fetchTracks());
    dispatch(fetchFavoritesTracks());
  }, [dispatch]);

  return <h2 className={styles.centerblockH2}>Треки</h2>;
}
