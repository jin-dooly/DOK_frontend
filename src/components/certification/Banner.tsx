import BannerImage from '/svg/walking_dog.svg';
import { ListPageBanner } from 'common/list-page/ListPageBanner';
import { Image } from './Banner.style.tsx';

export function CertifiBanner() {
  const desc = '이웃 주민들과 가깝고 따뜻한 교류를 경험해보세요\n우리 아이의 산책이 어땠는지 직접 확인해 보세요!';

  return (
    <ListPageBanner title={'산책 인증'} desc={desc} color="sub3">
      <Image src={BannerImage} />
    </ListPageBanner>
  );
}
