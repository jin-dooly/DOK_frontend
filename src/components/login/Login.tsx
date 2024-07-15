import TextField from '@mui/material/TextField';
import { ButtonMain } from 'common/button/ButtonMain';
import { ButtonSub } from 'common/button/ButtonSub';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch, setUser } from 'store/index';
import { useNavigate } from 'react-router-dom';
import { AlertSnackbar } from 'common/alert/AlertSnackbar';
import { MainFrame, SubFrame } from './Login.style';
import { userUrl } from 'api/apiUrls';

export function Login() {
  const [userId, setUserId] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [isAlertSnackbar, setIsAlertSnackbar] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  // 로그인 API 연동
  const handleLogin = async () => {
    try {
      const res = await fetch(`${userUrl}/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: userId,
          password: password,
        }),
        credentials: 'include',
      });
      const data = await res.json();

      if (res.ok) {
        dispatch(setUser(data));
        nav('/');
      } else {
        setIsAlertSnackbar(true);
        console.log(data);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  return (
    <>
      <MainFrame>
        <SubFrame>
          <p>로그인하기</p>
          <TextField label="아이디" placeholder="아이디를 작성해주세요" defaultValue={userId} onChange={(e) => setUserId(e.target.value)} sx={{ margin: '5% 0 2% 0' }} />
          <TextField
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 작성해주세요"
            defaultValue={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleLogin();
              }
            }}
            sx={{ margin: '0 0 5% 0' }}
          />
          <div>
            <ButtonMain text="로그인" onClick={handleLogin} fill={true} />
          </div>
          <div>
            <ButtonSub text="회원가입" onClick={() => nav('/signup')} fill={true} />
          </div>
        </SubFrame>
      </MainFrame>
      <AlertSnackbar title="아이디 또는 비밀번호가 올바르지 않습니다. 다시 시도해주세요." type="error" open={isAlertSnackbar} onClose={() => setIsAlertSnackbar(false)} />
    </>
  );
}
