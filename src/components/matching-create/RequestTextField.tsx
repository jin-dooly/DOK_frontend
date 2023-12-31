import { FormLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, setRequestText } from "../../store";
import { ChatOutlined } from "@mui/icons-material";

export function RequestTextField() {
  const { requestText } = useSelector((state: RootState) => state.matchingCreate);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      <FormLabel component="legend">
        <ChatOutlined className="icon" />
        요청 메시지
      </FormLabel>
      <TextField
        multiline
        rows={4}
        fullWidth
        value={requestText}
        onChange={(e) => {
          dispatch(setRequestText(e.target.value));
        }}
      />
    </>
  );
}
