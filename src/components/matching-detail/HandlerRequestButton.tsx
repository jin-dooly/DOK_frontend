import { ButtonMain } from 'common/button/ButtonMain';
import { useEffect, useState } from 'react';
import { AlertSuccess } from 'common/alert/AlertSuccess';
import { AlertLogin } from 'common/alert/AlertLogin';
import { AlertSnackbar } from 'common/alert/AlertSnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setOpenAlertLogin } from 'store/index';
import { matchingPostDetailUrl } from 'api/apiUrls';
import { ButtonContainer } from './HandlerRequestButton.style';

export function HandlerRequestButton() {
  const dispatch = useDispatch<AppDispatch>();
  const { matchingDetailPost, requestHandlers } = useSelector((state: RootState) => state.matching);
  const { user } = useSelector((state: RootState) => state.user);
  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);
  const [openRequestErrorSnackber, setOpenRequestErrorSnackber] = useState<boolean>(false);
  const [openSuccessRequestSnackbar, setOpenSuccessRequestSnackbar] = useState<boolean>(false);
  const [isRequestHandler, setIsRequestHandler] = useState<boolean>(false);
  const isLogined: boolean = user._id !== '';

  //비회원 신청 불가능, 중복 신청 불가능
  const handleOnClick = () => {
    //비회원은 불가능
    if (!isLogined) {
      dispatch(setOpenAlertLogin(true));
    } else {
      isRequestHandler ? setOpenRequestErrorSnackber(true) : setOpenSuccessAlert(true);
    }
  };

  //핸들러 신청
  const handleOnClickApply = () => {
    const sendRequestHandler = async () => {
      try {
        const res = await fetch(`${matchingPostDetailUrl}/handler/${user._id}/${matchingDetailPost?._id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          setOpenSuccessRequestSnackbar(true);
          setIsRequestHandler(true);
        } else {
          const data = await res.json();
          console.log(data);
        }
      } catch (err) {
        console.log('fetch error: ' + err);
      }
    };

    sendRequestHandler();
  };

  useEffect(() => {
    const isIncludeHandler = requestHandlers.filter((handler) => handler.user._id === user._id).length !== 0;
    setIsRequestHandler(isIncludeHandler);
  }, [requestHandlers]);

  return (
    <ButtonContainer>
      <AlertLogin isBack={false} />
      <AlertSnackbar title="이미 신청한 산책글입니다." open={openRequestErrorSnackber} onClose={() => setOpenRequestErrorSnackber(false)} type="error" duration={1500} />
      <AlertSnackbar title="핸들러 신청이 완료되었습니다." open={openSuccessRequestSnackbar} onClose={() => setOpenSuccessRequestSnackbar(false)} duration={1500} />
      <AlertSuccess title="이 산책글의 핸들러를 신청하시겠습니까?" open={openSuccessAlert} onClick={handleOnClickApply} onClose={() => setOpenSuccessAlert(false)} />
      <ButtonMain text="핸들러 신청하기" fill={true} onClick={handleOnClick} size="large" />
    </ButtonContainer>
  );
}
