import { CardContainer, Contents, Review } from './PostCard.styled';
import { AccessTime, Pets } from '@mui/icons-material';
import { ProfileInfo } from 'common/user/ProfileInfo';
import { Rating, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setCertificationDetail, setCertificationDetailIndex } from 'store/index';
import { CertificationPostType } from '../../types';
import dateTimeFormat from '../../utils/dateTimeFormat';
import notfoundimg from '/svg/notfoundimage.svg';

interface CertifiPostCardProps {
  contents: CertificationPostType;
  onClick: () => void;
  index: number;
}

export function CertifiPostCard({ contents, onClick, index }: CertifiPostCardProps) {
  const { user, matchingPost, postText, certificationImg, review, createdAt } = contents;
  const { user: _user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  // 상세 페이지 오픈
  const handleOpenDetail = (e: React.MouseEvent) => {
    dispatch(setCertificationDetail(contents));
    dispatch(setCertificationDetailIndex(index));
    onClick();
  };

  return (
    <CardContainer className="certifiCard pointer" onClick={handleOpenDetail}>
      <ProfileInfo _id={user._id} nickname={user.nickname} userImg={user.userImg} time={createdAt} size="small" />
      <Tooltip
        title={
          <div style={{ fontSize: '14px' }}>
            <Pets fontSize="inherit" />
            {matchingPost.userDog?.dogName || ''}
          </div>
        }
        placement="top"
        followCursor
        arrow
      >
        <img className="main-img" src={certificationImg[0] || notfoundimg} />
      </Tooltip>
      <Contents>
        <div>
          <AccessTime sx={{ fontSize: '20px' }} />
          <span>{dateTimeFormat(matchingPost.walkingDate.toString(), 'date-time')}</span>
        </div>
        <div className={`detail ${review.rating && 'review'}`}>
          {postText}
          {review.rating && (
            <Review>
              견주의 후기: <Rating value={review.rating} precision={0.5} readOnly></Rating>
            </Review>
          )}
        </div>
      </Contents>
    </CardContainer>
  );
}
