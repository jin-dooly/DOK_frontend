import { CommentInput } from './CommentInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setMatchingComments } from 'store/index';
import { Children, useEffect } from 'react';
import { CommentContainer } from './CommentContainer';
import { matchingPostDetailUrl } from 'api/apiUrls';
import { CommentLayout, NoCommentContainer } from './CommentList.style';

export function CommentList() {
  const dispatch = useDispatch<AppDispatch>();
  const { matchingComments, matchingDetailPost } = useSelector((state: RootState) => state.matching);

  //매칭글의 해당 댓글 목록 가져오기
  useEffect(() => {
    const getMatchingComment = async () => {
      try {
        const res = await fetch(`${matchingPostDetailUrl}/comment/${matchingDetailPost?._id}`);
        const data = await res.json();
        if (res.ok) {
          dispatch(setMatchingComments(data.reverse()));
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log('fetch error: ' + err);
      }
    };

    getMatchingComment();
  }, []);

  return (
    <CommentLayout>
      <CommentInput />
      {matchingComments.length !== 0 ? (
        Children.toArray(matchingComments.filter((comment) => comment.parentCommentId === null).map((comment) => <CommentContainer comment={comment} />))
      ) : (
        <NoCommentContainer>댓글이 없습니다.</NoCommentContainer>
      )}
    </CommentLayout>
  );
}
