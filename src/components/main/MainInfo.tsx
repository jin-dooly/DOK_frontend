import { useEffect, useState } from 'react';
import mainTopImage from '/svg/main_header_image.svg';
import logoImage from '/dok_logo.png';
import { Pets, KeyboardArrowRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Contents, LeftBox, MainTopImage, Section } from './MainInfo.styled';

const easeOutExpo = (t: number) => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function MainInfo() {
  const { matchingPostCount } = useSelector((state: RootState) => state.main);
  const [count, setCount] = useState<number>(0);
  const frameRate: number = 1000 / 60;
  const totalFrame: number = Math.round(2000 / frameRate);

  useEffect(() => {
    if (matchingPostCount) {
      let currentNumber = 0;
      const counter = setInterval(() => {
        const progressRate = easeOutExpo(++currentNumber / totalFrame);
        setCount(Math.round(matchingPostCount * progressRate));

        // 진행 완료시 interval 해제
        if (progressRate === 1) {
          clearInterval(counter);
        }
      }, frameRate);
    }
  }, [matchingPostCount]);

  return (
    <Section>
      <MainTopImage>
        <img src={mainTopImage} />
      </MainTopImage>
      <Contents>
        <LeftBox>
          <div>
            강아지 산책 핸들러 매칭 전문 사이트, <span className="color-sub">도크</span>
          </div>
          <div>
            지금 내 반려동물과 산책할
            <br />
            파트너를 만나보세요
          </div>
          <div>
            <div className="color-sub">{count}</div>
            <div>현재 매칭 신청 수</div>
          </div>
          <div>
            <Link to={'/matching'} className="link">
              <button className="pointer">
                <Pets className="pet" />
                <span>핸들러 구하러 가기</span>
                <KeyboardArrowRight />
              </button>
            </Link>
            <Link to={'/certification'} className="link">
              <button className="pointer">
                <Pets className="pet" />
                <span>산책 인증 보러 가기</span>
                <KeyboardArrowRight />
              </button>
            </Link>
          </div>
        </LeftBox>
        <img src={logoImage} />
      </Contents>
    </Section>
  );
}
