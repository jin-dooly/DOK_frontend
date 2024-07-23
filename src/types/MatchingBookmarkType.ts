export interface MatchingBookmarkType {
  _id: string;
  userDog: {
    name: string;
  };
  walkingDate: string;
  walkingDuration: number;
  userCommentNumber: number;
}

export const initMatchingBookmarkType: MatchingBookmarkType[] = [
  {
    _id: '',
    userDog: {
      name: '',
    },
    walkingDate: '',
    walkingDuration: 0,
    userCommentNumber: 0,
  },
];
