import React, { Children } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { MatchingCard } from '../matching/Card';
import { useNavigate } from 'react-router-dom';
import { Contents, InnerBox, Section, Title } from './MainSection2.styled';

export function MainSection2() {
  const { matchingPosts } = useSelector((state: RootState) => state.main);
  const nav = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    nav('/matching');
  };

  return (
    <Section>
      <InnerBox>
        <Title>
          <h2 className="pointer" onClick={handleClick}>
            오늘의 매칭 글
          </h2>
          <div onClick={handleClick} className="send-text pointer">
            자세히 보러가기
          </div>
        </Title>
        <Contents>{Children.toArray(matchingPosts.map((data) => <MatchingCard post={data} />))}</Contents>
      </InnerBox>
      <img src={`https://capsule-render.vercel.app/api?type=waving&color=FCD11E&height=${window.innerWidth}&section=footer`} />
    </Section>
  );
}
