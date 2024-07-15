import { DogButton } from './DogButton';
import { useEffect, useState } from 'react';
import { AppDispatch, RootState, setDog } from 'store/index';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Dog, Writing } from './Introduce.style';
import { TextField, Button } from '@mui/material';
import { userUrl } from 'api/apiUrls';

export const Introduce = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.user);
  const [myIntroduce, setMyIntroduce] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${userUrl}/myInfo`, { credentials: 'include' });

        // 데이터가 undefined면 로그인 안한거니까 할 필요 없음
        // 응답의 상태를 체크해야함 reponse.ok
        if (response.status === 200) {
          const data = await response.json();
          dispatch(setDog(data.userDogs));
        } else {
          console.log('dog추가 오류');
        }
      } catch (error) {
        console.error('dog데이터 조회 오류:', error);
      }
    };

    fetchData();
  }, []);

  const handleModifyIntroduce = async () => {
    try {
      const res = await fetch(`${userUrl}/myIntroduce`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          introduce: `${myIntroduce}`,
        }),
        credentials: 'include',
      });
      const data = await res.json();

      if (res.ok) {
        user.introduce ? alert('소개글이 수정되었습니다.') : alert('소개글이 등록되었습니다.');
      } else {
        console.log(data);
      }
    } catch (error) {
      console.error('소개글 등록 오류:', error);
    }
  };

  return (
    <>
      <Writing>
        <div>
          <TextField
            placeholder={user.introduce ? user.introduce : '소개글을 작성해 주세요.최대 160자까지 작성 가능합니다.'}
            InputProps={{ inputProps: { maxLength: 160 } }}
            multiline
            rows={3}
            onChange={(event) => setMyIntroduce(event.target.value)}
            sx={{
              overflowY: 'auto',
              '.MuiInputBase-input': {
                width: 'max',
                padding: '0',
                fontSize: '14px',
              },
            }}
          />
        </div>
        <div>
          <Button variant="contained" color="mainB" sx={{}} onClick={handleModifyIntroduce}>
            {user.introduce ? '소개글 수정' : '소개글 등록'}
          </Button>
        </div>
      </Writing>
      <Dog>
        <p>나의 반려견</p>
        <Add>
          <DogButton />
        </Add>
      </Dog>
    </>
  );
};
