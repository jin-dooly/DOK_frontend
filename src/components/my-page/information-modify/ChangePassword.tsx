import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setCheckModifyInfoIsValid, setOpenErrorModifyInfoAlert, setOpenModifyInfoAlert, setOpenSuccessModifyInfoSnackbar } from 'store/index';
import { ButtonMain } from 'common/button/ButtonMain';
import TextField from '@mui/material/TextField';
import { ButtonContainer, ChangePasswordContainer } from './ChangePassword.style';
import { userUrl } from 'api/apiUrls';

export function ChangePassword() {
  const dispatch = useDispatch<AppDispatch>();
  const { checkModifyInfoIsValid } = useSelector((state: RootState) => state.user);
  const [password, setPassword] = useState<{ currentPassword: string; newPassword: string; confirmNewPassword: string }>({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [isValid, setIsValid] = useState<{ currentPassword: boolean; newPassword: boolean; confirmNewPassword: boolean }>({
    currentPassword: true,
    newPassword: true,
    confirmNewPassword: true,
  });

  const sx = {
    width: '100%',
    height: '63.91px',
    '& .MuiInputBase-input.Mui-disabled': { WebkitTextFillColor: '#000000' },
  };

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, type: string) => {
    setPassword({ ...password, [type]: e.target.value.trim() });
  };

  //입력 값 유효성 검사 후 잘못된 값이 있는지 확인
  const checkPasswordIsValid = () => {
    isCurrentPasswordValid();
    isNewPasswordValid();
    isConfirmPasswordValid();

    if (!Object.values(isValid).every((value) => value)) {
      dispatch(setOpenErrorModifyInfoAlert({ isOpen: true, type: 'password' }));
      dispatch(setCheckModifyInfoIsValid(false));
      return;
    }
    changeUserPassword();
  };

  //현재 비밀번호 유효성 검사
  const isCurrentPasswordValid = () => {
    setIsValid((prev) => ({ ...prev, currentPassword: password.currentPassword !== '' }));
  };

  //새 비밀번호 유효성 검사
  const isNewPasswordValid = () => {
    const CHECK = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[a-zA-Z\d!@#$%^&*()_+]{8,}$/;
    setIsValid((prev) => ({ ...prev, newPassword: password.newPassword !== '' && CHECK.test(password.newPassword) }));
  };

  //새 비밀번호 확인 유효성 검사
  const isConfirmPasswordValid = () => {
    setIsValid((prev) => ({ ...prev, confirmNewPassword: password.newPassword === password.confirmNewPassword }));
  };

  //비밀번호 변경 요청
  const changeUserPassword = async () => {
    try {
      const res = await fetch(`${userUrl}/myPassword`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: password.currentPassword,
          newPassword: password.newPassword,
          confirmNewPassword: password.confirmNewPassword,
        }),
        credentials: 'include',
      });

      dispatch(setCheckModifyInfoIsValid(false));

      if (res.ok) {
        dispatch(setOpenSuccessModifyInfoSnackbar({ isOpen: true, type: 'password' }));
        window.location.reload();
      } else {
        dispatch(setOpenErrorModifyInfoAlert({ isOpen: true, type: 'password' }));
      }
    } catch (err) {
      console.log('fetch error: ' + err);
      dispatch(setOpenErrorModifyInfoAlert({ isOpen: true, type: 'password' }));
    }
  };

  //새 비밀번호를 입력할 때마다 유효성 검사
  useEffect(() => {
    if (password.newPassword !== '') {
      isNewPasswordValid();
    }
  }, [password.newPassword]);

  //새 비밀번호 확인을 입력할 때마다 유효성 검사
  useEffect(() => {
    if (password.newPassword !== '' && password.confirmNewPassword !== '') {
      isConfirmPasswordValid();
    }
  }, [password.confirmNewPassword]);

  //비밀번호 변경 여부 alert에서 확인을 누르면 한 번 더 유효성 검사
  useEffect(() => {
    if (checkModifyInfoIsValid) {
      checkPasswordIsValid();
    }
  }, [checkModifyInfoIsValid]);

  return (
    <ChangePasswordContainer>
      <TextField label="현재 비밀번호" onChange={(e) => handleChangePassword(e, 'currentPassword')} error={!isValid.currentPassword} type="password" sx={sx} size="small" />
      <TextField
        label="새 비밀번호"
        onChange={(e) => handleChangePassword(e, 'newPassword')}
        error={!isValid.newPassword}
        type="password"
        helperText="* 영문 대소문자, 숫자, 특수 문자를 조합하여 8자 이상으로 구성해주세요."
        sx={sx}
        size="small"
      />
      <TextField
        label="새 비밀번호 확인"
        onChange={(e) => handleChangePassword(e, 'confirmNewPassword')}
        error={!isValid.confirmNewPassword}
        type="password"
        sx={sx}
        size="small"
      />
      <ButtonContainer>
        <ButtonMain text="변경하기" fill={true} onClick={() => dispatch(setOpenModifyInfoAlert({ isOpen: true, type: 'password' }))} />
      </ButtonContainer>
    </ChangePasswordContainer>
  );
}
