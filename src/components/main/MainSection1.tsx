import { Children } from 'react';
import { MainPetBox } from './MainPetBox';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import MouseOutlinedIcon from '@mui/icons-material/MouseOutlined';
import { Section, Scroll, PetsScrollBox, TitleBox } from './MainSection1.styled';

export function MainSection1() {
  const { dogs } = useSelector((state: RootState) => state.main);

  return (
    <>
      {dogs.length >= 6 && (
        <>
          <Scroll>
            <MouseOutlinedIcon className="mouse" />
            scroll
          </Scroll>
          <Section>
            <PetsScrollBox>
              {Children.toArray(dogs.map(({ profileImg, name, gender }, idx) => <MainPetBox className={idx % 2 ? 'right' : 'left'} petData={{ profileImg, name, gender }} />))}
            </PetsScrollBox>
            <TitleBox>
              <div>
                도크와
                <br />
                함께한
                <br />
                강아지들
                <br />
                <img src="/image/maltiz_retriever.png" />
              </div>
            </TitleBox>
          </Section>
        </>
      )}
    </>
  );
}
