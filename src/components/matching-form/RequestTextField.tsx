import { FormLabel, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setErrorRequestText, setRequestText } from 'store/index';
import { ChatOutlined } from '@mui/icons-material';
import { useEffect } from 'react';

export function RequestTextField({ isUpdate }: { isUpdate?: boolean }) {
  const { requestText, errorRequestText } = useSelector((state: RootState) => state.matchingForm);
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.target.value.length < 5) {
      dispatch(setErrorRequestText(true));
    } else {
      dispatch(setErrorRequestText(false));
    }
    dispatch(setRequestText(e.target.value));
  };

  useEffect(() => {
    dispatch(setRequestText(undefined));
    dispatch(setErrorRequestText(true));
  }, []);

  return (
    <>
      <FormLabel component="legend">
        <ChatOutlined className="icon" />
        요청 메시지
      </FormLabel>
      <TextField
        multiline
        rows={4}
        error={!isUpdate && errorRequestText && requestText !== undefined}
        fullWidth
        value={requestText === undefined ? '' : requestText}
        onChange={handleChange}
      />
    </>
  );
}
