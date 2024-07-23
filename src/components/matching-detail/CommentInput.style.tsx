import styled from 'styled-components';

export const InputLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding-bottom: 20px;
`;

export const UserImg = styled.img`
  width: 35px;
  height: 35px;

  &.reply {
    width: 28px;
    height: 28px;
  }
`;
