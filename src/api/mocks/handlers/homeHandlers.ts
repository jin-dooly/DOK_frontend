import { delay, http, HttpResponse } from 'msw';
import { mainUrl as root } from '@api/apiUrls';
import { CertificationPostType, DogType, MatchingPostType } from '@types';
import dayjs from 'dayjs';

const getRandomDogs = (dogs: DogType[]): DogType[] => {
  const len = dogs.length;

  if (!len) {
    return [];
  }
  if (len <= 6) {
    return dogs;
  }

  const newDogs: DogType[] = [];
  const numbers: number[] = [];

  while (newDogs.length >= 6) {
    const randomNumber = Math.floor(Math.random() * len);

    if (numbers.includes(randomNumber)) {
      continue;
    }

    numbers.push(randomNumber);
    newDogs.push(dogs[randomNumber]);
  }

  return newDogs;
};

export const homeHandlers = [
  http.get(root, async () => {
    await delay(500);

    const matchingPostRes = await fetch('mockData/matchingPosts.json');
    const matchingPosts = await matchingPostRes.json();
    const matchingPostCount = matchingPosts.length;
    const recentMatchingPosts = matchingPosts.sort((a: MatchingPostType, b: MatchingPostType) => dayjs(a.createdAt).diff(dayjs(b.createdAt))).slice(0, 6);

    const dogRes = await fetch('mockData/dogs.json');
    const dogs = await dogRes.json();
    const randomDogs = getRandomDogs(dogs);

    const certificationPostRes = await fetch('mockData/certificationPosts.json');
    const certificationPosts = await certificationPostRes.json();
    const highRatingPosts = certificationPosts.sort((a: CertificationPostType, b: CertificationPostType) => (a.review.rating || 0) - (b.review.rating || 0)).slice(0, 3);

    return HttpResponse.json({ data: [matchingPostCount, randomDogs, recentMatchingPosts, highRatingPosts] });
  }),
];
