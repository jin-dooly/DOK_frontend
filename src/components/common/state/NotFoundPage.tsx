import { NotFoundLayout } from './States.styled';

export function NotFound() {
  return (
    <NotFoundLayout>
      <img src="https://item.kakaocdn.net/do/bdf2b477837e8664559b1385bb9d0b0641d1a2caccd0c566eab28b91e2e5d306" />
      <div>
        <div className="error">404 Not Found</div>
        <h2 className="title">페이지를 찾을 수 없습니다.</h2>
      </div>
    </NotFoundLayout>
  );
}
