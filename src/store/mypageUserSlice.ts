import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MypageDogType, MypageRatingType, MypageUserType, initMypageUserType } from '@types';

interface MypageUserSliceType {
  mypageUser: MypageUserType;
  mypageDog: MypageDogType[];
  mypageSelectedImg: string | '';
  mypageRating: MypageRatingType[];
}

const initialState: MypageUserSliceType = {
  mypageUser: initMypageUserType,
  mypageDog: [],
  mypageSelectedImg: '',
  mypageRating: [],
};

const mypageUser = createSlice({
  name: 'mypageUser', //이름
  initialState, //초기값
  reducers: {
    setMypageUser: (state, action: PayloadAction<MypageUserType>) => {
      state.mypageUser = action.payload;
    },
    setMypageDog: (state, action: PayloadAction<MypageDogType[]>) => {
      state.mypageDog = action.payload;
    },
    setMypageSelectedImg: (state, action) => {
      state.mypageSelectedImg = action.payload;
    },
    setMypageRating: (state, action: PayloadAction<MypageRatingType[]>) => {
      state.mypageRating = action.payload;
    },
  },
});

export const { setMypageUser, setMypageDog, setMypageSelectedImg, setMypageRating } = mypageUser.actions;
export default mypageUser;
