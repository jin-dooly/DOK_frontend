import { createSlice } from '@reduxjs/toolkit';
import { CertificationPostType, DogType, MatchingPostType } from '@types';

interface initialStateType {
  matchingPostCount: number;
  dogs: DogType[];
  matchingPosts: MatchingPostType[];
  certificationPosts: CertificationPostType[];
}

const initialState: initialStateType = {
  matchingPostCount: 0,
  dogs: [],
  matchingPosts: [],
  certificationPosts: [],
};

const mainSlice = createSlice({
  name: 'main', //이름
  initialState, //초기값
  reducers: {
    setMainMatchingPostCount: (state, action) => {
      state.matchingPostCount = action.payload;
    },
    setMainDogs: (state, action) => {
      state.dogs = action.payload;
    },
    setMainMatchingPosts: (state, action) => {
      state.matchingPosts = action.payload;
    },
    setMainCertificationPosts: (state, action) => {
      state.certificationPosts = action.payload;
    },
  },
});

export const { setMainDogs, setMainMatchingPosts, setMainCertificationPosts, setMainMatchingPostCount } = mainSlice.actions;
export default mainSlice;
