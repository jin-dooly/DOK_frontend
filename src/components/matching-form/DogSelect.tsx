import { FormControl, FormLabel, InputAdornment, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import dog from '/svg/dog_default.svg';
import { Children, useEffect, useState } from 'react';
import { AppDispatch, RootState, setDogSelect, setErrorDogSelect } from 'store/index';
import { useDispatch, useSelector } from 'react-redux';
import { DogType } from '../../types';
import { Pets } from '@mui/icons-material';
import { userUrl } from 'api/apiUrls';

export function DogSelect({ isUpdate }: { isUpdate?: boolean }) {
  const { dogSelect, errorDogSelect } = useSelector((state: RootState) => state.matchingForm);
  const dispatch = useDispatch<AppDispatch>();
  const [dogs, setDogs] = useState<DogType[]>();

  const handleChange = (e: SelectChangeEvent) => {
    const selected = dogs?.filter(({ dogName }) => dogName === e.target.value)[0];
    if (!selected) {
      dispatch(setErrorDogSelect(true));
      return;
    }

    dispatch(setDogSelect(selected));
    dispatch(setErrorDogSelect(false));
  };

  // 로그인 한 유저의 강아지 정보 가져오기
  const getUserDog = async () => {
    try {
      const res = await fetch(`${userUrl}/myDog`, { credentials: 'include' });
      const data = await res.json();

      if (res.ok) {
        setDogs(data);
      } else {
        console.log(data);
      }
    } catch (e) {
      console.log('fetch error: ', e);
    }
  };

  useEffect(() => {
    getUserDog();

    // 수정 페이지일 때
    if (isUpdate) {
      dispatch(setErrorDogSelect(false));
      return;
    }

    dispatch(setDogSelect(undefined));
    dispatch(setErrorDogSelect(true));
  }, []);

  return (
    <FormControl sx={{ minWidth: 120 }} fullWidth>
      <FormLabel component="legend">
        <Pets className="icon" />
        강아지
      </FormLabel>
      <Select
        startAdornment={
          <InputAdornment position="start">
            <img src={dogSelect?.dogImg || dog} style={{ height: '2em', aspectRatio: ' 1 / 1', objectFit: 'cover' }} />
          </InputAdornment>
        }
        id="demo-select-small"
        value={dogSelect?.dogName || 'temp'}
        onChange={handleChange}
        error={errorDogSelect && !dogSelect === undefined}
      >
        <MenuItem disabled value="temp" sx={{ display: 'none' }}>
          <em style={{ color: '#bcbcbc' }}>강아지를 선택해주세요.</em>
        </MenuItem>

        {Children.toArray(dogs?.map(({ dogName }) => [<MenuItem value={dogName}>{dogName}</MenuItem>]))}
      </Select>
    </FormControl>
  );
}
