
import { getTokens, getUser, updateToken } from "@/api/auth";
import { regType, signupUser } from "@/api/reg";
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";

type AuthStateType =  {
  authState: boolean ;
  email: string ;
  password: string ;
  confirmPassword: string;
  errorMessage: string | undefined;
  tokens: TokensType;
  username: string;
}

type TokensType = {
  access: string;
  refresh: string;
}

const initialState: AuthStateType = {
  authState: false,
  email: '',
  password: '',
  confirmPassword: '',
  errorMessage: '',  
  tokens: {
    access: '',
    refresh: '',
  },
  username: '',
};

// создание асинхроннго танка 
export const newUser = createAsyncThunk(
   "User/register",
   async ({ email, password}:regType) => {
    return await signupUser({ email, password });
      
   }
 )

 export const loginUser = createAsyncThunk(
   "User/Login",
   async ({ email, password}:regType) => {  
    return await getUser({ email, password });
   }
 )

 export const tokenUser = createAsyncThunk(
   "User/Token",
   async ({ email, password}:regType) => {
     
     return await getTokens({ email, password });
   }
 )

 export const updateTokenUser = createAsyncThunk(
  'user/token/update',
  async (refresh: string) => {
    return await updateToken(refresh);
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(newUser.fulfilled, state => {
      state.authState = true;
    });
    builder.addCase(newUser.rejected, (state, action) => {
      state.errorMessage = action.error.message;
    });
    builder.addCase(tokenUser.fulfilled, (state, action: PayloadAction<TokensType>) => {
      state.tokens.access = action.payload.access;
      state.tokens.refresh = action.payload.refresh;
      localStorage.setItem('access', state.tokens.access);
      localStorage.setItem('refresh', state.tokens.refresh);
    });
    builder.addCase(loginUser.fulfilled, (state, action:PayloadAction<AuthStateType>) => {
      state.authState = true
      state.username = action.payload.username
      state.email = action.payload.email;
      localStorage.setItem('username', state.username ?? '');
      localStorage.setItem('email', action.payload.email);
      localStorage.setItem('authState', String(state.authState));
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.errorMessage = action.error.message;
    });
    builder.addCase(
      updateTokenUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.authState = true;
        state.tokens.access = action.payload;
        localStorage.setItem('access', action.payload);
      }
    );
  },
});




export const { setAuthState } = authSlice.actions;
export const authReducer = authSlice.reducer;