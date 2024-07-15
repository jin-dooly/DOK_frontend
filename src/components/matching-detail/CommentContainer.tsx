import { ReplyContainer } from './CommentContainer.style';
import { CommentItem } from './CommentItem';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { Children } from 'react';
import { MatchingCommentType } from '../../types';

interface type {
  comment: MatchingCommentType;
}

export function CommentContainer({ comment }: type) {
  const { matchingComments } = useSelector((state: RootState) => state.matching);

  return (
    <>
      <CommentItem comment={comment} />
      <ReplyContainer>
        {Children.toArray(matchingComments.filter((reply) => comment._id === reply.parentCommentId).map((reply) => <CommentItem comment={reply} commentType="reply" />))}
      </ReplyContainer>
    </>
  );
}
