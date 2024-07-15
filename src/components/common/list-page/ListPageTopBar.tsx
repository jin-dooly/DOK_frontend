import { Section } from './ListPageTopBar.styled';
import { TopBarTitle } from './TopBarTitle';
import { TopBarFilter } from './TopBarFilter';

interface ListPageTopBarProps {
  yellow?: string;
  black?: string;
}

export function ListPageTopBar({ yellow, black }: ListPageTopBarProps) {
  return (
    <Section>
      <TopBarTitle yellow={yellow} black={black} />
      <TopBarFilter />
    </Section>
  );
}
