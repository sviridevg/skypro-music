// Базовый URL
const DEFAULT_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

type idType = number;

// Получить все треки GET
export const getTracks = async () => {
  const res = await fetch(DEFAULT_URL + '/catalog/track/all/');

  if (!res.ok) {
    throw new Error("Данные с сервера не получены");
  }
  
  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    return data.data;
  });
};

// Просмотреть избранное GET *
export const favorites = async () => {
  const token = localStorage.getItem('access');
  if (!token) {
    throw new Error('Необходима авторизация');
  }

  const res = await fetch(DEFAULT_URL + '/catalog/track/favorite/all/', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Данные с сервера не получены");
  }

  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    return data.data;
  });
};

// Добавить трек в избранное по id POST *
export const addFavoritesForId = async (id: idType) => {
  const token = localStorage.getItem('access');
  if (!token) {
    throw new Error('Необходима авторизация');
  }

  const res = await fetch(DEFAULT_URL + `/catalog/track/${id}/favorite/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Данные с сервера не получены");
  }

  return res.json();
};

// Удалить трек из избранного по id DELETE *
export const dellFavoritesForId = async (id: idType) => {
  const token = localStorage.getItem('access');
  if (!token) {
    throw new Error('Необходима авторизация');
  }

  const res = await fetch(DEFAULT_URL + `/catalog/track/${id}/favorite/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Данные с сервера не получены");
  }

  return res.json();
};

// Получить трек по id GET
export const getTrackForId = async (id: idType) => {
  const res = await fetch(DEFAULT_URL + `/catalog/track/${id}/`);

  if (!res.ok) {
    throw new Error("Данные с сервера не получены");
  }

  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    return data.data;
  });
};

// Создать подборку POST *
export const addSelection = async (selectionData: any) => {
  const token = localStorage.getItem('access');
  if (!token) {
    throw new Error('Необходима авторизация');
  }

  const res = await fetch(DEFAULT_URL + "/catalog/selection", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(selectionData),
  });

  if (!res.ok) {
    throw new Error("Данные с сервера не получены");
  }

  return res.json();
};

// Просмотреть подборки GET
export const viewSelection = async () => {
  const res = await fetch(DEFAULT_URL + "/catalog/selection/all");

  if (!res.ok) {
    throw new Error("Данные с сервера не получены");
  }

  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    return data.data;
  });
};

// Просмотреть подборку по id GET
export const viewSelectionForId = async (id: idType) => {
  const res = await fetch(DEFAULT_URL + `/catalog/selection/${id}/`);

  if (!res.ok) {
    throw new Error("Данные с сервера не получены");
  }

  return res.json().then((data) => {
    if (data.error) {
      throw new Error(data.error);
    }
    return data.data;
  });
};
