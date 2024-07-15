import { Group, TitleLayout } from './PostCreateGroup.styled';

interface PostCreateGroupProps {
  title: string;
  children: React.ReactNode;
}

export function PostCreateGroup({ title, children }: PostCreateGroupProps) {
  return (
    <Group>
      <TitleLayout>
        <span className="title">{title}</span>
        <hr />
      </TitleLayout>
      {children}
    </Group>
  );
}
