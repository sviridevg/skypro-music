

import { TrackTypes } from "@/types/tracks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type playListStateType =  {
  isPlaying: boolean;
  isShuffle: boolean;
  curentTrack: TrackTypes | null;
  tracksList: TrackTypes[];
  shuffledList: TrackTypes[];
  historyList: TrackTypes[];
  progress: {
    currentTime: number,
    duration: number,
  };
  currentTrackDuration: number | undefined;
}

const initialState: playListStateType = {
  tracksList: [],
  shuffledList: [],
  historyList: [],
  curentTrack: null,
  isPlaying: false,
  isShuffle: false,
  progress: {
    currentTime: 0,
    duration: 0,
  },
  currentTrackDuration: undefined,
};

const playListSlice = createSlice({
  name: "playList",
  initialState,
  reducers: {
    setTracksList: (state, action: PayloadAction<TrackTypes[]>) => {
      state.tracksList = action.payload;
      state.shuffledList = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<TrackTypes | null>) => {
      state.curentTrack = action.payload;
      state.historyList = state.curentTrack !== null ? [...state.historyList, state.curentTrack] : state.historyList;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setProgress: (state, action: PayloadAction<{ currentTime: number, duration: number }>) => {
      state.progress = action.payload;
    },
    setCurrentTrackDuration: (state, action: PayloadAction<number | undefined>) => {
      state.currentTrackDuration = action.payload;
    },
    setNextTrack: (state) => {
      const playList = !state.isShuffle ? state.tracksList : state.shuffledList;
      const indexTrack = playList.findIndex((e) => e._id === state.curentTrack?._id);
      state.curentTrack = playList[indexTrack + 1]
      // state.historyList =  [...state.historyList, state.curentTrack] 
    },
    setPreviousTrack: (state) => {
      const playList = !state.isShuffle ? state.tracksList : state.shuffledList;
      const indexTrack = playList.findIndex(e => e._id === state.curentTrack?._id);
      state.curentTrack = playList[indexTrack - 1] 
    },
    setShuffle: (state) => {
      state.shuffledList.sort(() => Math.random() - 0.5);
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    }
  },
});

export const { setTracksList, setIsPlaying, setProgress, setCurrentTrack, setCurrentTrackDuration, setNextTrack, setPreviousTrack, setShuffle, setIsShuffle  } = playListSlice.actions;
export const playListSliceReducer = playListSlice.reducer;