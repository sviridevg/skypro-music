import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { ContentPage } from "@/components/content/contentpage";
import { makeStore } from "@/store/store";

describe("Компонент ContentPage", () => {
  const mockTracksList = [
    { id: 1, name: "Track 1", artist: "Artist 1", album: "Album 1" },
    { id: 2, name: "Track 2", artist: "Artist 2", album: "Album 2" },
  ];

  it('Отображает заголовки колонок и сообщение о загрузке при статусе "pending"', () => {
    const store = makeStore();
    store.dispatch({
      type: "playList/setStatus",
      payload: { status: "pending", tracksList: [] },
    });

    render(
      <Provider store={store}>
        <ContentPage />
      </Provider>
    );

    expect(screen.getByText("Трек"));
    expect(screen.getByText("Исполнитель"));
    expect(screen.getByText("Альбом"));
  });

  it('Отображает список треков при статусе "resolved"', () => {
    const store = makeStore();
    store.dispatch({
      type: "playList/setStatus",
      payload: { status: "resolved", tracksList: mockTracksList },
    });

    render(
      <Provider store={store}>
        <ContentPage />
      </Provider>
    );

    mockTracksList.forEach((track) => {
      expect(screen.findByText(track.name));
      expect(screen.findByText(track.artist));
      expect(screen.findByText(track.album));
    });
  });
});
