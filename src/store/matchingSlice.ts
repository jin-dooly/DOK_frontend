import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MatchingBookmarkType, MatchingPostType } from '@types';
import { RequestHandlerType } from '@types';
import { MatchingCommentType } from '@types';

type matchingType = {
  matchingPosts: MatchingPostType[];
  matchingPostsCount: number | undefined;
  matchingDetailPost: MatchingPostType | null;
  requestHandlers: RequestHandlerType[];
  selectedHandler: RequestHandlerType | null;
  matchingComments: MatchingCommentType[];
  matchingPostEditId: string;
  isOpenCommentInput: { [key: string]: boolean };
  matchingBookmark: MatchingBookmarkType[];
};

const initialState: matchingType = {
  matchingPosts: [],
  matchingPostsCount: undefined,
  matchingDetailPost: null,
  requestHandlers: [],
  selectedHandler: null,
  matchingComments: [],
  matchingPostEditId: '',
  isOpenCommentInput: {},
  matchingBookmark: [],
};

const matchingSlice = createSlice({
  name: 'matching',
  initialState,
  reducers: {
    resetMatchingPosts: (state) => {
      state.matchingPosts = [];
    },
    addMatchingPosts: (state, action: PayloadAction<MatchingPostType[]>) => {
      state.matchingPosts.push(...action.payload);
    },
    setMatchingPostCount: (state, action: PayloadAction<number | undefined>) => {
      state.matchingPostsCount = action.payload;
    },
    setMatchingDetailPost: (state, action: PayloadAction<MatchingPostType>) => {
      state.matchingDetailPost = action.payload;
    },
    setRequestHandlers: (state, action: PayloadAction<RequestHandlerType[]>) => {
      state.requestHandlers = action.payload;
    },
    setSelectedHandler: (state, action: PayloadAction<RequestHandlerType | null>) => {
      state.selectedHandler = action.payload;
    },
    updateMatchingStatus: (state, action: PayloadAction<string>) => {
      const post = state.matchingPosts.find((post) => post._id === action.payload);
      post && (post.matchingStatus = 'completed');
    },
    setMatchingComments: (state, action: PayloadAction<MatchingCommentType[]>) => {
      state.matchingComments = action.payload;
    },
    addMatchingComment: (state, action: PayloadAction<MatchingCommentType>) => {
      state.matchingComments.unshift(action.payload);
    },
    deleteMatchingComment: (state, action: PayloadAction<string>) => {
      state.matchingComments = state.matchingComments.filter((comment) => comment._id !== action.payload);
    },
    setMatchingPostEditId: (state, action: PayloadAction<string>) => {
      state.matchingPostEditId = action.payload;
    },
    updateMatchingComment: (state, action: PayloadAction<{ commentId: string | undefined; commentData: MatchingCommentType }>) => {
      const { commentId, commentData } = action.payload;
      const commentIdx = state.matchingComments.findIndex((comment) => comment._id === commentId);
      state.matchingComments.splice(commentIdx, 1, commentData);
    },
    setIsOpenCommentInput: (state, action: PayloadAction<string>) => {
      state.isOpenCommentInput[action.payload] = false;
    },
    toggleIsOpenCommentInput: (state, action: PayloadAction<string>) => {
      state.isOpenCommentInput[action.payload] = !state.isOpenCommentInput[action.payload];
    },
    deleteIsOpenCommentInput: (state, action: PayloadAction<string>) => {
      delete state.isOpenCommentInput[action.payload];
    },
    setMatchingBookmark: (state, action: PayloadAction<MatchingBookmarkType[]>) => {
      state.matchingBookmark = action.payload;
    },
  },
});

export const {
  resetMatchingPosts,
  setMatchingPostCount,
  addMatchingPosts,
  setMatchingDetailPost,
  setRequestHandlers,
  setSelectedHandler,
  setMatchingComments,
  addMatchingComment,
  updateMatchingStatus,
  deleteMatchingComment,
  setMatchingPostEditId,
  updateMatchingComment,
  setIsOpenCommentInput,
  toggleIsOpenCommentInput,
  deleteIsOpenCommentInput,
  setMatchingBookmark,
} = matchingSlice.actions;
export default matchingSlice;
