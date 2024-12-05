import "@testing-library/jest-dom";
import { Nav } from "@/components/nav/nav";
import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";

// Мокируем useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Компонент Nav", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    // Мокируем localStorage
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", {
      value: localStorageMock,
      writable: true,
    });

    localStorage.getItem.mockImplementation((key: string) => {
      if (key === "authState") {
        return "false";
      }
      return null;
    });
  });

  it("Отображает логотип и кнопку меню", () => {
    render(<Nav />);
    expect(screen.getByAltText("Logo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "" })).toBeInTheDocument();
  });

  it("Открывает и закрывает меню при клике на бургер-меню", () => {
    render(<Nav />);
    const burgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(burgerButton);
    expect(screen.getByText("Главное")).toBeInTheDocument();

    fireEvent.click(burgerButton);
    expect(screen.queryByText("Главное")).not.toBeInTheDocument();
  });

  it("Переходит на главную страницу при клике на логотип", () => {
    render(<Nav />);
    const logo = screen.getByAltText("Logo");
    fireEvent.click(logo);
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  it('Переходит на страницу входа при клике на "Войти"', () => {
    render(<Nav />);

    const burgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(burgerButton);

    const loginButton = screen.getByText(/Войти/i);
    fireEvent.click(loginButton);

    expect(mockPush).toHaveBeenCalledWith("/signin");
  });

  it('Не отображает "Мой плейлист", если пользователь не авторизован', () => {
    render(<Nav />);
    expect(screen.queryByText(/Мой плейлист/i)).not.toBeInTheDocument();
  });

  it('Отображает "Мой плейлист", если пользователь авторизован', () => {
    localStorage.getItem.mockReturnValue("true");
    render(<Nav />);

    const burgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(burgerButton);

    expect(screen.getByText(/Мой плейлист/i)).toBeInTheDocument();
  });

  it('Переходит на страницу избранного при клике на "Мой плейлист"', () => {
    localStorage.getItem.mockReturnValue("true");
    render(<Nav />);

    const burgerButton = screen.getByRole("button", { name: "" });
    fireEvent.click(burgerButton);

    fireEvent.click(screen.getByText(/Мой плейлист/i));
    expect(mockPush).toHaveBeenCalledWith("/favorites");
  });
});
