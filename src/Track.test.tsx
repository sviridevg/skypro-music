import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { Track } from "@/components/track/track";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { useLikeTrack } from "@/hooks/useLikeTrack";
import { playListSliceReducer } from "@/store/features/playListSlice";

jest.mock("@/store/store", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/hooks/useLikeTrack", () => ({
  useLikeTrack: jest.fn(),
  __esModule: true,
}));

const store = configureStore({
  reducer: {
    tracksSlice: playListSliceReducer,
  },
});

const track = {
  _id: 35,
  name: "Hard Metal Intro",
  author: "Winniethemoog",
  releaseDate: "1991-09-06",
  genre: ["Рок музыка"],
  duration_in_seconds: 255,
  album: "Hard Metal",
  logo: {
    type: "Buffer",
    data: [],
  },
  track_file:
    "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog__-_Hard_Metal_Intro.mp3",
  staredUser: [],
};

const mockAudioRef = {
  play: jest.fn(), // Мокаем метод play
  paused: true,
  src: "https://webdev-music-003b5b991590.herokuapp.com/media/music_files/Winniethemoog__-_Hard_Metal_Intro.mp3",
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
} as unknown as HTMLAudioElement;

const setup = () =>
  render(
    <Provider store={store}>
      <Track track={track} audioRef={mockAudioRef} />
    </Provider>
  );

describe("Track", () => {
  beforeEach(() => {
    (useLikeTrack as jest.Mock).mockReturnValue({
      isLiked: false,
      toggleLike: jest.fn(),
    });

    (useAppSelector as jest.Mock).mockImplementation((selector) =>
      selector({
        tracksSlice: {
          currentTrack: null,
          isPlaying: false,
        },
      })
    );

    const dispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatch);
  });

  it("отображает название трека", () => {
    setup();
    const trackName = screen.getByText("Hard Metal Intro");
    expect(trackName).toBeInTheDocument();
  });

  it("воспроизведение трека по щелчку мыши", () => {
    setup();
    const trackTitle = screen.getByText("Hard Metal Intro");
    fireEvent.click(trackTitle);
  });

  it("переключатель кнопки нравится", () => {
    setup();
    const likeButton = screen.getByTestId("like-button");
    fireEvent.click(likeButton);
    expect(useLikeTrack).toHaveBeenCalledWith(track._id);
  });
});
