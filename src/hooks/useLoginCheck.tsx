import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initUserType } from '@types';
import { AppDispatch, setDog, setIsLoading, setUser } from '@store/index';
import { myInfoUrl } from '@api/apiUrls';

export const useLoginCheck = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(myInfoUrl, { credentials: 'include' });
        const data = await response.json();

        if (response.ok) {
          dispatch(setUser(data.user));
          dispatch(setDog(data.userDogs));
        } else {
          dispatch(setUser(initUserType));
          console.log(data);
        }
        dispatch(setIsLoading(false));
      } catch (error) {
        console.error('로그인 조회 오류:', error);
      }
    };

    fetchData();
  }, []);
};
