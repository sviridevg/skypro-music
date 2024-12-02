import {
  addFavoritesForId,
  dellFavoritesForId,
  favorites,
  getTracks,
} from "@/api/tracks";
import { TrackTypes } from "@/types/tracks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type playListStateType = {
  isPlaying: boolean;
  isShuffle: boolean;
  isLooping: boolean;
  isLiked: boolean;
  curentTrack: TrackTypes | null;
  tracksList: TrackTypes[];
  shuffledList: TrackTypes[];
  historyList: TrackTypes[];
  favoritesList: TrackTypes[];
  isFavorite: number[];
  currentTrackDuration: number | undefined;
  status: string;
  error: null | string;
};

const initialState: playListStateType = {
  tracksList: [],
  shuffledList: [],
  historyList: [],
  favoritesList: [],
  isFavorite: [],
  curentTrack: null,
  isPlaying: false,
  isShuffle: false,
  isLooping: false,
  isLiked: false,
  currentTrackDuration: undefined,
  status: "",
  error: null,
};

export const fetchTracks = createAsyncThunk(
  "playList/fetchTracks",
  async () => {
    return await getTracks();
  }
);

export const fetchFavoritesTracks = createAsyncThunk(
  "playList/fetchFavoritesTracks",
  async () => {
    return await favorites();
  }
);

export const pushFavoriteTrack = createAsyncThunk(
  "playList/pushFavoriteTrack",
  async (id: number) => {
    return await addFavoritesForId(id);
  }
);

export const dellFavoriteTrack = createAsyncThunk(
  "playList/dellFavoriteTrack",
  async (id: number) => {
    return await dellFavoritesForId(id);
  }
);

const playListSlice = createSlice({
  name: "playList",
  initialState,
  reducers: {
    setTracksList: (state, action: PayloadAction<TrackTypes[]>) => {
      state.tracksList = action.payload;
      state.shuffledList = action.payload;
    },
    setFavoritesList: (state, action: PayloadAction<TrackTypes[]>) => {
      state.favoritesList = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<TrackTypes | null>) => {
      state.curentTrack = action.payload;
      state.historyList =
        state.curentTrack !== null
          ? [...state.historyList, state.curentTrack]
          : state.historyList;
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setCurrentTrackDuration: (
      state,
      action: PayloadAction<number | undefined>
    ) => {
      state.currentTrackDuration = action.payload;
    },
    setNextTrack: (state) => {
      const playList = !state.isShuffle ? state.tracksList : state.shuffledList;
      const indexTrack = playList.findIndex(
        (e) => e._id === state.curentTrack?._id
      );

      // Запуск следующей песни по клику
      state.curentTrack = playList[indexTrack + 1];

      // Обработчик последней песни
      if (indexTrack === playList.length - 1) {
        state.curentTrack = playList[0];
        return;
      }

      // Обработчик состояния переключения песни из режима паузы
      if (state.isPlaying === false) {
        state.isPlaying = true;
      }
    },
    setPreviousTrack: (state) => {
      const playList = !state.isShuffle ? state.tracksList : state.shuffledList;
      const indexTrack = playList.findIndex(
        (e) => e._id === state.curentTrack?._id
      );
      if (indexTrack === 0) {
        return;
      }
      state.curentTrack = playList[indexTrack - 1];
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
    },
    setFavoriteTrack: (state, action) => {
      state.isFavorite.push(action.payload);
      const track = state.tracksList.find(t => t._id === action.payload);
      if (track) {
        state.favoritesList.push(track);
      }
    },

    setDellFavoriteTrack: (state, action) => {
      state.favoritesList = state.favoritesList.filter(
        (track) => track._id !== action.payload
      );
      state.isFavorite = state.isFavorite.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        fetchTracks.fulfilled,
        (state, action: PayloadAction<TrackTypes[]>) => {
          state.status = "resolved";
          state.tracksList = action.payload;
          state.shuffledList = action.payload;
        }
      )
      .addCase(fetchTracks.rejected, (state) => {
        state.status = "rejected";
        state.error = null;
      })
      .addCase(fetchFavoritesTracks.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        fetchFavoritesTracks.fulfilled,
        (state, action: PayloadAction<TrackTypes[]>) => {
          state.status = "resolved";
          state.favoritesList = action.payload;
          const isFavoritearr: number[] = [];
          action.payload.forEach((item) => isFavoritearr.push(item._id));
          state.isFavorite = isFavoritearr;
        }
      )
      .addCase(fetchFavoritesTracks.rejected, (state) => {
        state.status = "rejected";
        state.error = null;
      });
  },
});

export const {
  setTracksList,
  setIsPlaying,
  setCurrentTrack,
  setCurrentTrackDuration,
  setNextTrack,
  setPreviousTrack,
  setShuffle,
  setIsShuffle,
  setIsLooping,
  setFavoritesList,
  setFavoriteTrack,
  setDellFavoriteTrack,
} = playListSlice.actions;
export const playListSliceReducer = playListSlice.reducer;
