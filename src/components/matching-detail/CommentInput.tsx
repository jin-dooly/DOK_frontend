import { InputLayout, UserImg } from './CommentInput.style';
import userImage from '/svg/user_image1.svg';
import { Input, IconButton } from '@mui/material';
import { Send } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setOpenAlertLogin, addMatchingComment, updateMatchingComment } from 'store/index';
import { useState } from 'react';
import { matchingPostDetailUrl } from 'api/apiUrls';
import { AlertLogin } from 'common/alert/AlertLogin';

interface CommentProps {
  commentType?: 'reply';
  parentCommentId?: string;
  editText?: string;
  commentId?: string;
}

export function CommentInput({ commentType, parentCommentId, editText, commentId }: CommentProps) {
  const { matchingDetailPost } = useSelector((state: RootState) => state.matching);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [text, setText] = useState<string>(editText || '');
  const isLogined: boolean = user._id !== '';

  const handleOnClick = () => {
    addComment();
  };

  //화살표 버튼 외에도 enter키를 눌렀을 때
  const handleOnKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addComment();
    }
  };

  //댓글 추가 (비로그인이거나 글이 없는 경우 추가 X)
  const addComment = async () => {
    if (!isLogined) {
      dispatch(setOpenAlertLogin(true));
      return;
    }

    if (text === '') {
      return;
    }

    if (!editText) {
      try {
        const res = await fetch(`${matchingPostDetailUrl}/comment`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify({
            matchingPostId: matchingDetailPost?._id,
            user: user._id,
            comment: text,
            parentCommentId: parentCommentId || null,
          }),
        });
        const data = await res.json();

        if (res.ok) {
          dispatch(addMatchingComment({ ...data, user }));
          setText('');
        }
      } catch (err) {
        console.log('fetch error:' + err);
      }
    } else {
      try {
        const res = await fetch(`${matchingPostDetailUrl}/comment/${commentId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            comment: text,
          }),
        });
        const data = await res.json();

        if (res.ok) {
          dispatch(updateMatchingComment({ commentId, commentData: { ...data, user } }));
        }
      } catch (err) {
        console.log('fetch error:' + err);
      }
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <InputLayout>
      <AlertLogin isBack={false} />
      <UserImg src={user.userImg || userImage} className={`user-img ${commentType}`} />
      <Input
        placeholder="댓글 추가"
        value={text}
        sx={{ width: '100%' }}
        autoFocus={Boolean(editText)}
        onChange={handleOnChange}
        onKeyDown={(e) => handleOnKeyDown(e)}
        disabled={matchingDetailPost?.matchingStatus !== 'process'}
      />
      <IconButton size="small" onClick={handleOnClick}>
        <Send sx={{ transform: 'rotate(-15deg)' }} />
      </IconButton>
    </InputLayout>
  );
}
