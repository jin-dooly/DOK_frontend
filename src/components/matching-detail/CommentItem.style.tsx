import styled from 'styled-components';

export const CommentItemLayout = styled.div`
  display: flex;
  gap: 7px;
  padding: 3px 0;

  > div {
    width: 100%;
  }
`;

export const UserImg = styled.img`
  width: 35px;
  height: 35px;

  &.reply {
    width: 28px;
    height: 28px;
  }
`;

export const CommentInfo = styled(CommentItemLayout)`
  align-items: center;
  width: fit-content;

  > span:first-of-type {
    font-weight: 600;
  }

  > span:last-of-type {
    font-size: 12px;
    color: #9d9d9d;
    flex-shrink: 0;
  }
`;

export const OptionButton = styled.button`
  border: 0;
  background: transparent;
  padding: 2px 0;
  font-size: 12px;
`;
