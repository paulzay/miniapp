import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './app/store';

interface AppState {
  data: any[];
  loggedIn: boolean,
  loading: boolean,
  studentname: string,
}

const initialState: AppState = {
  data: [],
  loggedIn: false,
  loading: false,
  studentname: '',
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.studentname = action.payload;
    },
    setData: (state, action: PayloadAction<[]>) => {
      state.data = action.payload;
    },
    setLogin: (state, action: PayloadAction<boolean>) => {
      state.loggedIn = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  }
})

export const { setData } = appSlice.actions;
export const { setLogin } = appSlice.actions;
export const { setLoading } = appSlice.actions;
export const { setName } = appSlice.actions;

export const inputValue = (state: RootState) => state.app.studentname;
export const data = (state: RootState) => state.app.data;
export const loginState = (state: RootState) => state.app.loggedIn;
export const loadingState = (state: RootState) => state.app.loading;

export default appSlice.reducer