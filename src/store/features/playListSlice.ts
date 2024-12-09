import {
  addFavoritesForId,
  dellFavoritesForId,
  favorites,
  getTracks,
  viewSelectionForId,
} from "@/api/tracks";
import { TrackTypes } from "@/types/tracks";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

type playListStateType = {
  isPlaying: boolean;
  isShuffle: boolean;
  isLooping: boolean;
  isLiked: boolean;
  currentTrack: TrackTypes | null;
  tracksList: TrackTypes[];
  shuffledList: TrackTypes[];
  historyList: TrackTypes[];
  favoritesList: TrackTypes[];
  genreList: TrackTypes[];
  isFavorite: number[];
  currentTrackDuration: number | undefined;
  status: string;
  error: null | string;
  searchKeyword: string;
  originalTracksList: TrackTypes[];
  currentGenre: TrackTypes[];
  whatApage: string;
  activeGenres: string[];
  activeAuthors: string[];
  sortOption: string[];
};

const initialState: playListStateType = {
  tracksList: [],
  originalTracksList: [],
  shuffledList: [],
  historyList: [],
  favoritesList: [],
  genreList: [],
  isFavorite: [],
  currentTrack: null,
  isPlaying: false,
  isShuffle: false,
  isLooping: false,
  isLiked: false,
  currentTrackDuration: undefined,
  status: "",
  error: null,
  searchKeyword: "",
  currentGenre: [],
  whatApage: "",
  activeGenres: [],
  activeAuthors: [],
  sortOption: [],
};

// Получение всех треков
export const fetchTracks = createAsyncThunk(
  "playList/fetchTracks",
  async () => {
    return await getTracks();
  }
);

// Получение избранных треков
export const fetchFavoritesTracks = createAsyncThunk(
  "playList/fetchFavoritesTracks",
  async () => {
    return await favorites();
  }
);

// Получение треков по жанру
export const fetchGenre = createAsyncThunk(
  "playList/fetchGenre",
  async (id: number) => {
    return await viewSelectionForId(id);
  }
);

// Добавление в избранное
export const pushFavoriteTrack = createAsyncThunk(
  "playList/pushFavoriteTrack",
  async (id: number) => {
    return await addFavoritesForId(id);
  }
);

// Удаление из избранного
export const dellFavoriteTrack = createAsyncThunk(
  "playList/dellFavoriteTrack",
  async (id: number) => {
    return await dellFavoritesForId(id);
  }
);

// Слайдер
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
    setCurrentTrack(state, action) {
      state.currentTrack = action.payload;
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
        (e) => e._id === state.currentTrack?._id
      );

      state.currentTrack = playList[indexTrack + 1] || playList[0];

      if (state.isPlaying === false) {
        state.isPlaying = true;
      }
    },
    setPreviousTrack: (state) => {
      const playList = !state.isShuffle ? state.tracksList : state.shuffledList;
      const indexTrack = playList.findIndex(
        (e) => e._id === state.currentTrack?._id
      );
      if (indexTrack === 0) {
        return;
      }
      state.currentTrack = playList[indexTrack - 1];
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
      const track = state.tracksList.find((t) => t._id === action.payload);
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
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;

      const lowerCaseKeyword = action.payload.toLowerCase();

      // Фильтруем оригинальный список
      if (state.whatApage === "genre") {
        state.tracksList = state.currentGenre.filter(
          (track) =>
            track.name.toLowerCase().includes(lowerCaseKeyword) ||
            track.author.toLowerCase().includes(lowerCaseKeyword)
        );
      } else {
        state.tracksList = state.originalTracksList.filter(
          (track) =>
            track.name.toLowerCase().includes(lowerCaseKeyword) ||
            track.author.toLowerCase().includes(lowerCaseKeyword)
        );
      }
    },
    resetTracks: (state) => {
      state.tracksList =
        state.whatApage === "genre"
          ? state.currentGenre
          : state.originalTracksList;
      state.searchKeyword = "";
    },

    setActiveGenres: (state, action: PayloadAction<string[] | null>) => {
      state.activeGenres = action.payload ?? state.activeGenres;
    },
    setActiveAuthors: (state, action: PayloadAction<string[] | null>) => {
      state.activeAuthors = action.payload ?? state.activeAuthors;
    },
    setSortOption: (state, action: PayloadAction<string[] | null>) => {
      state.sortOption = action.payload ?? state.sortOption;
    },
    applyFilters: (state) => {
      let filteredTracks;
      if (state.whatApage === "genre") {
        filteredTracks = [...state.currentGenre];
      } else {
        filteredTracks = [...state.originalTracksList];
      }
      if (state.whatApage === "favorit") {
        filteredTracks = [...state.favoritesList];
      }

      // Фильтрация по жанрам
      if (state.activeGenres.length > 0) {
        filteredTracks = filteredTracks.filter((track) =>
          state.activeGenres.some((genre) => genre === String(track.genre))
        );
      }

      // Фильтрация по авторам
      if (state.activeAuthors.length > 0) {
        filteredTracks = filteredTracks.filter((track) =>
          state.activeAuthors.some((author) => author === track.author)
        );
      }

      // Сортировка
      if (state.sortOption.some((el) => el === "Сначала новые")) {
        filteredTracks.sort(
          (a, b) =>
            new Date(b.release_date).getTime() -
            new Date(a.release_date).getTime()
        );
      } else if (state.sortOption.some((el) => el === "Сначала старые")) {
        filteredTracks.sort(
          (a, b) =>
            new Date(a.release_date).getTime() -
            new Date(b.release_date).getTime()
        );
      } else if (state.sortOption.some((el) => el === "По умолчанию")) {
        state.sortOption = [];
      }

      state.tracksList = filteredTracks;
    },
    setWhatAPage: (state, action: PayloadAction<string>) => {
      state.whatApage = action.payload;
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
          state.originalTracksList = action.payload;
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
      })
      .addCase(fetchGenre.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(
        fetchGenre.fulfilled,
        (state, action: PayloadAction<{ items: TrackTypes[] }>) => {
          state.status = "resolved";
          state.genreList = action.payload.items;
          state.tracksList = state.shuffledList.filter((track) =>
            state.genreList.includes(track._id)
          );
          state.currentGenre = state.shuffledList.filter((track) =>
            state.genreList.includes(track._id)
          );
        }
      )

      .addCase(fetchGenre.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Ошибка загрузки жанров";
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
  setSearchKeyword,
  resetTracks,
  setActiveGenres,
  setActiveAuthors,
  applyFilters,
  setSortOption,
  setWhatAPage,
} = playListSlice.actions;

export const playListSliceReducer = playListSlice.reducer;
