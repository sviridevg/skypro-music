// Регистрация пользователя 

const DEFAULT_URL = 'https://webdev-music-003b5b991590.herokuapp.com';

export type regType = {
    email: string,
    password: string;
}

  export const signupUser = async ({ email, password }: regType) => {
    const response = await fetch(`${DEFAULT_URL}/user/signup/`, {
      method: "POST",
      body: JSON.stringify({ email, password, username: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const json = await response.json();
    
    if (!response.ok) {
      throw new Error (json.message);
    }
  
    return json;
  }
