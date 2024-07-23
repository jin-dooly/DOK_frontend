import { useEffect, useState } from 'react';
import { DogDetail } from './DogDetail';
import { useSelector } from 'react-redux';
import { RootState } from '@store/index';
import { DogCard } from './DogCard';
import { Loading } from '@common/state/Loading';
import { useLocation, useParams } from 'react-router-dom';
import { AddButton } from './DogButton.style';

export const DogButton = () => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [isLoding, setIsLoding] = useState<boolean>(true);
  const { pathname } = useLocation();
  const { dog } = useSelector((state: RootState) => state.user);
  const { mypageDog } = useSelector((state: RootState) => state.mypageUser);
  const { id } = useParams();

  useEffect(() => {
    setIsLoding(false);
  }, [dog]);

  return (
    <>
      {isLoding ? (
        <Loading />
      ) : pathname === `/profile/${id}` ? (
        <>
          {mypageDog.map((item) => (
            <DogCard
              profileImg={item.profileImg}
              key={item._id}
              name={item.name}
              birth={item.birth}
              gender={item.gender}
              type={item.type}
              personality={item.personality}
              note={item.note}
            />
          ))}
        </>
      ) : (
        <>
          {dog.map((item) => (
            <DogCard
              profileImg={item.profileImg}
              key={item._id}
              name={item.name}
              birth={item.birth}
              gender={item.gender}
              type={item.type}
              personality={item.personality}
              note={item.note}
            />
          ))}
          {clicked ? <DogDetail /> : <AddButton onClick={() => setClicked(!clicked)}>+</AddButton>}
        </>
      )}
    </>
  );
};
