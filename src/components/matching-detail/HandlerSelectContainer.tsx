import { Children, useEffect, useState } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { HandlerListItem } from './HandlerLIstItem';
import { ButtonMain } from 'common/button/ButtonMain';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, updateMatchingStatus } from 'store/index';
import { matchingPostDetailUrl } from 'api/apiUrls';
import { AlertSnackbar } from 'common/alert/AlertSnackbar';
import { AlertSuccess } from 'common/alert/AlertSuccess';
import { ButtonContainer, HandlerListContainer, HandlerSelectLayout, SelectButtonContainer, SelectorLayout } from './HandlerSelectContainer.style';

export function HandlerSelectContainer() {
  const dispatch = useDispatch<AppDispatch>();
  const { requestHandlers, selectedHandler } = useSelector((state: RootState) => state.matching);
  const [open, setOpen] = useState<boolean>(false);
  const [openErrorAlert, setOpenErrorAlert] = useState<boolean>(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState<boolean>(false);
  const [openSuccessAlert, setOpenSuccessAlert] = useState<boolean>(false);
  const [openIsSelectedSnackber, setOpenIsSelectedSnackber] = useState<boolean>(false);
  const [isSendedMatching, setIsSendedMatching] = useState<boolean>(false);

  //핸들러 목록 토글
  const handleOpenHandlerList = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  //매칭하기 버튼 눌렀을 때
  const handleSendMatchingClick = () => {
    //선택한 핸들러가 없을 경우
    if (!selectedHandler) {
      setOpenErrorAlert(true);
      return;
    }

    //이미 핸들러 매칭 완료가 되었을 경우
    if (isSendedMatching) {
      setOpenIsSelectedSnackber(true);
      return;
    }
    setOpenSuccessAlert(true);
  };

  //핸들러 매칭 요청
  const handleOnSubmit = () => {
    const sendSelectedHandler = async () => {
      if (!selectedHandler) return;

      const { matchingPostId, user } = selectedHandler;
      try {
        const res = await fetch(`${matchingPostDetailUrl}/handler/${selectedHandler?.matchingPostId}/${user._id}`, { method: 'PUT' });

        if (res.ok) {
          setOpenSuccessSnackbar(true);
          setIsSendedMatching(true);
          dispatch(updateMatchingStatus(matchingPostId));
        } else {
          const data = await res.json();
          console.log(data);
        }
      } catch (err) {
        console.log('fetch error: ' + err);
      }
    };

    sendSelectedHandler();
  };

  //핸들러를 선택할 때마다 목록 사라짐
  useEffect(() => {
    setOpen(false);
  }, [selectedHandler]);

  return (
    <HandlerSelectLayout>
      <ClickAwayListener onClickAway={handleClickAway}>
        <SelectorLayout>
          {selectedHandler ? (
            <div onClick={handleOpenHandlerList}>
              <HandlerListItem handler={selectedHandler} />
            </div>
          ) : (
            <SelectButtonContainer onClick={handleOpenHandlerList} disabled={requestHandlers.length === 0}>
              {requestHandlers.length === 0 ? '매칭을 요청한 핸들러가 없습니다' : '핸들러를 선택해주세요.'}
            </SelectButtonContainer>
          )}
          {open ? (
            <HandlerListContainer className={`custom-scrollbar ${requestHandlers.length > 3 ? 'scroll' : null}`}>
              {Children.toArray(
                requestHandlers.map((handler) => {
                  return <HandlerListItem handler={handler} />;
                }),
              )}
            </HandlerListContainer>
          ) : null}
        </SelectorLayout>
      </ClickAwayListener>
      {requestHandlers.length !== 0 ? (
        <ButtonContainer>
          <ButtonMain text="매칭하기" onClick={handleSendMatchingClick} />
        </ButtonContainer>
      ) : null}
      <AlertSnackbar title="핸들러를 선택해주세요." open={openErrorAlert} onClose={() => setOpenErrorAlert(false)} type="error" />
      <AlertSuccess title={`${selectedHandler?.user.nickname}님과 매칭하시겠습니까?`} open={openSuccessAlert} onClick={handleOnSubmit} onClose={() => setOpenSuccessAlert(false)} />
      <AlertSnackbar title="매칭이 완료된 글입니다." open={openIsSelectedSnackber} onClose={() => setOpenIsSelectedSnackber(false)} type="error" duration={1500} />
      <AlertSnackbar title="선택한 핸들러와 매칭이 완료되었습니다." open={openSuccessSnackbar} onClose={() => setOpenSuccessSnackbar(false)} />
    </HandlerSelectLayout>
  );
}
