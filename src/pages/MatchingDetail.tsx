import { DogProfile } from '../components/matching-detail/DogProfile';
import { WalkDetailInfo } from '../components/matching-detail/WalkDetailInfo';
import { CommentList } from '../components/matching-detail/CommentList';
import { StatusBanner } from '../components/matching-detail/StatusBanner';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setMatchingDetailPost, setSelectedHandler } from 'store/index';
import { matchingPostDetailUrl } from 'api/apiUrls';
import { LoadingPage } from 'common/state/LoadingPage';
import { NotFound } from 'common/state/NotFoundPage';
import { ContentBox, MatchingDetailLayout, WalkContainer } from './MatchingDetail.style';

export function MatchingDetailPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { matchingDetailPost } = useSelector((state: RootState) => state.matching);
  const [isloading, setIsLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<'process' | 'completed' | 'failed'>('process');
  const [isNotFound, setIsNotFound] = useState<boolean>(false);
  const { id } = useParams();

  //매칭글 상세 데이터 불러오기
  useEffect(() => {
    const matchingDetailData = async () => {
      try {
        const res = await fetch(`${matchingPostDetailUrl}/${id}`);
        const data = await res.json();

        if (res.ok) {
          dispatch(setMatchingDetailPost(data[0]));
          dispatch(setSelectedHandler(null));
          setStatus(data[0].matchingStatus);
        } else {
          console.log(data);
        }
      } catch (error) {
        console.log('fetch error: ' + error);
        setIsNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };

    matchingDetailData();
  }, [matchingDetailPost?.matchingStatus]);

  return isloading ? (
    <LoadingPage />
  ) : isNotFound ? (
    <NotFound />
  ) : (
    <MatchingDetailLayout>
      <ContentBox>
        {status !== 'process' && <StatusBanner />}
        <WalkContainer>
          <DogProfile />
          <WalkDetailInfo />
        </WalkContainer>
        <CommentList />
      </ContentBox>
    </MatchingDetailLayout>
  );
}
