import { http, HttpResponse } from 'msw';
import { dogUrl as root } from 'api/apiUrls';
import { delay } from '@reduxjs/toolkit/dist/utils';
import { DogType } from 'src/types';
import { error } from 'console';
import dayjs from 'dayjs';

type userParamsType = { id: string };

export const dogHandlers = [
  http.patch<userParamsType, DogType>(`${root}/:id`, async ({ params, request }) => {
    await delay(500);

    const body = await request.json();
    if (!body) {
      return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const res = await fetch('mockData/dogs.json');
    const dogs = await res.json();
    const foundDog = dogs.filter(({ _id, deletedAt }: DogType) => params.id === _id && !deletedAt);

    if (!foundDog) {
      return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
    }
    const updatedDog = { ...foundDog, ...body, updatedAt: dayjs() };
    return HttpResponse.json({ data: { dog: updatedDog } });
  }),
];
