import "@testing-library/jest-dom";
import { Nav } from "@/components/nav/nav";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Мокируем useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockStore = configureStore([]);

describe("Компонент Nav", () => {
  let mockPush: jest.Mock;
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    store = mockStore({
      // Ваши начальные состояния для стора
      auth: { isAuthenticated: false },
    });

    // Мокируем localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn().mockImplementation((key: string) => {
          if (key === "authState") {
            return "false";
          }
          return null;
        }),
        setItem: jest.fn(),
        clear: jest.fn(),
      },
      writable: true,
    });
  });

  const renderWithProvider = (ui: JSX.Element) => {
    return render(<Provider store={store}>{ui}</Provider>);
  };

  it("Отображает логотип и кнопку меню", () => {
    renderWithProvider(<Nav />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
  });

  it("Открывает и закрывает меню при клике на бургер-меню", () => {
    renderWithProvider(<Nav />);
    const burgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(burgerButton);
    expect(screen.getByText("Главное")).toBeInTheDocument();

    fireEvent.click(burgerButton);
    expect(screen.queryByText("Главное")).not.toBeInTheDocument();
  });

  it("Переходит на главную страницу при клике на логотип", () => {
    renderWithProvider(<Nav />);
    const logo = screen.getByAltText("Logo");
    fireEvent.click(logo);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it('Переходит на страницу входа при клике на "Войти"', () => {
    renderWithProvider(<Nav />);

    const burgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(burgerButton);

    const loginButton = screen.getByText(/Войти/i);
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith("/signin");
  });

  it('Не отображает "Мой плейлист", если пользователь не авторизован', () => {
    renderWithProvider(<Nav />);
    expect(screen.queryByText(/Мой плейлист/i)).not.toBeInTheDocument();
  });

  it('Отображает "Мой плейлист", если пользователь авторизован', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue("true");
    store = mockStore({
      auth: { isAuthenticated: true },
    });
    renderWithProvider(<Nav />);

    const burgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(burgerButton);

    expect(screen.getByText(/Мой плейлист/i)).toBeInTheDocument();
  });

  it('Переходит на страницу избранного при клике на "Мой плейлист"', () => {
    (window.localStorage.getItem as jest.Mock).mockReturnValue("true");
    store = mockStore({
      auth: { isAuthenticated: true },
    });
    renderWithProvider(<Nav />);

    const burgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(burgerButton);

    fireEvent.click(screen.getByText(/Мой плейлист/i));
    expect(mockPush).toHaveBeenCalledWith("/tracks/favorites");
  });
});
