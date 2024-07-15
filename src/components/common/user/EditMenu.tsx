import { useState } from 'react';
import { MoreVert } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setMatchingPostEditId, setOpenDeleteAlert, setOpenEditAlert, AppDispatch } from 'store/index';
import { matchingPostDetailUrl } from 'api/apiUrls';
import { useNavigate } from 'react-router-dom';
import { MatchingPostType } from 'src/types';
import { IconBox } from './EditMenu.styled';

interface EditMenuProps {
  post: MatchingPostType;
  size?: 'small';
}

export function EditMenu({ post, size }: EditMenuProps) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleClickEditIcon = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(setMatchingPostEditId(post._id));
  };

  // 메뉴 오픈
  const handleOpen = (e: React.MouseEvent) => {
    setOpen(true);
  };

  // 메뉴 닫기
  const handleClose = (e: React.MouseEvent) => {
    setOpen(false);
  };

  // 수정하기 버튼 클릭
  const handleClickEditButton = async () => {
    // 해당 글에 핸들러 지원자가 있는지 확인
    try {
      const res = await fetch(`${matchingPostDetailUrl}/handler/${post._id}`, { credentials: 'include' });

      if (res.ok) {
        const data = await res.json();
        if (data.length) {
          // 지원자가 있다면 수정 불가 경고창 띄우기
          return dispatch(setOpenEditAlert(true));
        }
        navigate(`/matching/write/${post._id}`, { state: { post } });
      } else {
        console.log(res.status);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  // 삭제하기 버튼 클릭
  const handleClickRemoveButton = async () => {
    dispatch(setOpenDeleteAlert(true));
    dispatch(setMatchingPostEditId(post._id));
  };

  return (
    <IconBox className={size && 'small'} onClick={handleClickEditIcon} onMouseLeave={handleClose}>
      <MoreVert className="icon pointer" onClick={handleOpen} />
      {open && (
        <ul className="menu pointer">
          <li onClick={handleClickEditButton}>수정하기</li>
          {handleClickRemoveButton && <li onClick={handleClickRemoveButton}>삭제하기</li>}
        </ul>
      )}
    </IconBox>
  );
}
