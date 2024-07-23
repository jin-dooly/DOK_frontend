import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CertificationPostType, initCertificationPostType } from '@types';

interface certificationSliceType {
  certificationPosts: CertificationPostType[];
  certificationPostsCount: number | undefined;
  certificationDetailPost: CertificationPostType;
  certificationDetailPostIndex: number;
}

const initialState: certificationSliceType = {
  certificationPosts: [],
  certificationPostsCount: undefined,
  certificationDetailPost: initCertificationPostType,
  certificationDetailPostIndex: 0,
};

const certificationSlice = createSlice({
  name: 'certification', //이름
  initialState, //초기값
  reducers: {
    resetCertificationPosts: (state) => {
      state.certificationPosts = [];
    },
    addCertificationPosts: (state, action: PayloadAction<CertificationPostType[]>) => {
      state.certificationPosts.push(...action.payload);
    },
    setCertificationPostOne: (state, action: PayloadAction<{ index: number; post: CertificationPostType }>) => {
      state.certificationPosts[action.payload.index] = action.payload.post;
    },
    setCertificationDetail: (state, action: PayloadAction<CertificationPostType>) => {
      state.certificationDetailPost = action.payload;
    },
    setCertificationDetailIndex: (state, action: PayloadAction<number>) => {
      state.certificationDetailPostIndex = action.payload;
    },
    setCertificationPostsCount: (state, action: PayloadAction<number | undefined>) => {
      state.certificationPostsCount = action.payload;
    },
    setCertificationReview: (state, action: PayloadAction<{ rating: number; reviewText: string }>) => {
      state.certificationDetailPost.review = action.payload;
    },
  },
});

export const {
  resetCertificationPosts,
  addCertificationPosts,
  setCertificationPostOne,
  setCertificationDetail,
  setCertificationDetailIndex,
  setCertificationPostsCount,
  setCertificationReview,
} = certificationSlice.actions;
export default certificationSlice;
