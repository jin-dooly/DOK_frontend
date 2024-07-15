import { DateSection, Section } from './TopBarFilter.styled';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import React, { useEffect, useState } from 'react';
import { Clear } from '@mui/icons-material';
import { SearchButton } from 'common/button/SearchButton';
import beobjeongdong from 'api/beobjeongdong';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';
import { resetMatchingPosts, resetCertificationPosts, setCertificationPostsCount, setFilter, setMatchingPostCount } from 'store/index';

export function TopBarFilter() {
  const dispatch = useDispatch<AppDispatch>();
  const [districtCode, setDistrictCode] = useState<string>('');
  const [district, setDistrict] = useState<string>('');

  const [sido, setSido] = useState<keyof typeof beobjeongdong.sigugun | ''>('');
  const [sigugun, setSigugun] = useState<keyof typeof beobjeongdong.dong | '' | 'all'>('');
  const [dong, setDong] = useState<string>('');

  const [date, setDate] = useState<Dayjs | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleChangeSido = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSido(value as keyof typeof beobjeongdong.sigugun | '');
    setSigugun('all');
  };

  const handleChangeSigugun = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setSigugun(value as keyof typeof beobjeongdong.dong | '');
    setDong('all');
  };

  const handleChangeDong = (event: SelectChangeEvent) => {
    const value = event.target.value;
    setDong(value);
  };

  // 지역 선택 초기화
  const resetDistrict = () => {
    setSido('');
    setSigugun('');
    setDong('');
  };

  // 지역 선택 모달 오픈
  const handleClickOpen = () => {
    setOpen(true);
    focus();
  };

  // 지역 선택 모달 닫기
  const handleClickClose = (event: React.SyntheticEvent<unknown>) => {
    setOpen(false);
    resetDistrict();
  };

  const handleChangeDistrict = (event: React.SyntheticEvent<unknown>) => {
    const state = sido ? beobjeongdong.sido.filter(({ code }) => code === sido)[0].name : '';
    const city = sigugun ? (sigugun === 'all' ? '전체' : sido && beobjeongdong.sigugun[sido].filter(({ code }) => code === sigugun)[0].name) : '';
    const town = dong ? (dong === 'all' ? '전체' : sigugun && sigugun !== 'all' && beobjeongdong.dong[sigugun].filter(({ code }) => code === dong)[0].name) : '';
    setDistrict(sido ? `${state} ${city} ${town}` : '');
    setDistrictCode((dong !== 'all' && dong) || (sigugun !== 'all' && sigugun) || sido);
    setOpen(false);
    resetDistrict();
  };

  const handleSearchButtonClick = () => {
    const filter = { locationCode: districtCode, walkingTime: date?.format() };
    dispatch(setFilter(filter));
    dispatch(resetMatchingPosts());
    dispatch(resetCertificationPosts());
    dispatch(setMatchingPostCount(undefined));
    dispatch(setCertificationPostsCount(undefined));
  };

  useEffect(() => {
    dispatch(setFilter({ locationCode: districtCode, walkingTime: '' }));
  }, []);

  return (
    <Section>
      <TextField className="district" fullWidth id="outlined-required" label="지역 검색" onClick={handleClickOpen} value={district} InputProps={{ readOnly: true }} size="small" />
      <Dialog disableEscapeKeyDown open={open}>
        <DialogTitle>검색할 지역을 선택해주세요</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 180 }}>
              <InputLabel htmlFor="demo-dialog-native">도/시</InputLabel>
              <Select
                value={sido}
                onChange={handleChangeSido}
                input={<OutlinedInput label="시/도" id="demo-dialog-native" />}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8, //ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                      width: 200,
                    },
                  },
                }}
              >
                // 주소 배열 데이터 넣을 부분
                {beobjeongdong.sido.map(({ code, name }) => (
                  <MenuItem key={code} value={code}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">시/군/구</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={sigugun}
                onChange={handleChangeSigugun}
                input={<OutlinedInput label="시/군/구" />}
                disabled={!sido}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8, //ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                      minWidth: 200,
                    },
                  },
                }}
              >
                {sido && <MenuItem value={'all'}>전체</MenuItem>}
                {sido &&
                  beobjeongdong.sigugun[sido].map(({ code, name }) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-dialog-select-label">읍/면/동</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={dong}
                onChange={handleChangeDong}
                input={<OutlinedInput label="읍/면/동" />}
                disabled={!sigugun || sigugun === 'all'}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 48 * 4.5 + 8, //ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                      width: 200,
                    },
                  },
                }}
              >
                {sigugun && sigugun !== 'all' && <MenuItem value={'all'}>전체</MenuItem>}
                {sigugun &&
                  sigugun !== 'all' &&
                  beobjeongdong.dong[sigugun].map(({ code, name }) => (
                    <MenuItem key={code} value={code}>
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickClose}>Cancel</Button>
          <Button onClick={handleChangeDistrict}>Ok</Button>
        </DialogActions>
      </Dialog>

      <DateSection>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']} sx={{ width: '200px' }}>
            <DesktopDatePicker
              format="YYYY-MM-DD"
              label="산책일 검색"
              value={date}
              onChange={(newValue) => setDate(newValue)}
              maxDate={dayjs().add(7, 'day')}
              slotProps={{ textField: { size: 'small' } }}
            />
          </DemoContainer>
        </LocalizationProvider>
        {date && (
          <IconButton className="date-clear" onClick={() => setDate(null)}>
            <Clear />
          </IconButton>
        )}
      </DateSection>

      <SearchButton onClick={handleSearchButtonClick} />
    </Section>
  );
}
