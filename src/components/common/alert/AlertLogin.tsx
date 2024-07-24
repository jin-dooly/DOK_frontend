import { Alert, AlertTitle, Backdrop, Box, Button, Snackbar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLoginCheck } from '@hooks/useLoginCheck';
import { setOpenAlertLogin } from '@store/alertSlice';
import { AppDispatch, RootState } from '@store/store';

interface AlertErrorProps {
  isBack?: boolean;
}

export function AlertLogin({ isBack }: AlertErrorProps) {
  useLoginCheck();
  const { openAlertLogin, isLoading } = useSelector((state: RootState) => state.alert);
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const nav = useNavigate();

  // 로그인 하러 가기
  const handleCheckButtonClick = () => {
    nav('/login');
    dispatch(setOpenAlertLogin(false));
  };

  // 로그인 하러 가기 취소
  const handleCancleButtonClick = () => {
    dispatch(setOpenAlertLogin(false));
    if (isBack) {
      nav(-1);
    }
  };

  return (
    <>
      {!user._id && !isLoading && (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={openAlertLogin}>
          <Snackbar open={openAlertLogin} autoHideDuration={null} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert severity="error" sx={{ minWidth: 400, '.MuiAlert-message': { flexGrow: 1 } }}>
              <div className="pre-wrap">
                <AlertTitle>로그인 하시겠습니까?</AlertTitle>
                로그인이 필요한 서비스입니다. 계정이 없는 경우 회원가입을 진행해주세요.
              </div>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button variant="contained" color="redW" onClick={handleCheckButtonClick}>
                  확인
                </Button>
                <Button variant="outlined" color="redW" onClick={handleCancleButtonClick}>
                  취소
                </Button>
              </Box>
            </Alert>
          </Snackbar>
        </Backdrop>
      )}
    </>
  );
}
