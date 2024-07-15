import { CommentInfo, CommentItemLayout, OptionButton, UserImg } from './CommentItem.style';
import userImage from '/svg/user_image1.svg';
import { CommentInput } from './CommentInput';
import { MatchingCommentType } from '../../types';
import timeDiff from '../../utils/timeDiff';
import { useEffect, useState } from 'react';
import { AlertError } from 'common/alert/AlertError';
import { matchingPostDetailUrl } from 'api/apiUrls';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, deleteIsOpenCommentInput, deleteMatchingComment, setIsOpenCommentInput, toggleIsOpenCommentInput } from 'store/index';
import { useNavigate } from 'react-router-dom';

interface type {
  comment: MatchingCommentType;
  commentType?: 'reply';
}

export function CommentItem({ comment, commentType }: type) {
  const dispatch = useDispatch<AppDispatch>();
  const { matchingDetailPost, matchingComments, isOpenCommentInput } = useSelector((state: RootState) => state.matching);
  const { user } = useSelector((state: RootState) => state.user);
  const [openErrorAlert, setOpenErrorAlert] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<boolean>(false);
  const { _id, comment: text, createdAt, user: commentUser, parentCommentId, updatedAt } = comment;
  const navigate = useNavigate();

  // 대댓글 쓰기를 클릭했을 때 해당 댓글의 대댓글 input 열기
  const handleOpenReplyInput = () => {
    dispatch(toggleIsOpenCommentInput(_id));
  };

  //해당 유저의 프로필로 이동
  const handleToProfile = () => {
    navigate(`/profile/${commentUser._id}`);
  };

  //댓글 삭제
  const handleRemove = async () => {
    try {
      const res = await fetch(`${matchingPostDetailUrl}/comment/${_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      setOpenErrorAlert(false);

      if (res.ok) {
        dispatch(deleteMatchingComment(_id));
        dispatch(deleteIsOpenCommentInput(_id));
      } else {
        console.log(data);
      }
    } catch (err) {
      console.log('fetch error: ' + err);
    }
  };

  useEffect(() => {
    setEditComment(false);
  }, [matchingComments]);

  useEffect(() => {
    if (!commentType) {
      dispatch(setIsOpenCommentInput(_id));
    }
  }, []);

  return editComment ? (
    parentCommentId ? (
      <CommentInput commentType="reply" editText={text} commentId={_id} />
    ) : (
      <CommentInput editText={text} commentId={_id} />
    )
  ) : (
    <CommentItemLayout>
      <UserImg src={commentUser.userImg || userImage} className={`pointer user-img ${commentType}`} onClick={handleToProfile} />
      <div>
        <CommentInfo>
          <span className="pointer" onClick={handleToProfile}>
            {commentUser.nickname}
          </span>
          <span>
            {timeDiff(createdAt)} {updatedAt !== createdAt && '(수정됨)'}
          </span>
        </CommentInfo>
        <p>{text}</p>
        <CommentItemLayout>
          {!commentType && matchingDetailPost?.matchingStatus === 'process' ? (
            <OptionButton id="addReply" onClick={handleOpenReplyInput}>
              댓글쓰기
            </OptionButton>
          ) : null}
          {user._id === commentUser._id && (
            <>
              <OptionButton id="commentEdit" onClick={() => setEditComment(true)}>
                수정
              </OptionButton>
              <OptionButton id="commentDelete" onClick={() => setOpenErrorAlert(true)}>
                삭제
              </OptionButton>
            </>
          )}
        </CommentItemLayout>
        {isOpenCommentInput[_id] && <CommentInput commentType="reply" parentCommentId={_id} />}
      </div>
      <AlertError title="정말 삭제하시겠습니까?" open={openErrorAlert} onClose={() => setOpenErrorAlert(false)} onClick={handleRemove} />
    </CommentItemLayout>
  );
}
