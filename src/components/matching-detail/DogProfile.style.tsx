import styled from 'styled-components';

export const DogProfileContainer = styled.div`
  width: 100%;
  max-width: 460px;
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.main4};
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 1.5px 1.5px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  position: relative;

  @media screen and (min-width: 480px) and (max-width: 1023px) {
    max-width: 525px;
  }
`;

export const DogImage = styled.img`
  width: 100%;
  max-width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export const DogIcon = styled.img`
  width: 2.5em;
`;

const TextAlignLayout = styled.div`
  display: flex;
  align-items: center;

  > span {
    display: block;
    flex-shrink: 0;
    align-self: flex-start;
  }
  > p {
    padding-left: 10px;
  }
`;

export const DogNameBox = styled(TextAlignLayout)`
  padding: 5px 0;
  > p {
    font-weight: 600;
    font-size: 24px;
  }
`;

export const DogInfoListItem = styled(TextAlignLayout)`
  font-size: 16px;
  padding: 5px 0;

  > span {
    font-weight: 500;
  }
`;
