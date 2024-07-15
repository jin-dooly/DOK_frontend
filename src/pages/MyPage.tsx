import { useEffect, useState } from 'react';
import { ProfileInfo } from '../components/my-page/ProfileInfo';
import { Navbar } from '../components/my-page/Navbar';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { Forbidden } from 'common/state/Forbidden';

export function MyPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const [isUser, setIsUser] = useState<boolean>(true);

  // 유저 아이디가 있을때만(유저 로그인시에만) 컴포넌트 호출하기 위해 작성
  useEffect(() => {
    if (user._id === '') {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, [user]);

  return isUser ? (
    <>
      <ProfileInfo />
      <Navbar />
    </>
  ) : (
    <Forbidden />
  );
}
