import { Edit } from '@mui/icons-material';
import { IconButton, Rating } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import userImage from '/svg/user_image1.svg';
import { ReviewBox } from './Review.styled';

interface ReviewProps {
  isEditable: boolean;
  setIsEditing: (arg: boolean) => void;
}

export function Review({ isEditable, setIsEditing }: ReviewProps) {
  const { certificationDetailPost } = useSelector((state: RootState) => state.certification);
  let { matchingPost, review } = certificationDetailPost;

  // 편집 모드로 변환
  const handleEditButtonClick = () => {
    setIsEditing(true);
  };

  return (
    <ReviewBox>
      <div className="top">
        <div className="label">견주의 후기</div>
        <div className="left">
          <img src={matchingPost.user.userImg || userImage} className="user-img" />
          <div>{matchingPost.user.nickname}</div>
          <Rating readOnly={true} value={review.rating}></Rating>
        </div>
        {isEditable && (
          <div className="right">
            <IconButton size="small" onClick={handleEditButtonClick}>
              <Edit fontSize="small" />
            </IconButton>
          </div>
        )}
      </div>
      <div>{review.reviewText}</div>
    </ReviewBox>
  );
}
