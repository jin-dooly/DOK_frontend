import { LocationOn, AccessTime } from '@mui/icons-material';
import { Card, CardContainer } from '../certification/PostCard.styled';
import { MatchingPostType } from '../../types';
import { ProfileInfo } from 'common/user/ProfileInfo';
import durationTimeFormat from '../../utils/durationTimeFormat';
import dateTimeFormat from '../../utils/dateTimeFormat';
import { EditMenu } from 'common/user/EditMenu';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from 'store/index';
import { WalkInfo, DogIcon, MatchingStatusImage } from './Card.style';

interface MatchingCardProps {
  post: MatchingPostType;
}

export function MatchingCard({ post }: MatchingCardProps) {
  const { _id, user, userDog, location, walkingDate, matchingStatus, walkingDuration, createdAt } = post;
  const { user: _user } = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  //카드 선택시 각 상세 페이지로 이동
  const handleToDetail = () => {
    navigate(`/matching/${_id}`);
  };

  return (
    <CardContainer to={`/matching/${_id}`} className={`pointer ${matchingStatus !== 'process' && 'ended'}`}>
      <ProfileInfo _id={user._id} nickname={user.nickname} userImg={user.userImg} time={createdAt} size="small" />
      {_user._id === user._id && matchingStatus === 'process' && <EditMenu size="small" post={post} />}
      <img src={userDog.dogImg} className="main-img" />
      <WalkInfo>
        <div>
          <DogIcon src="/svg/card_dog_icon.svg" />
          <span>{userDog.dogName}</span>
        </div>
        <div className="location">
          <LocationOn sx={{ fontSize: '120%' }} />
          <span>{location?.text}</span>
        </div>
        <div>
          <AccessTime sx={{ fontSize: '120%' }} />
          <span>
            {dateTimeFormat(walkingDate.toString(), 'date')} | {durationTimeFormat(Number(walkingDuration))}
          </span>
        </div>
      </WalkInfo>
      {matchingStatus !== 'process' && <MatchingStatusImage src={`/svg/matching_${matchingStatus}.svg`} />}
    </CardContainer>
  );
}
