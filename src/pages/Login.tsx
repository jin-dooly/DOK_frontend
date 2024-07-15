import { useEffect, useState } from 'react';
import { Login } from '../components/login/Login';
import { useSelector } from 'react-redux';
import { RootState } from 'store/index';
import { Forbidden } from 'common/state/Forbidden';

export function LoginPage() {
  const { user } = useSelector((state: RootState) => state.user);
  const [isUser, setIsUser] = useState<boolean>(true);

  useEffect(() => {
    if (user._id === '') {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, [user]);

  return isUser ? <Forbidden /> : <Login />;
}
