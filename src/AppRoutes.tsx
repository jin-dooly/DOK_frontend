import styled from 'styled-components';
import { Route, Routes } from 'react-router-dom';
import { MemberHeader } from '@components/header/Member';
import { Footer } from '@components/footer/Footer';

import {
  CertificationCreatePage,
  MatchingUpdatePage,
  CertificationListPage,
  LoginPage,
  MainPage,
  MatchingCreatePage,
  MatchingDetailPage,
  MatchingListPage,
  MyPage,
  SignUpPage,
  Profile,
} from '@pages/index';
import { useScrollTop } from '@hooks/useScrollTop';
import { NotFound } from '@common/state/NotFoundPage';
import { useLoginCheck } from '@hooks/useLoginCheck';
import { AlertControll } from '@components/matching/AlertControll';

export function AppRoutes() {
  useScrollTop();
  useLoginCheck();

  return (
    <DivForHeaderFooter>
      <MemberHeader />
      <DivForFixedHeader>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/certification" element={<CertificationListPage />} />
          <Route path="/certification/write/:id" element={<CertificationCreatePage />} />

          <Route path="/matching" element={<MatchingListPage />} />
          <Route path="/matching/:id" element={<MatchingDetailPage />} />
          <Route path="/matching/write" element={<MatchingCreatePage />} />
          <Route path="/matching/write/:id" element={<MatchingUpdatePage />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile/:id" element={<Profile />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </DivForFixedHeader>
      <Footer />
      <AlertControll />
    </DivForHeaderFooter>
  );
}

const DivForHeaderFooter = styled.div`
  min-height: 100vh;
  margin: 0 auto;
`;

const DivForFixedHeader = styled.div`
  padding-top: 80px;
  min-height: calc(100vh - 60px);
  box-sizing: border-box;
`;
