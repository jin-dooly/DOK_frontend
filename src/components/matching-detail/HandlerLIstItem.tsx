import { RequestHandlerType } from 'src/types';
import { useDispatch } from 'react-redux';
import { AppDispatch, setSelectedHandler } from '@store/index';
import userImage from '/svg/user_image1.svg';
import { ItemContainer, ItemLayout, UserImg, UserInfo } from './HandlerListItem.style';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface type {
  handler: RequestHandlerType;
}

export function HandlerListItem({ handler }: type) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { nickname, _id: id, profileImg } = handler.user;

  //핸들러 선택 시 해당 핸들러 정보 저장
  const handleOnClick = () => {
    dispatch(setSelectedHandler(handler));
  };

  //선택한 핸들러의 프로필로 이동
  const onClickToProfileHandler = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/profile/${id}`);
  };

  return (
    <ItemContainer onClick={handleOnClick}>
      <ItemLayout>
        <UserImg src={profileImg || userImage} className="user-img" />
        <UserInfo>
          <span>{nickname}</span>
        </UserInfo>
        <Button variant="outlined" size="small" color="subW" sx={{ minWidth: 'fit-content' }} onClick={onClickToProfileHandler}>
          프로필
        </Button>
      </ItemLayout>
    </ItemContainer>
  );
}
