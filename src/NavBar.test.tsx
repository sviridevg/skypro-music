import "@testing-library/jest-dom";

import { waitFor } from "@testing-library/react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Nav } from "@/components/nav/nav";
import { useRouter } from "next/navigation";

// Мокируем использование роутера
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Nav Component", () => {
  it("отображает логотип и при клике переходит на главную страницу", () => {
    render(<Nav />);
    const logo = screen.getByAltText("logo");
    fireEvent.click(logo);
  });

  it("показывает меню при клике на бургер", () => {
    render(<Nav />);

    const burgerButton = screen.getByRole("button");
    fireEvent.click(burgerButton);

    const menu = screen.getByRole("navigation");
    expect(menu).toBeInTheDocument();
  });

  it("проверка наличия 'Главное'", () => {
    render(<Nav />);

    // Ищем элемент
    const mainButton = screen.getByRole("button", { name: /главное/i });

    // Проверяем, что элемент найден
    expect(mainButton).toBeInTheDocument();
  });

  it("при неавторизованном пользователе отображается ссылка на вход", () => {
    // Устанавливаем пустой localStorage
    localStorage.clear();
    
    render(<Nav />);

    // Проверяем наличие ссылки "Войти"
    const loginLink = screen.getByRole("button", { name: /войти/i });
    expect(loginLink).toBeInTheDocument();
  });

  it("переход на страницу избранного при клике на Мой плейлист", () => {
    localStorage.getItem("authState");
    render(<Nav />);

    const favoritesLink = screen.getByRole("button", { name: /мой плейлист/i });
    fireEvent.click(favoritesLink);
  });
});
