import { Button, Rating, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, setCertificationPostOne, setCertificationReview } from 'store/index';
import { useState } from 'react';
import { certificationUrl } from 'api/apiUrls';
import { AlertBottom } from 'common/alert/AlertBottom';
import { ReviewBox } from './Review.styled';

interface ReviewEditProps {
  setIsEditing: (arg: boolean) => void;
}

export function ReviewEdit({ setIsEditing }: ReviewEditProps) {
  const { certificationDetailPost, certificationDetailPostIndex } = useSelector((state: RootState) => state.certification);
  let { _id, matchingPost, review } = certificationDetailPost;
  const dispatch = useDispatch<AppDispatch>();

  const [rating, setRating] = useState<number>(review.rating || 0);
  const [text, setText] = useState<string>(review.reviewText || '');
  const [errorText, setErrorText] = useState<boolean>(false);
  const [openAlert, setOpenAlert] = useState<boolean>(false);
  const [alertDesc, setAlertDesc] = useState<string>('');

  // 별점 변경 이벤트
  const handleChangeRating = (e: React.SyntheticEvent<Element, Event>, newValue: number | null) => {
    setRating(Number(newValue));
  };

  // 리뷰 글(내용) 변경 이벤트
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.length > 100) {
      return;
    }

    if (value.length >= 5) {
      setErrorText(false);
    }

    setText(value);
  };

  // 리뷰 변경사항 저장
  const handleSubmit = async () => {
    if (text.trim().length < 5) {
      return setErrorText(true);
    }

    const newReview = { rating, reviewText: text.trim() };

    try {
      const res = await fetch(`${certificationUrl}/newCertificationPostReview/${_id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matchingPost: matchingPost._id, review: newReview }),
      });

      if (res.ok) {
        const data = await res.json();
        dispatch(setCertificationReview(data.review));
        dispatch(setCertificationPostOne({ index: certificationDetailPostIndex, post: { ...certificationDetailPost, review: data.review } }));
        setIsEditing(false);
      }

      if (res.status === 400) {
        setAlertDesc('(Bad Request)');
      }

      if (res.status === 401) {
        setAlertDesc('(Unauthorized)');
      }

      if (res.status === 403) {
        setAlertDesc('(Forbidden)');
      }

      if (res.status === 404) {
        setAlertDesc('(Not Found)');
      }

      setOpenAlert(true);
    } catch (e) {
      console.log('fetch error: ', e);
      setAlertDesc('(fetch error)');
      setOpenAlert(true);
    }
  };

  return (
    <ReviewBox>
      <AlertBottom open={openAlert} onClose={() => setOpenAlert(false)} type="error" title="후기 등록 실패" desc={alertDesc} />
      <div className="top">
        <div className="label">견주의 후기</div>
        <div className="left">
          <img src={matchingPost.user.userImg} className="user-img" />
          <div>{matchingPost.user.nickname}</div>
          <Rating readOnly={false} value={rating} onChange={handleChangeRating}></Rating>
        </div>
        <div className="right">
          <Button size="small" variant="outlined" color="subW" onClick={handleSubmit}>
            등록하기
          </Button>
        </div>
      </div>
      <div>
        <TextField error={errorText} helperText={errorText && '5글자 이상 작성해주세요.'} fullWidth rows={3} value={text} onChange={handleChangeText} multiline />
      </div>
    </ReviewBox>
  );
}
