// Базовый URL
const DEFAULT_URL = 'https://webdev-music-003b5b991590.herokuapp.com';



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
  }
);
};

// Просмотреть избранное GET *
// export const favorites = "/catalog/track/favorite/all/";
export const favorites = async () => {
  const token = localStorage.getItem('access')

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
  }
);
};











// Получить трек по id GET
export const getTrackForId = "/catalog/track/<id>/";


// Добавить трек в избранное по id POST *
export const addFavoritesForId = "/catalog/track/favorite/all/";

// Удалить трек из избранного по id DELETE *
export const dellFavoritesForId = "/catalog/track/<id>/favorite/";

// Создать подборкy POST *
export const addSelection = "/catalog/selection";

// Просмотреть подборки GET
export const viewSelection = "/catalog/selection/all";

// Просмотреть подборку по id
export const viewSelectionForId = "/catalog/selection/<id>/";

// Запросы отмеченные * требуют авторизацию.
