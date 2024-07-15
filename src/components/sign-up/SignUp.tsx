import { useEffect, useState } from 'react';
import { Box, Button, TextField, FormControlLabel, Checkbox, Modal } from '@mui/material';
import { PersonInformation, TrilateralAgreement } from './Agreement';
import DaumPostcode from 'react-daum-postcode';
import { useNavigate } from 'react-router-dom';
import { userUrl } from 'api/apiUrls';
import { Agreement, ButtonDiv, LoginDiv, MainDiv } from './SignUp.style';

export function SignUp() {
  let splitPhoneValue: string = '';
  let firstPhoneValue: string = '';
  let secondPhoneValue: string = '';

  const [idCheck, setIdCheck] = useState<boolean>(false);
  const [pwdCheck, setPwdCheck] = useState<boolean>(false);
  const [pwdConfirmCheck, setPwdConfirmCheck] = useState<boolean>(false);
  const [nameCheck, setNameCheck] = useState<boolean>(false);
  const [addressCheck, setAddressCheck] = useState<boolean>(false);
  const [phoneCheck, setPhoneCheck] = useState<boolean>(false);
  const [nicknameCheck, setNicknameCheck] = useState<boolean>(false);
  const [agreeCheck, setAgreeCheck] = useState<boolean>(false);
  const [formDataCheck, setFormDataCheck] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [idValue, setIdValue] = useState<string>();
  const [pwdValue, setPwdValue] = useState<string>();
  const [pwdConfirmValue, setPwdConfirmValue] = useState<string>();
  const [nameValue, setNameValue] = useState<string>();
  const [addressValue, setAddressValue] = useState<string>();
  const [addressBCode, setAddressBCode] = useState<string>();
  const [phoneValue, setPhoneValue] = useState<string>();
  const [nicknameValue, setNicknameValue] = useState<string>();

  const [checked, setChecked] = useState<[boolean, boolean]>([true, false]);

  const nav = useNavigate();

  // 약관 동의 모두 체크 시
  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
    setAgreeCheck(!agreeCheck);
  };

  // 약관 동의 -하위 첫 번째 체크 시
  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  // 약관 동의 -하위 두 번째 체크 시
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  // 약관 동의 모두 체크 시 하위 약관들 관리를 위함
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel label={<PersonInformation />} control={<Checkbox checked={checked[0]} disabled onChange={handleChange2} />} sx={{ marginTop: '2%' }} />
      <FormControlLabel label={<TrilateralAgreement />} control={<Checkbox checked={checked[0]} disabled onChange={handleChange3} />} sx={{ marginTop: '2%' }} />
    </Box>
  );

  // 휴대폰 유효성 체크
  const phoneValidation = () => {
    let check = /^010\d{8}$/;
    return check.test(`${phoneValue}`);
  };

  // 비밀번호 유효성 체크
  const pwdValidation = () => {
    let check = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;
    return check.test(`${pwdValue}`);
  };

  // 주소 검색 API 연동
  const handleAddressSearch = () => {
    setIsOpen(true);
  };

  // 주소 API 연동 후 해당 API내에서 선택한 주소값을 가져오는 로직
  const handleSelectAddress = (data: any) => {
    setAddressBCode(data.bcode);
    setAddressValue(data.address);
    setIsOpen(false);
  };

  // 회원가입 API를 연동하는 로직
  const signUp = async () => {
    if (firstPhoneValue.length <= 0) {
      console.log('휴대전화 가입 오류');
      return;
    }
    try {
      const res = await fetch(`${userUrl}/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: idValue,
          password: pwdValue,
          name: nameValue,
          nickname: nicknameValue,
          address: {
            text: addressValue,
            code: addressBCode,
          },
          phoneNumber: firstPhoneValue + ' ' + secondPhoneValue,
          introduce: '',
          isCertificated: true,
          deletedAt: '',
        }),
      });
      const data = await res.json();
      if (res.ok) {
        nav('/login');
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  // 휴대폰 번호 나누는 로직
  // 백엔드에서 나눠서 받으므로 입력받은 데이터 나눠서 보냄
  const splitPhoneValues = () => {
    splitPhoneValue = phoneValue?.substring(3) || '00000000000';
    firstPhoneValue = splitPhoneValue?.substring(0, 4);
    secondPhoneValue = splitPhoneValue?.substring(4);
  };

  // 초기화 로직
  const initializeValue = () => {
    splitPhoneValue = '';
    firstPhoneValue = '';
    secondPhoneValue = '';
  };

  // 회원가입 API 연동 로직
  const handleCheckFormData = () => {
    splitPhoneValues();
    signUp();
    initializeValue();
  };

  // 회원가입 폼에 있는 양식중 하나라도 작성이 안되어 있다면
  // '회원가입버튼' 클릭 불가하도록 하는 로직
  useEffect(() => {
    idValue !== undefined && idValue.length >= 1 ? setIdCheck(true) : setIdCheck(false);
    pwdValue !== undefined && pwdValue.length >= 1 ? setPwdCheck(true) : setPwdCheck(false);
    pwdConfirmValue !== undefined && pwdConfirmValue.length >= 1 ? setPwdConfirmCheck(true) : setPwdConfirmCheck(false);
    nameValue !== undefined && nameValue.length >= 1 ? setNameCheck(true) : setNameCheck(false);
    addressValue !== undefined && addressValue.length >= 1 ? setAddressCheck(true) : setAddressCheck(false);
    phoneValue !== undefined && phoneValue.length >= 1 ? setPhoneCheck(true) : setPhoneCheck(false);
    nicknameValue !== undefined && nicknameValue.length >= 1 ? setNicknameCheck(true) : setNicknameCheck(false);

    idCheck && pwdCheck && pwdConfirmCheck && nameCheck && addressCheck && phoneCheck && nicknameCheck && agreeCheck ? setFormDataCheck(false) : setFormDataCheck(true);
  }, [idValue, pwdValue, pwdConfirmValue, nameValue, addressValue, phoneValue, nicknameValue, agreeCheck]);

  return (
    <MainDiv>
      <LoginDiv>
        <p>회원가입</p>

        <ButtonDiv>
          <TextField
            error={idValue !== undefined && !idCheck ? true : false}
            id="testTest"
            label="아이디"
            defaultValue={idValue}
            onChange={(event) => setIdValue(event.target.value)}
            placeholder="아이디를 작성해주세요"
            sx={{ width: '60%', margin: '10% 0 5% 0' }}
          />
        </ButtonDiv>

        <TextField
          error={pwdValue !== undefined && !pwdValidation() ? true : false}
          defaultValue={pwdValue}
          onChange={(event) => setPwdValue(event.target.value)}
          id="testTest2"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 작성해주세요"
          helperText={
            <div>
              * 비밀번호는 최소 8자 이상이어야 합니다.
              <br />* 알파벳(대,소문자 모두), 숫자, 특수 문자를 포함해야 합니다.
            </div>
          }
          sx={{ width: '60%', margin: '0 0 5% 0' }}
        />

        <TextField
          error={pwdConfirmValue !== undefined && !(pwdConfirmValue === pwdValue) ? true : false}
          defaultValue={pwdConfirmValue}
          onChange={(event) => setPwdConfirmValue(event.target.value)}
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 한 번 작성해주세요"
          helperText={pwdConfirmValue !== undefined && !(pwdConfirmValue === pwdValue) ? '입력하신 비밀번호가 다릅니다.' : ''}
          sx={{ width: '60%', margin: '0 0 5% 0' }}
        />

        <TextField
          error={nameValue !== undefined && !nameCheck ? true : false}
          defaultValue={nameValue}
          onChange={(event) => setNameValue(event.target.value)}
          id="loginID"
          label="이름"
          placeholder="이름을 작성해주세요"
          sx={{ width: '60%', margin: '0 0 5% 0' }}
        />

        <ButtonDiv>
          <TextField
            error={addressValue !== undefined && !addressCheck ? true : false}
            label={addressValue}
            onChange={(e) => setAddressValue(e.target.value)}
            disabled
            sx={{ width: '60%', margin: '0 0 5% 0' }}
          />
          <Button className="addressButton" variant="outlined" color="subB" sx={{ margin: '0% 0% 5% 2.5%' }} onClick={handleAddressSearch}>
            주소검색
          </Button>

          <Modal open={isOpen} onClose={() => setIsOpen(false)}>
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
        </ButtonDiv>

        <ButtonDiv>
          <TextField
            type="number"
            error={phoneValue !== undefined && !phoneValidation() ? true : false}
            defaultValue={phoneValue}
            onChange={(event) => setPhoneValue(event.target.value)}
            id="loginID"
            label="전화번호"
            helperText={phoneValue !== undefined && !phoneValidation() ? '올바른 전화번호를 입력해 주세요.' : ''}
            sx={{ width: '60%', margin: '0% 0 5% 0' }}
          />
        </ButtonDiv>

        <ButtonDiv>
          <TextField
            error={nicknameValue !== undefined && !nicknameCheck ? true : false}
            defaultValue={nicknameValue}
            onChange={(event) => setNicknameValue(event.target.value)}
            id="loginID"
            label="닉네임"
            placeholder="이름 대신 사용할 닉네임을 작성해주세요"
            sx={{ width: '60%', margin: '0% 0 5% 0' }}
          />
        </ButtonDiv>

        <Agreement>
          <FormControlLabel label="모두동의" control={<Checkbox checked={checked[0] && checked[1]} onChange={handleChange1} />} />
          {children}
        </Agreement>

        <Button disabled={formDataCheck} variant="contained" color="sub2B" onClick={() => handleCheckFormData()} sx={{ width: '60%', borderRadius: '50px', margin: '5% 0 5% 0' }}>
          회원가입
        </Button>
      </LoginDiv>
    </MainDiv>
  );
}
