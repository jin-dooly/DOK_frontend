import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setDurationSelect, setPaySelect } from 'store/index';
import { AccessTime } from '@mui/icons-material';
import { useEffect } from 'react';

export function DurationSelect() {
  const { durationSelect } = useSelector((state: RootState) => state.matchingForm);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const duration = Number(event.target.value);
    dispatch(setDurationSelect(duration));
    dispatch(setPaySelect(duration * 9860));
  };

  useEffect(() => {
    dispatch(setDurationSelect(0.5));
  }, []);

  return (
    <FormControl>
      <FormLabel component="legend">
        <AccessTime className="icon" />
        산책 시간
      </FormLabel>
      <RadioGroup row name="" value={durationSelect} onChange={handleChange}>
        <FormControlLabel value={0.5} control={<Radio />} label="30분" />
        <FormControlLabel value={1} control={<Radio />} label="1시간" />
        <FormControlLabel value={1.5} control={<Radio />} label="1시간 30분" />
        <FormControlLabel value={2} control={<Radio />} label="2시간" />
      </RadioGroup>
    </FormControl>
  );
}
