import styled from 'styled-components';

export const IconBox = styled.div`
  position: absolute;
  top: 8px;
  right: 10px;
  padding: 12px 10px;

  .icon {
    color: #747474;
    width: 30px;
    height: 30px;

    &:hover {
      color: ${({ theme }) => theme.sub};
    }
  }

  &.small {
    padding: 6px 0px 6px 20px;

    .icon {
      width: 24px;
      height: 24px;
    }
  }

  .menu {
    position: absolute;
    right: 0;
    width: fit-content;
    min-width: 100px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 1px 1px 4px 1px #00000039;
    padding: 4px 0;
    color: #505050;

    li {
      padding: 4px 10px;
      border-top: #f5f5f5 solid 1px;
      font-size: 16px;
    }

    li:hover {
      background-color: #e4f5fe;
      color: #000;
    }

    li:nth-child(1) {
      border: none;
    }
  }
`;
