import { useEffect, useState } from 'react';
import { MainInfo } from '../components/main/MainInfo';
import { MainSection1 } from '../components/main/MainSection1';
import { MainSection2 } from '../components/main/MainSection2';
import { MainSection3 } from '../components/main/MainSection3';
import { useDispatch } from 'react-redux';
import { AppDispatch, setMainCertificationPosts, setMainMatchingPosts, setMainDogs, setMainMatchingPostCount } from 'store/index';
import { PageLayout } from '../styles/PageDefault.styled';
import { LoadingPage } from 'common/state/LoadingPage';
import { mainUrl } from 'api/apiUrls';

export function MainPage() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(mainUrl);
        const data = await res.json();

        if (res.ok) {
          const [mathingPostCount, dogs, matchingPosts, certificationPosts] = data;

          dispatch(setMainMatchingPostCount(mathingPostCount));
          dispatch(setMainDogs(dogs.slice(0, 6)));
          dispatch(setMainMatchingPosts(matchingPosts.slice(0, 3)));
          dispatch(setMainCertificationPosts(certificationPosts.slice(0, 3)));
          setLoading(false);
        } else {
          console.log(data);
        }
      } catch (e) {
        console.log('fetch error: ', e);
      }
    })();
  }, []);

  return loading ? (
    <LoadingPage />
  ) : (
    <PageLayout>
      <MainInfo />
      <MainSection1 />
      <MainSection2 />
      <MainSection3 />
    </PageLayout>
  );
}
