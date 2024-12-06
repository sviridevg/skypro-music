import "@testing-library/jest-dom";
import { Track } from "@/components/track/track";

import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore, Dispatch } from "redux";
import { setCurrentTrack, setIsPlaying } from "@/store/features/playListSlice";
import { useLikeTrack } from "@/hooks/useLikeTrack";
import { useAppSelector, useAppDispatch } from "@/store/store";
import { TrackTypes } from "@/types/tracks";

// Мокаем хуки `useAppSelector` и `useAppDispatch` из Redux
jest.mock("@/store/store", () => ({
  useAppSelector: jest.fn(),
  useAppDispatch: jest.fn(),
}));

// Мокаем хук `useLikeTrack`
jest.mock("@/hooks/useLikeTrack", () => ({
  useLikeTrack: jest.fn(),
}));

// Вспомогательная функция для создания мокового store
const createMockStore = (state = {}) => {
  return createStore((state) => state, state);
};

describe("Компонент Track", () => {
  let mockDispatch: Dispatch;
  let mockTrack: TrackTypes;

  beforeEach(() => {
    // Сброс мок-функций перед каждым тестом
    mockDispatch = jest.fn();
    (useAppDispatch as jest.Mock).mockReturnValue(mockDispatch);
    mockTrack = {
      _id: 1,
      name: "Трек для теста",
      author: "Автор теста",
      album: "Альбом теста",
      duration_in_seconds: 240,
      releaseDate: String(new Date()),
      genre: ["Test Genre"],
      logo: "test-logo.jpg",
      track_file: "test-track.mp3",
      staredUser: [],
    };

    // Мокаем хук `useAppSelector` для дефолтного состояния
    (useAppSelector as jest.Mock).mockReturnValue({
      isPlaying: false,
      currentTrack: null,
    });

    // Мокаем хук `useLikeTrack`
    (useLikeTrack as jest.Mock).mockReturnValue({
      isLiked: false,
      toggleLike: jest.fn(),
    });
  });

  it("отрисовывает название трека, автора и альбом", () => {
    render(
      <Provider store={createMockStore()}>
        <Track track={mockTrack} audioRef={null} />
      </Provider>
    );

    // Проверяем, что данные трека отображаются
    expect(screen.getByText("Трек для теста")).toBeInTheDocument();
    expect(screen.getByText("Автор теста")).toBeInTheDocument();
    expect(screen.getByText("Альбом теста")).toBeInTheDocument();
  });

  it("отправляет действия setCurrentTrack и setIsPlaying при клике на трек", () => {
    render(
      <Provider store={createMockStore()}>
        <Track track={mockTrack} audioRef={null} />
      </Provider>
    );

    // Симулируем клик по названию трека
    fireEvent.click(screen.getByText("Трек для теста"));

    // Проверяем, что были отправлены действия
    expect(mockDispatch).toHaveBeenCalledWith(setCurrentTrack(mockTrack));
    expect(mockDispatch).toHaveBeenCalledWith(setIsPlaying(true));
  });

  it("переключает лайк при клике на иконку лайка", () => {
    render(
      <Provider store={createMockStore()}>
        <Track track={mockTrack} audioRef={null} />
      </Provider>
    );

    // Симулируем клик по иконке лайка
    const likeIcon = screen.getByRole("img"); // Иконка лайка — это SVG
    fireEvent.click(likeIcon);

    // Проверяем, что была вызвана функция toggleLike
    expect(useLikeTrack(mockTrack._id).toggleLike).toHaveBeenCalled();
  });

  it("правильно отображает продолжительность трека", () => {
    render(
      <Provider store={createMockStore()}>
        <Track track={mockTrack} audioRef={null} />
      </Provider>
    );

    // Проверяем, что продолжительность трека отображается в формате mm:ss
    expect(screen.getByText("04:00")).toBeInTheDocument();
  });
});
