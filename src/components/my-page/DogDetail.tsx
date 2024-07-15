import { Button, TextField, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setDog } from 'store/index';
import { Link } from 'react-router-dom';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AlertError } from 'common/alert/AlertError';
import defaultImage from '/image/dogDefaultImage.png';
import { AddButton, InfoFrame, TotalFrame } from './DogDetail.style';
import { userUrl, uploadImageUrl } from 'api/apiUrls';

export const DogDetail = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [addCard, setAddCard] = useState<boolean>(true);
  const [openErrorAlert, setOpenErrorAlert] = useState<boolean>(false);
  const [imagePath, setImagePath] = useState<string>(''); // 기본 이미지 설정
  const [dogName, setDogName] = useState<string>('');
  const [dogImg, setDogImg] = useState<string>('');
  const [birth, setBirth] = useState<string>('2023/01/01');
  const [gender, setGender] = useState<string>('male');
  const [dogType, setDogType] = useState<string>('');
  const [personality, setPersonality] = useState<string>('active');
  const [note, setNote] = useState<string>('');
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const inputRef = useRef<HTMLInputElement>(null);

  // 백엔드에 데이터 보내기 전 최종 가공
  // 데이터 받는 형태로 가공
  const processingData = () => {
    if (gender === 'male' || gender === 'Male') {
      setGender('Male');
    } else if (gender === 'female' || gender === 'Female') {
      setGender('Female');
    } else if (gender === 'other' || gender === 'Other') {
      setGender('Male');
    }

    if (personality === 'active' || gender === 'Active') {
      setGender('활발');
    } else if (gender === 'sensitive' || gender === 'Sensitive') {
      setGender('예민');
    } else if (gender === 'calm' || gender === 'Calm') {
      setGender('얌전');
    }
  };

  // 실제로 API 연동하는 부분
  const addMyDog = async () => {
    try {
      const res = await fetch(`${userUrl}/myDog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user.userId,
          dogName: dogName,
          dogImg: dogImg,
          birth: birth,
          gender: gender,
          dogType: dogType,
          personality: personality,
          note: note,
        }),
        credentials: 'include',
      });
      const error = await res.json();

      if (res.status === 201) {
        try {
          const response = await fetch(`${userUrl}/myInfo`, { credentials: 'include' });
          const data = await response.json();

          if (response.status === 200) {
            dispatch(setDog(data.userDogs));
          } else {
            console.log(data);
          }
        } catch (e) {
          console.error('dog데이터 조회(fetch) 오류: ', e);
        }
      } else {
        console.log(error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 데이터 초기화
  // 하기 useEffect의 데이터 초기화랑은 다르게 사용됨.
  const initializeData = () => {
    setDogName('');
    setImagePath(defaultImage);
    setImagePath('');
    setBirth('2023/01/01');
    setGender('male');
    setDogType('');
    setPersonality('active');
    setNote('');
    setClicked(!clicked);
    setAddCard(true);
  };

  // 강아지 등록 API 연동을 위함
  const handleAddDog = () => {
    processingData();
    addMyDog();
    initializeData();
  };

  // 카드등록 취소했을 경우
  const handleCancle = () => {
    setOpenErrorAlert(true);
  };

  // 이미지 업로드 관리하는 함수
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e: ProgressEvent<FileReader>) {
        const image = e.target?.result as string;
        setImagePath(image);
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch(`${uploadImageUrl}`, {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });
        const data = await res.json();

        if (res.ok) {
          setDogImg(data[0]);
        } else {
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  // 이미지 클릭 시
  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  // 카드 등록하기 버튼은 기본적으로 클릭 안되게
  // 이미지, 강아지이름, 견종 모두 입력시에만 등록 버튼이 활성화 되어야함.
  useEffect(() => {
    !imagePath || !dogName || !dogType ? null : setAddCard(false);
  }, [imagePath, dogName, dogType]);

  // 클릭될 때 마다 카드에 입력된 데이터 초기화(취소했을 때 데이터 남아있는것 방지)
  useEffect(() => {
    setDogName('');
    setImagePath(defaultImage);
    setDogImg('');
    setBirth('2023/01/01');
    setGender('male');
    setDogType('');
    setPersonality('active');
    setNote('');
    setOpenErrorAlert(false);
  }, [clicked]);

  return (
    <>
      {clicked ? (
        <Link to={'/mypage'} />
      ) : (
        <TotalFrame>
          <div className="image">
            <input type="file" accept="image/*" onChange={(event) => handleImageUpload(event)} style={{ display: 'none' }} ref={inputRef} id="imageInput" />
            <img
              src={imagePath || defaultImage} // 기본 이미지 설정 (선택된 이미지가 없을 때 표시될 이미지)
              alt="Selected"
              className="selectedImage pointer"
              onClick={handleImageClick}
            />
          </div>
          <InfoFrame>
            <div className="name">
              <div>
                <img src="/svg/dog_default.svg" alt="강아지아이콘" style={{ marginRight: '2.5px' }} />
              </div>
              <div>
                <TextField
                  variant="standard"
                  placeholder="이름을 작성해주세요"
                  defaultValue={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': {
                      padding: '4%',
                      fontSize: '15px',
                      width: '200px',
                    },
                  }}
                />
              </div>
            </div>
            <div className="species">
              <div>견종</div>
              <div>
                <TextField
                  variant="standard"
                  placeholder="견종을 작성해주세요"
                  defaultValue={dogType}
                  onChange={(e) => setDogType(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': {
                      padding: '4%',
                      fontSize: '15px',
                      width: '200px',
                    },
                  }}
                  size="small"
                />
              </div>
            </div>
            <div className="age">
              <div>나이</div>
              <div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      onChange={(date) => setBirth(date ? date.format('YYYY-MM-DD') : '')}
                      value={dayjs('01/01/2023')}
                      sx={{
                        width: '200px',
                        '& .MuiInputBase-input': {
                          padding: '4%',
                        },
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </div>
            </div>
            <div className="gender">
              <div>성별</div>
              <div>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="male"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="male" control={<Radio />} label="남자" sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />
                    <FormControlLabel value="female" control={<Radio />} label="여자" sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />
                    <FormControlLabel value="other" control={<Radio />} label="중성" sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="character">
              <div>성격</div>
              <div>
                <FormControl>
                  <RadioGroup
                    row
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="active"
                    value={personality}
                    onChange={(e) => setPersonality(e.target.value)}
                    name="radio-buttons-group"
                  >
                    <FormControlLabel value="active" control={<Radio />} label="활발" sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />
                    <FormControlLabel value="calm" control={<Radio />} label="얌전" sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />
                    <FormControlLabel value="sensitive" control={<Radio />} label="예민" sx={{ '& .MuiSvgIcon-root': { fontSize: 10 } }} />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div className="note">
              <div>특이사항</div>
              <div>
                <TextField
                  placeholder={'특이사항을 작성해주세요.최대 45자까지 작성 가능합니다.'}
                  InputProps={{ inputProps: { maxLength: 45 } }}
                  defaultValue={note}
                  onChange={(e) => setNote(e.target.value)}
                  multiline
                  rows={2}
                  sx={{
                    overflowY: 'auto',
                    '.MuiInputBase-input': {
                      width: '220px',
                      padding: '0',
                      fontSize: '12px',
                    },
                  }}
                />
              </div>
            </div>
            <div className="button">
              <Button variant="contained" color="mainB" size="small" disabled={addCard} onClick={() => handleAddDog()}>
                등록하기
              </Button>
              <Button variant="contained" color="mainB" size="small" onClick={() => handleCancle()}>
                취소하기
              </Button>
              <AlertError title="작성중이던 내용은 저장되지 않습니다." open={openErrorAlert} onClose={() => setOpenErrorAlert(false)} onClick={() => setClicked(!clicked)} />
            </div>
          </InfoFrame>
        </TotalFrame>
      )}
      {clicked && <AddButton onClick={() => setClicked(!clicked)}>+</AddButton>}
    </>
  );
};
