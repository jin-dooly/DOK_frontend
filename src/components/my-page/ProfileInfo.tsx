import { Rating } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setIsLoading, setMypageRating } from 'store/index';
import { Address, Img, Name, TotalFrame, WalkInfo } from './ProfileInfo.style';
import { useEffect } from 'react';
import { userUrl } from 'api/apiUrls';

// 마이페이지 상단 User의 프로필 정보 입니다.
// User 닉네임, 주소, 회원등급, 산책평점, 산책횟수가 나타납니다.
export const ProfileInfo = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { mypageRating } = useSelector((state: RootState) => state.mypageUser);
  const dispatch = useDispatch<AppDispatch>();

  // 산책평점이랑 횟수는 로그인 할 때 user정보에서 못가져와서
  // mypageRating API호출해서 거기서 가져옴
  // 그걸 하는 함수.
  const fetchData = async () => {
    try {
      const response = await fetch(`${userUrl}/userInfo/${user._id}`, { credentials: 'include' });
      const data = await response.json();
      console.log(data);

      if (response.ok) {
        dispatch(setMypageRating(data.rating));
      } else {
        console.log(data);
      }
      dispatch(setIsLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    console.log(user);
    fetchData();
  }, [user]);

  return (
    <TotalFrame>
      <Img>
        <img className="user-img" src={user.userImg || '/svg/user_image1.svg'} />
      </Img>
      <div>
        <Name>
          <div>{user.nickname}</div>
        </Name>
        {user.address && (
          <Address>
            {user.address?.text.split(' ')[0]} {user.address?.text.split(' ')[1]}
          </Address>
        )}
        <WalkInfo>
          <div className="member">일반회원</div>
          <div className="score">
            산책평점 <Rating value={(mypageRating[0] as unknown as number) || 0} precision={0.5} readOnly sx={{ fontSize: '16px' }} />
          </div>
          <div className="number">산책횟수 {(mypageRating[1] as unknown as number) || 0}회</div>
        </WalkInfo>
      </div>
    </TotalFrame>
  );
};
