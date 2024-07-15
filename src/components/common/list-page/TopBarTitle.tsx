import { Section } from './TopBarTitle.styled';

interface TopBarTitleProps {
  yellow?: string;
  black?: string;
}

export function TopBarTitle({ yellow, black }: TopBarTitleProps) {
  return (
    <Section>
      <span className="point">{yellow}</span>
      <span className="text">{black}</span>
    </Section>
  );
}
