import BannerImage from '/svg/matching_banner_image.svg';
import { Button } from '@mui/material';
import { ListPageBanner } from '@common/list-page/ListPageBanner';
import { useNavigate } from 'react-router-dom';
import { RightBox } from './Banner.styled';

export function MatchingBanner() {
  const navigate = useNavigate();
  const desc = '이웃 주민들과 가깝고 따뜻한 교류를 경험해보세요\n믿을만한 전문가들이 우리 아이를 기다리고 있습니다!';

  return (
    <ListPageBanner title={'매칭 요청'} desc={desc}>
      <RightBox>
        <img className="banner-image" src={BannerImage} />
        <Button
          onClick={() => navigate('write')}
          variant="contained"
          sx={{
            backgroundColor: '#ff9d00',
            ':hover': { backgroundColor: '#ffae00' },
            width: '100%',
            height: '56px',
            borderRadius: '50px',
            fontSize: '20px',
            fontWeight: '600',
            color: 'white',
          }}
        >
          매칭 신청하기
        </Button>
      </RightBox>
    </ListPageBanner>
  );
}
