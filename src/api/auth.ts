const DEFAULT_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

type segninType = {
  email: string,
  password: string;
};

// Создание асинхронного экшена для получения данных пользователя
export const getUser = async ({ email, password }: segninType) => { 
  const response = await fetch(`${DEFAULT_URL}/user/login/`, {
    method: "POST",
    body: JSON.stringify({ email, password }), 
    headers: {
      "Content-Type": "application/json", 
    },
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "Ошибка при получении данных пользователя");
  }

  return json; 
}

// получение токенов 
export const getTokens = async ({ email, password }: segninType) => {
  const response = await fetch(`${DEFAULT_URL}/user/token/`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const json = await response.json();
  
  if (!response.ok) {
    throw new Error(json.detail || "Ошибка при получении токенов");
  }
  return json;
}

// обновление токенов
export const updateToken = async (refresh: string) => {
  const response = await fetch(`${DEFAULT_URL}/user/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refresh }),
  });

  const data = await response.json();

  if (!response.ok) {
    const errorMessage = data.detail || "Ошибка при обновлении токена";
    throw new Error(errorMessage);
  }

  return data.access;
};
