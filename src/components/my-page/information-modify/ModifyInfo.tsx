import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setCheckModifyInfoIsValid, setOpenModifyInfoAlert, setOpenSuccessModifyInfoSnackbar, setOpenErrorModifyInfoAlert } from 'store/index';
import DaumPostcode from 'react-daum-postcode';
import { ChangeProfileImg } from './ChangeProfileImg';
import { ButtonMain } from 'common/button/ButtonMain';
import { userUrl } from 'api/apiUrls';
import { AddressLayout, ButtonContainer, ModifyInfoContainer } from './ModifyInfo.style';
import { Box, Button, TextField, Modal } from '@mui/material';

export function ModifyInfo() {
  const dispatch = useDispatch<AppDispatch>();
  const { user, selectedImg, checkModifyInfoIsValid } = useSelector((state: RootState) => state.user);
  const [isOpenSearchAddress, setIsOpenSearchAddress] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{
    id: string;
    name: string;
    nickname: string;
    address: { text: string; code: string };
    phoneNumber: string;
  }>({
    id: user.userId,
    name: user.name,
    nickname: user.nickname,
    address: user.address,
    phoneNumber: `010 ${user.phoneNumber}`,
  });
  const [isValid, setIsValid] = useState<{ name: boolean; nickname: boolean; phoneNumber: boolean }>({
    name: true,
    nickname: true,
    phoneNumber: true,
  });

  const sx = {
    width: '100%',
    height: '63.91px',
    '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#000000' },
  };

  // 변경된 주소 상태 저장
  const handleSelectAddress = (data: any) => {
    setUserInfo({ ...userInfo, address: { text: data.address, code: data.bcode } });
    setIsOpenSearchAddress(false);
  };

  // 변경된 정보 상태 저장
  const handleChangeUserInfo = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    setUserInfo({ ...userInfo, [type]: e.target.value.trim() });
  };

  // 잘못된 입력 값 여부 확인
  const handleCheckIsValid = () => {
    if (Object.values(isValid).includes(false)) {
      dispatch(setOpenErrorModifyInfoAlert({ isOpen: true, type: 'info' }));
      dispatch(setCheckModifyInfoIsValid(false));
      return;
    }

    modifyUserInfo();
  };

  //정보 수정 요청
  const modifyUserInfo = async () => {
    try {
      const res = await fetch(`${userUrl}/myInfo`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userInfo.name,
          address: userInfo.address,
          phoneNumber: userInfo.phoneNumber.slice(4),
          nickname: userInfo.nickname,
          userImg: selectedImg,
        }),
        credentials: 'include',
      });

      dispatch(setCheckModifyInfoIsValid(false));

      if (res.ok) {
        dispatch(setOpenSuccessModifyInfoSnackbar({ isOpen: true, type: 'info' }));
        window.location.reload();
      } else {
        const data = await res.json();
        console.log(data);
      }
    } catch (err) {
      console.log('fetch error: ' + err);
      dispatch(setOpenErrorModifyInfoAlert({ isOpen: true, type: 'info' }));
    }
  };

  //이름과 닉네임 작성 여부 검사
  useEffect(() => {
    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      name: userInfo.name !== '',
      nickname: userInfo.nickname !== '',
    }));
  }, [userInfo.name, userInfo.nickname]);

  // 전화번호 유효성 검사
  useEffect(() => {
    let check = /^010 [0-9]{4} [0-9]{4}$/;

    setIsValid((prevIsValid) => ({
      ...prevIsValid,
      phoneNumber: check.test(userInfo.phoneNumber),
    }));
  }, [userInfo.phoneNumber]);

  // 비밀번호 수정 여부 alert에서 확인을 눌렀을 경우 한번 더 유효성 검사
  useEffect(() => {
    if (checkModifyInfoIsValid) {
      handleCheckIsValid();
    }
  }, [checkModifyInfoIsValid]);

  return (
    <ModifyInfoContainer>
      <ChangeProfileImg />
      <TextField label="아이디" value={userInfo.id} sx={sx} size="small" disabled />
      <TextField
        label="이름"
        defaultValue={userInfo.name}
        onChange={(e) => handleChangeUserInfo(e, 'name')}
        error={!isValid.name}
        helperText={!isValid.name && '* 이름을 작성해주세요.'}
        sx={sx}
        size="small"
      />
      <TextField
        label="닉네임"
        defaultValue={userInfo.nickname}
        onChange={(e) => handleChangeUserInfo(e, 'nickname')}
        error={!isValid.nickname}
        helperText={!isValid.nickname && '* 닉네임을 작성해주세요.'}
        sx={sx}
        size="small"
      />
      <AddressLayout>
        <TextField label="주소" value={userInfo.address.text} sx={sx} size="small" disabled />
        <Button variant="outlined" sx={{ width: '110px', height: '40px', marginLeft: '10px' }} onClick={() => setIsOpenSearchAddress(true)}>
          주소검색
        </Button>
        <Modal open={isOpenSearchAddress} onClose={() => setIsOpenSearchAddress(false)}>
          <Box
            sx={{
              position: 'absolute' as 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 700,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <DaumPostcode onComplete={handleSelectAddress} />
          </Box>
        </Modal>
      </AddressLayout>
      <TextField
        label="전화번호"
        defaultValue={userInfo.phoneNumber}
        onChange={(e) => handleChangeUserInfo(e, 'phoneNumber')}
        error={!isValid.phoneNumber}
        helperText="* 010 1234 5678과 같이 입력해주세요."
        sx={sx}
        size="small"
      />
      <ButtonContainer>
        <ButtonMain text="수정하기" fill={true} onClick={() => dispatch(setOpenModifyInfoAlert({ isOpen: true, type: 'info' }))} />
      </ButtonContainer>
    </ModifyInfoContainer>
  );
}
