import { Search } from '@mui/icons-material';
import { MyButton } from './SearchButton.styled';

interface SearchButtonProps {
  onClick: (e: React.MouseEvent) => void;
}

export function SearchButton({ onClick }: SearchButtonProps) {
  return (
    <MyButton color="grayB" variant="contained" onClick={onClick}>
      <Search />
    </MyButton>
  );
}
