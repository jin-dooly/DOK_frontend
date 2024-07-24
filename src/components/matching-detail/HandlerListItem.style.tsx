import styled from 'styled-components';

export const ItemContainer = styled.div`
  height: 50px;
  padding: 5px;
  background-color: ${({ theme }) => theme.main4};
  box-sizing: border-box;
  &:hover {
    background: #eaeaea;
  }
`;

export const ItemLayout = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  gap: 5px;
`;

export const UserImg = styled.img`
  width: 40px;
  height: 40px;
`;

export const UserInfo = styled(ItemLayout)`
  padding: 0 5px;
  justify-content: space-between;

  > span {
    font-size: 16px;
    font-weight: 500;
  }
`;
