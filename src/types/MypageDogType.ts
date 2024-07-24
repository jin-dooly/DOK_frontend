import { MypageUserType, initMypageUserType } from './MypageUserType';

export interface MypageDogType {
  _id: string;
  user: MypageUserType;
  name: string;
  profileImg: string;
  birth: Date | string;
  type: string;
  gender: string;
  personality: string;
  note: string;
}

export const initMypageDogType = {
  _id: '',
  user: initMypageUserType,
  name: '',
  profileImg: '',
  birth: '',
  type: '',
  gender: '',
  personality: '',
  note: '',
};
