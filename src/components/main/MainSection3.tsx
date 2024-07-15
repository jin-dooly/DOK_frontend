import React, { Children } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { CertifiPostCard } from '../certification/PostCard';
import { useNavigate } from 'react-router-dom';
import { BackgroundBox, Contents, InnerBox, Section, Title } from './MainSection3.styled';

export function MainSection3() {
  const { certificationPosts } = useSelector((state: RootState) => state.main);
  const nav = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    nav('/certification');
  };

  return (
    <Section>
      <InnerBox>
        <Title>
          <h2 className="pointer" onClick={handleClick}>
            믿음직한 인증 글
          </h2>
          <div className="send-text pointer" onClick={handleClick}>
            자세히 보러가기
          </div>
        </Title>
        <Contents onClick={handleClick}>{Children.toArray(certificationPosts.map((data, index) => <CertifiPostCard index={index} onClick={() => {}} contents={data} />))}</Contents>
      </InnerBox>
      <img src={`https://capsule-render.vercel.app/api?type=waving&color=4194CB&height=${window.innerWidth}&section=footer`} />
      <BackgroundBox />
    </Section>
  );
}
