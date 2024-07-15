import styled from 'styled-components';

export const EmptyDataLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 500px;
  min-height: 100px;

  .title {
    font-size: 2em;
    font-weight: 700;
  }
`;

export const ForbiddenLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 140px);
  box-sizing: border-box;

  .error {
    font-size: larger;
  }

  .title {
    font-size: 2em;
  }
`;

export const LoadingLayout = styled.div`
  padding: 100px 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const NotFoundLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 140px);
  box-sizing: border-box;

  .error {
    font-size: larger;
  }

  .title {
    font-size: 2em;
  }
`;
