import { Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { Address, Img, Name, TotalFrame, WalkInfo } from './ProfileInfo.style';

// 마이페이지 상단 User의 프로필 정보 입니다.
// User 닉네임, 주소, 회원등급, 산책평점, 산책횟수가 나타납니다.
export const MypageProfileInfo = () => {
  const { mypageUser, mypageRating } = useSelector((state: RootState) => state.mypageUser);

  return (
    <TotalFrame>
      <Img>
        <img className="mypageprofileImg user-img" src={mypageUser.profileImg || '/svg/user_image1.svg'} />
      </Img>
      <div>
        <Name>
          <div>{mypageUser.nickname}</div>
        </Name>
        {mypageUser.address && (
          <Address>
            {mypageUser.address?.text.split(' ')[0]} {mypageUser.address?.text.split(' ')[1]}
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
