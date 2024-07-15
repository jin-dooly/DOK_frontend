import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  transition: transform 0.3s ease-in-out 0s;
  &:hover {
    transform: translate(0px, -5px);
  }
`;

export const CardContainer = styled(Link)`
  width: 100em;
  max-width: 250px;
  height: fit-content;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  margin: 0 6px 4px;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 1.5px 1.5px 6px rgba(0, 0, 0, 0.25);
  position: relative;
  box-sizing: border-box;
  transition: box-shadow 0.3s ease-in-out 0s;

  .main-img {
    width: 100%;
    max-width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
  }

  &.ended {
    background-color: #eeeeee;
  }

  @media screen and (max-width: 802px) {
    max-width: 43vw;
  }

  @media screen and (min-width: 803px) and (max-width: 1058px) {
    max-width: 29vw;
  }
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.3) 3px 3px 12px;
  }
`;

export const Contents = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding-top: 10px;

  > div {
    display: flex;
    align-items: flex-start;
    padding: 3px 0;

    > span {
      padding-left: 7px;
    }
  }

  .detail {
    box-sizing: border-box;
    width: 100%;
    height: 66px;
    padding: 4px 0;
    white-space: normal;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #6c6c6c;

    &.review {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
`;

export const Review = styled.div`
  width: 100%;
  border-top: #d9d9d9 solid 3px;
  margin-top: 8px;
  display: flex;
  align-items: center;
  padding: 6px 0;
`;
