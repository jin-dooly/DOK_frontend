import { useEffect, useState } from 'react';
import { MypageProfileInfo } from '../components/my-page/MypageProfileInfo';
import { Navbar } from '../components/user-my-page/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setIsLoading, setMypageDog, setMypageRating, setMypageUser } from 'store/index';
import { Forbidden } from 'common/state/Forbidden';
import { useParams } from 'react-router-dom';
import { userUrl } from 'api/apiUrls';

// 유저 마이페이지
export function Profile() {
  const [isUser, setIsUser] = useState<boolean>(true);
  const { mypageRating } = useSelector((state: RootState) => state.mypageUser);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  useEffect(() => {
    // 로그인한 회원인지 1차 체크
    user._id === '' ? setIsUser(false) : setIsUser(true);

    // 로그인 되었더라도 url로 유저id가 없는지 체크
    if (`${id}` === '') {
      setIsUser(false);
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(`${userUrl}/userInfo/${id}`, { credentials: 'include' });
          const data = await response.json();

          if (response.ok) {
            dispatch(setMypageUser(data.user));
            dispatch(setMypageDog(data.userDogs));
            dispatch(setMypageRating(data.rating));
          } else {
            console.log(data);
          }
          dispatch(setIsLoading(false));
        } catch (error) {}
      };

      fetchData();
    }
  }, [id, user._id]);

  return isUser && mypageRating !== undefined ? (
    <>
      <MypageProfileInfo />
      <Navbar />
    </>
  ) : (
    <Forbidden />
  );
}
