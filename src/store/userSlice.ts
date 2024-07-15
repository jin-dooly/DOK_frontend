import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DogType, UserType, initDogType, initUserType } from '../types';
import { MypageUserType } from 'src/types/MypageUserType';

interface userSliceType {
  user: UserType;
  dog: DogType[];
  mypageUser: MypageUserType[];
  selectedImg: string | '';
  checkModifyInfoIsValid: boolean;
}

const initialState: userSliceType = {
  user: initUserType,
  dog: [],
  selectedImg: '',
  mypageUser: [],
  checkModifyInfoIsValid: false,
};

const user = createSlice({
  name: 'user', //이름
  initialState, //초기값
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    setDog: (state, action: PayloadAction<DogType[]>) => {
      state.dog = action.payload;
    },
    setSelectedImg: (state, action) => {
      state.selectedImg = action.payload;
    },
    setMypageUser: (state, action: PayloadAction<MypageUserType[]>) => {
      state.mypageUser = action.payload;
    },
    setCheckModifyInfoIsValid: (state, action: PayloadAction<boolean>) => {
      state.checkModifyInfoIsValid = action.payload;
    },
  },
});

export const { setUser, setDog, setSelectedImg, setCheckModifyInfoIsValid } = user.actions;
export default user;
