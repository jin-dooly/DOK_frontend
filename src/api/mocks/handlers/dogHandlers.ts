import { http, HttpResponse, delay } from 'msw';
import { dogUrl as root } from '@api/apiUrls';
import { DogType } from '@types';
import dayjs from 'dayjs';

type dogParamsType = { id: string };

export const dogHandlers = [
  http.patch<dogParamsType, DogType>(`${root}/:id`, async ({ params, request }) => {
    await delay(500);

    const body = await request.json();
    if (!body) {
      return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const res = await fetch('mockData/dogs.json');
    const dogs = await res.json();
    const foundDog = dogs.filter(({ _id, deletedAt }: DogType) => params.id === _id && !deletedAt)[0];

    if (!foundDog) {
      return HttpResponse.json({ error: 'Bad Request' }, { status: 400 });
    }
    const updatedDog = { ...foundDog, ...body, updatedAt: dayjs() };
    return HttpResponse.json({ data: { dog: updatedDog } });
  }),

  http.delete<dogParamsType>(`${root}/:id`, async ({ params, cookies }) => {
    await delay(500);

    if (!cookies) {
      return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const res = await fetch('mockData/dogs.json');
    const dogs = await res.json();
    const foundDog = dogs.filter(({ _id, deletedAt }: DogType) => params.id === _id && !deletedAt)[0];

    if (!foundDog) {
      return HttpResponse.json({ error: 'Bad Request' }, { status: 400 });
    }

    if (foundDog.user !== cookies.token) {
      return HttpResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return HttpResponse.json({ status: 200 });
  }),
];
