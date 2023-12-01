import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initUserType } from '../types';
import { AppDispatch, RootState, setDog, setIsLoading, setUser } from 'store/index';

export const useLoginCheck = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, dog } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users/myInfo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        // 데이터가 undefined면 로그인 안한거니까 할 필요 없음
        // 응답의 상태를 체크해야함 reponse.ok
        if (response.status === 200) {
          const data = await response.json();
          dispatch(setUser(data.user));
          dispatch(setDog(data.userDogs));
          console.log(data.userDogs);
          
        } else {
          console.log('로그인 안됨');
          dispatch(setUser(initUserType));
        }
        dispatch(setIsLoading(false));
        // console.log(data);
        // console.log(`로그인 조회 완료 : ${data}`);
        // console.log(data);
        // data왔으면 리덕스 스토어에 데이터 저장하면됨.
      } catch (error) {
        console.error('로그인 조회 오류:', error);
      }
    };

    fetchData();
  }, []);
};
