export interface UserType {
  _id: string;
  userId: string;
  password: string;
  name: string;
  nickname: string;
  address: { text: string; code: string };
  phoneNumber: string;
  introduce: string;
  profileImg: string;
  isCertificated: boolean;
  deletedAt: null | Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  __v: number;
}

export const initUserType: UserType = {
  _id: '',
  userId: '',
  password: '',
  name: '',
  nickname: '',
  address: { text: '', code: '' },
  phoneNumber: '',
  profileImg: '',
  introduce: '',
  isCertificated: false,
  deletedAt: null,
  createdAt: '',
  updatedAt: '',
  __v: 0,
};
