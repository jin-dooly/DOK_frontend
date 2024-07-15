import { Button } from '@mui/material';
import styled from 'styled-components';

export const MyButton = styled(Button)`
  &.MuiButtonBase-root {
    box-shadow: none;
    flex-shrink: 0;
    margin-left: 4px;
    min-width: 20px;
    padding: 8px 9px;
  }
  &.MuiButtonBase-root:hover {
    box-shadow: none;
    background-color: #cdcdcd;
  }
`;
