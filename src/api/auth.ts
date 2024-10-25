import { createAsyncThunk } from "@reduxjs/toolkit";

const DEFAULT_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

type segninType = {
    email: string,
    password: string ;
}


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
      throw new Error(json.message);
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
    throw new Error(json.detail);
  }
  return json;
 }


//  export async function fetchWithAuth({url, options, refresh}) {
//   let res = await fetch(url, options);

 
//   if (res.status === 401) {
//     const newAccessToken = await refreshToken(refresh);

//     options.headers = {
//       ...options.headers,
//       Authorization: `Bearer ${newAccessToken}`,
//     };
//     res = await fetch(url, options); 
//   }


//   if (!res.ok) {
//     throw new Error(res.statusText); 
//   }

//   return res; 
// }