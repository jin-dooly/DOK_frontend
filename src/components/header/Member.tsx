import header_logo from '/svg/header_logo.svg';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setUser } from 'store/index';
import { initUserType } from '../../types';

import { BorderDiv, CatagoryDiv, LogOutStyledLink, MainDiv, StyledLink, SubCatagoryDiv, SubCatagoryImg } from './Member.style';
import { Link } from 'react-router-dom';
import { userUrl } from 'api/apiUrls';
import { CertificationBookmark } from './CertificationBookmark';
import { MatchingBookmark } from './MatchingBookmark';

export const MemberHeader = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const headerHover = '/svg/header_hover.svg';

  // 로그아웃 API 연동
  const handleLogOut = async () => {
    try {
      const res = await fetch(`${userUrl}/signOut`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(setUser(initUserType));
        window.location.reload();
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  return (
    <BorderDiv className="MuiAppBar-root MuiAppBar-colorPrimary MuiAppBar-positionFixed">
      <MainDiv>
        <Link to={'/'}>
          <img src={header_logo} />
        </Link>
        <CatagoryDiv>
          <div>
            <StyledLink to={'/matching'}>
              매칭
              {pathname === '/matching' ? <img src={headerHover} style={{ visibility: 'visible' }} /> : <img src={headerHover} />}
            </StyledLink>
          </div>
          <div>
            <StyledLink to={'/certification'}>
              인증
              {pathname === '/certification' ? <img src={headerHover} style={{ visibility: 'visible' }} /> : <img src={headerHover} />}
            </StyledLink>
          </div>
          {user._id && (
            <div>
              <StyledLink to={'/mypage'}>
                마이페이지
                {pathname === '/mypage' ? <img src={headerHover} style={{ visibility: 'visible' }} /> : <img src={headerHover} />}
              </StyledLink>
            </div>
          )}
        </CatagoryDiv>
        {user._id ? (
          <SubCatagoryImg>
            <MatchingBookmark />
            <CertificationBookmark />
            <StyledLink to={'/'}>
              <div onClick={handleLogOut}>로그아웃</div>
            </StyledLink>
          </SubCatagoryImg>
        ) : (
          <SubCatagoryDiv>
            <LogOutStyledLink to={'/login'}>
              <div className="login">로그인</div>
            </LogOutStyledLink>
            <LogOutStyledLink to={'/signup'}>
              <div className="logOut">회원가입</div>
            </LogOutStyledLink>
          </SubCatagoryDiv>
        )}
      </MainDiv>
    </BorderDiv>
  );
};
