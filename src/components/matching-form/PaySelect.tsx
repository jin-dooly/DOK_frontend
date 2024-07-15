import { TextField, InputAdornment, FormLabel, FormControl } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setErrorPaySelect, setPaySelect } from 'store/index';
import { MonetizationOnOutlined } from '@mui/icons-material';

export function PaySelect() {
  const { paySelect, durationSelect, errorPaySelect } = useSelector((state: RootState) => state.matchingForm);
  const dispatch = useDispatch<AppDispatch>();

  // 선택한 시급이 최저시급 이상인지 확인
  const errorCheck = (pay: number) => {
    // 최저시급: 9860원
    if (pay < 9860 * durationSelect || Number.isNaN(pay)) {
      dispatch(setErrorPaySelect(true));
    } else {
      dispatch(setErrorPaySelect(false));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pay = parseInt(event.target.value);
    errorCheck(pay);
    dispatch(setPaySelect(pay));
  };

  useEffect(() => {
    errorCheck(paySelect);
  }, [durationSelect]);

  useEffect(() => {
    dispatch(setPaySelect(0.5 * 9860));
  }, []);

  return (
    <FormControl fullWidth>
      <FormLabel component="legend" htmlFor="pay">
        <MonetizationOnOutlined className="icon" />
        가격
      </FormLabel>
      <TextField
        name="pay"
        size="small"
        type="number"
        error={errorPaySelect && errorPaySelect !== undefined}
        id="outlined-error-helper-text"
        value={paySelect}
        onChange={handleChange}
        helperText={errorPaySelect && `*해당 시간 기준 최저 시급은 ${durationSelect * 9860}원 입니다.`}
        InputProps={{
          endAdornment: <InputAdornment position="end">원</InputAdornment>,
        }}
        inputProps={{
          step: 10,
        }}
        onBlur={() => {
          dispatch(setPaySelect(Math.floor(paySelect / 10) * 10));
        }}
      />
    </FormControl>
  );
}
