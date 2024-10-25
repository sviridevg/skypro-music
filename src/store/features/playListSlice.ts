
import { TrackTypes } from "@/types/tracks";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type playListStateType =  {
  isPlaying: boolean;
  isShuffle: boolean;
  isLooping: boolean;
  curentTrack: TrackTypes | null;
  tracksList: TrackTypes[];
  shuffledList: TrackTypes[];
  historyList: TrackTypes[];
  favoritesList: TrackTypes[];
  currentTrackDuration: number | undefined;
}

const initialState: playListStateType = {
  tracksList: [],
  shuffledList: [],
  historyList: [],
  favoritesList: [],
  curentTrack: null,
  isPlaying: false,
  isShuffle: false,
  isLooping: false,
  currentTrackDuration: undefined,
};


const playListSlice = createSlice({
  name: "playList",
  initialState,
  reducers: {
    setTracksList: (state, action: PayloadAction<TrackTypes[]>) => {
      state.tracksList = action.payload;
      state.shuffledList = action.payload;
      state.favoritesList = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<TrackTypes | null>) => {
      state.curentTrack = action.payload;
      state.historyList = state.curentTrack !== null ? [...state.historyList, state.curentTrack] : state.historyList;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrackDuration: (state, action: PayloadAction<number | undefined>) => {
      state.currentTrackDuration = action.payload;
    },
    setNextTrack: (state) => {
      const playList = !state.isShuffle ? state.tracksList : state.shuffledList;
      const indexTrack = playList.findIndex((e) => e._id === state.curentTrack?._id);

      // Запуск следующей песни по клику
      state.curentTrack = playList[indexTrack + 1]

      // Обработчик последней песни
      if (indexTrack === playList.length - 1) {
        state.curentTrack = playList[0]
        return;
      }

      // Обработчик состояния переключения песни из режима паузы 
      if (state.isPlaying === false) {
        state.isPlaying = true;
      }

    },
    setPreviousTrack: (state) => {
      const playList = !state.isShuffle ? state.tracksList : state.shuffledList;
      const indexTrack = playList.findIndex(e => e._id === state.curentTrack?._id);
      if (indexTrack === 0) {
        return;
      }
      state.curentTrack = playList[indexTrack - 1] 
      if (state.isPlaying === false) {
        state.isPlaying = true;
      }

    },
    setShuffle: (state) => {
      state.shuffledList.sort(() => Math.random() - 0.5);
    },
    setIsShuffle: (state, action: PayloadAction<boolean>) => {
      state.isShuffle = action.payload;
    },
    setIsLooping: (state, action: PayloadAction<boolean>) => {
      state.isLooping = action.payload;
    }
  },
});

export const { setTracksList, setIsPlaying,   setCurrentTrack, setCurrentTrackDuration, setNextTrack, setPreviousTrack, setShuffle, setIsShuffle, setIsLooping  } = playListSlice.actions;
export const playListSliceReducer = playListSlice.reducer;