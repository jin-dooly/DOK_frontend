import { styled } from 'styled-components';

export const Footer = () => {
  return (
    <>
      <MainDiv>
        <FooterText>
          주소 : 서울특별시 성동구 아차산로17길 48 성수낙낙<br></br>
          COPYRIGHT(c) 2023 DOGWALK ALL RIGHTS RESERVED.
        </FooterText>
      </MainDiv>
    </>
  );
};

const MainDiv = styled.div`
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;

  margin-top: 100px;
  background-color: #fffefa;
  flex-shrink: 0;

  height: 100px;
  border-top: 1px #f5f5f5 solid;
`;
const FooterText = styled.div`
  /* position: relative;     */
  margin-bottom: 0.5%;
  bottom: 0;
  color: gray;
  font-size: small;
`;
