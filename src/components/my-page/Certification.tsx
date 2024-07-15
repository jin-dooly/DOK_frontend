import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, addCertificationPosts, resetCertificationPosts, setCertificationPostsCount } from 'store/index';
import { Children, useEffect, useState } from 'react';
import { Loading } from 'common/state/Loading';
import { EmptyData } from 'common/state/EmptyData';
import { CertificationPostDetail } from '../certification/PostDetail';
import { ScrollToTopButton } from 'common/button/ScrollTopButton';
import { CertifiPostCard } from '../certification/PostCard';
import { CardListContainer } from '../../styles/CardListContainer.styled';
import { TopBarTitle } from 'common/list-page/TopBarTitle';
import { MainFrame, MyDialog, Section, TitleFrame } from './Certification.style';
import { myPageUrl } from 'api/apiUrls';

export const Certification = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { certificationPosts, certificationPostsCount } = useSelector((state: RootState) => state.certification);

  const [open, setOpen] = useState<boolean>(false);

  // 산책 인증 포스트 닫기
  const handleClose = () => {
    setOpen(false);
  };

  // 산책 인증 포스트 API 연동
  const addPostList = async () => {
    try {
      const res = await fetch(`${myPageUrl}/myCertificationLists`, { credentials: 'include' });
      const data = await res.json();

      if (res.ok) {
        dispatch(setCertificationPostsCount(Number(data[0])));
        dispatch(addCertificationPosts(data[1]));
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  useEffect(() => {
    dispatch(resetCertificationPosts());
    addPostList();
  }, []);

  return (
    <MainFrame>
      <TitleFrame>
        <TopBarTitle yellow={certificationPostsCount?.toString() || '0'} black="개의 산책 인증이 있습니다." />
      </TitleFrame>

      <Section>
        {!certificationPostsCount ? (
          certificationPostsCount === undefined ? (
            <Loading />
          ) : (
            <EmptyData />
          )
        ) : (
          <CardListContainer>
            {Children.toArray(certificationPosts.map((post, index) => <CertifiPostCard contents={post} onClick={() => setOpen(true)} index={index} />))}
            <MyDialog onClose={handleClose} open={open} maxWidth={false}>
              <CertificationPostDetail handleClose={handleClose} />
            </MyDialog>
          </CardListContainer>
        )}
      </Section>
      <ScrollToTopButton />
    </MainFrame>
  );
};
