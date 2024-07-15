import { DesktopDateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setDateSelect, setErrorDateSelect } from 'store/index';
import { FormLabel } from '@mui/material';
import { Event } from '@mui/icons-material';

export function DateSelect() {
  const { dateSelect } = useSelector((state: RootState) => state.matchingForm);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (newValue: Dayjs | null) => {
    dispatch(setDateSelect(newValue?.format()));
  };

  useEffect(() => {
    dispatch(setDateSelect(dayjs().add(1, 'hour').startOf('hour').format()));
    dispatch(setErrorDateSelect(false));
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormLabel component="legend">
        <Event className="icon" />
        산책 날짜
      </FormLabel>
      <DemoContainer components={['DatePicker']} sx={{ padding: 0 }}>
        <DesktopDateTimePicker
          format="YYYY-MM-DD  h:m A"
          value={dateSelect ? dayjs(dateSelect) : null}
          minDateTime={dayjs().add(1, 'hour').startOf('hour')}
          maxDate={dayjs().add(7, 'day').endOf('day')}
          onChange={handleChange}
          slotProps={{ textField: { size: 'small' } }}
          onError={(e) => {
            if (e) return dispatch(setErrorDateSelect(true));
            dispatch(setErrorDateSelect(false));
          }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
