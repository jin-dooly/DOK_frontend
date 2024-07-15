import { DogButton } from '../my-page/DogButton';
import { RootState } from 'store/index';
import { useSelector } from 'react-redux';
import { Add, Dog, Writing } from './Introduce.style';

export const Introduce = () => {
  const { mypageUser } = useSelector((state: RootState) => state.mypageUser);

  return (
    <>
      <Writing>
        <div>{mypageUser.introduce === '' ? `${mypageUser.nickname}님의 소개글이 없습니다.` : mypageUser.introduce}</div>
      </Writing>
      <Dog>
        <p>나의 반려견을 소개합니다!</p>
        <Add>
          <DogButton />
        </Add>
      </Dog>
    </>
  );
};
