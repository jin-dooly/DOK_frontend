import { ListPageTopBar } from '../components/common/list-page/ListPageTopBar';
import { CertifiBanner } from '../components/certification/Banner';
import { Children, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, addCertificationPosts, resetCertificationPosts, setCertificationPostsCount, setFilter } from 'store/index';
import { CertifiPostCard } from '../components/certification/PostCard';
import { CertificationPostDetail } from '../components/certification/PostDetail';
import { CardListContainer } from '../styles/CardListContainer.styled';
import { ScrollToTopButton } from 'common/button/ScrollTopButton';
import { useInView } from 'react-intersection-observer';
import { Loading } from 'common/state/Loading';
import { EmptyData } from 'common/state/EmptyData';
import { certificationUrl } from 'api/apiUrls';
import dayjs from 'dayjs';
import { CertificationList, MyDialog, Section } from './CertificationList.styled';

export function CertificationListPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { certificationPosts, certificationPostsCount } = useSelector((state: RootState) => state.certification);
  const { filter } = useSelector((state: RootState) => state.filter);

  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [scrollRef, inView] = useInView({ threshold: 0.5 });

  // 디테일 모달 열기
  const handleOpen = () => {
    setOpen(true);
  };

  // 디테일 모달 닫기
  const handleClose = () => {
    setOpen(false);
  };

  // 인증 글 데이터 불러오기
  const addPostList = async () => {
    // 모든 데이터를 다 불러왔을 경우 리턴
    if (certificationPostsCount && certificationPostsCount <= certificationPosts.length) {
      return;
    }

    setLoading(true);
    const _page = certificationPosts.length ? page : 1;
    let url = `${certificationUrl}/allCertificationPost?page=${_page}&perPage=12`;

    if (filter.locationCode) {
      url += `&locationCode=${filter.locationCode}`;
    }

    if (filter.walkingTime) {
      url += `&walkingTime=${dayjs(filter.walkingTime).format('YYYY-MM-DD')}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();

      if (res.ok) {
        dispatch(setCertificationPostsCount(Number(data[0])));
        dispatch(addCertificationPosts(data[1]));
        setPage(_page + 1);
        setLoading(false);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  // 무한 스크롤 감지
  useEffect(() => {
    if (inView) {
      addPostList();
    }
  }, [filter, inView]);

  useEffect(() => {
    dispatch(resetCertificationPosts());
    dispatch(setFilter({ locationCode: '', walkingTime: '' }));
  }, []);

  return (
    <CertificationList>
      <CertifiBanner />
      <Section>
        <ListPageTopBar yellow={certificationPostsCount?.toString() || '0'} black="개의 산책 인증이 있습니다." />
        {certificationPostsCount ? (
          <CardListContainer>
            {Children.toArray(certificationPosts.map((post, index) => <CertifiPostCard contents={post} onClick={handleOpen} index={index} />))}
            <MyDialog onClose={handleClose} open={open} maxWidth={false}>
              <CertificationPostDetail handleClose={handleClose} />
            </MyDialog>
          </CardListContainer>
        ) : (
          loading || <EmptyData />
        )}
        {loading && <Loading />}
      </Section>
      <div className="scroll-ref" ref={scrollRef}></div>
      <ScrollToTopButton />
    </CertificationList>
  );
}
