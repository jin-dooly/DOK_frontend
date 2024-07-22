import { UserType, initUserType } from './UserType';

export interface DogType {
  _id: string;
  user: UserType | UserType['_id'];
  name: string;
  profileImg: string;
  birth: Date | string;
  species: string;
  gender: string;
  personality: string;
  note: string;
  deletedAt: null | Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  __v: number;
}

export const initDogType = {
  _id: '',
  user: initUserType,
  name: '',
  profileImg: '',
  birth: '',
  species: '',
  gender: '',
  personality: '',
  note: '',
  deletedAt: null,
  createdAt: '',
  updatedAt: '',
  __v: 0,
};
