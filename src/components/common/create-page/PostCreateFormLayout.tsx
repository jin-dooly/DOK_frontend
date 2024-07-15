import { Buttons, FormLayout } from './PostCreateFormLayout.styled';
import { ButtonMain } from 'common/button/ButtonMain';
import { ButtonGray } from 'common/button/ButtonGray';

interface PostCreateFormLayoutProps {
  title: string;
  children: React.ReactNode;
  onSubmit: () => void;
  onReset: () => void;
  buttonText?: string;
}

export function PostCreateFormLayout({ title, children, onSubmit, onReset, buttonText }: PostCreateFormLayoutProps) {
  return (
    <FormLayout>
      <h2>{title}</h2>
      <div className="contents">{children}</div>
      <Buttons>
        <ButtonMain text={buttonText || '작성하기'} onClick={onSubmit} />
        <ButtonGray text="취소" onClick={onReset} />
      </Buttons>
    </FormLayout>
  );
}
