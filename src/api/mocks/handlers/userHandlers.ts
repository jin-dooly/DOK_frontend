import { HttpResponse, PathParams, StrictRequest, delay, http } from 'msw';
import { userUrl as root } from '@api/apiUrls';
import { DogType, initUserType, UserType } from '@types';
import dayjs from 'dayjs';

type filteredUserType = Omit<UserType, 'name' | 'phoneNumber' | 'userId' | 'password' | 'createdAt' | 'updatedAt' | 'deletedAt' | '__v'>;
type filteredDogType = Omit<DogType, 'user' | 'createdAt' | 'updatedAt' | 'deletedAt' | '__v'>;
type userParamsType = { id: string };

const userDataFiltering = (data: UserType | UserType[]): filteredUserType | filteredUserType[] => {
  if (Array.isArray(data)) {
    return data.map(({ name, phoneNumber, userId, password, createdAt, updatedAt, deletedAt, __v, ...filtered }: UserType) => filtered);
  }
  const { name, phoneNumber, userId, password, createdAt, updatedAt, deletedAt, __v, ...filtered } = data;
  return filtered;
};

const dogDataFiltering = (data: DogType | DogType[]): filteredDogType | filteredDogType[] => {
  if (Array.isArray(data)) {
    return data.map(({ user, createdAt, updatedAt, deletedAt, __v, ...filtered }: DogType) => filtered);
  }
  const { user, createdAt, updatedAt, deletedAt, __v, ...filtered } = data;
  return filtered;
};

export const userHandlers = [
  http.get<userParamsType>(`${root}/:id/profile`, async ({ params }) => {
    await delay(500);

    let res = await fetch('mockData/users.json');
    const users = await res.json();
    const foundUser = users.filter(({ _id, deletedAt }: UserType) => _id === params.id && !deletedAt)[0];
    if (!foundUser) {
      return HttpResponse.json({ status: 400 });
    }
    const user = userDataFiltering(foundUser);

    res = await fetch('mockData/dogs.json');
    const dogs = await res.json();
    const foundDogs = dogs.filter(({ user, deletedAt }: DogType) => user === params.id && !deletedAt);
    const userDogs = dogDataFiltering(foundDogs);

    return HttpResponse.json({
      data: {
        user,
        userDogs,
        rating: [4, 1],
      },
    });
  }),

  http.get<userParamsType>(`${root}/:id`, async ({ params, cookies }) => {
    await delay(500);

    if (!cookies.token) {
      return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    let res = await fetch('mockData/users.json');
    const users = await res.json();
    const foundUser = users.filter(({ _id, deletedAt }: UserType) => _id === params.id && !deletedAt)[0];
    if (!foundUser) {
      return HttpResponse.json({ status: 400 });
    }

    const { password, ...user } = foundUser;
    return HttpResponse.json({ data: { user } });
  }),

  http.post<PathParams, UserType>(`${root}`, async ({ cookies, request }) => {
    await delay(500);

    if (!cookies.token) {
      return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const body = await request.json();
    const { userId, password, name, nickname, address, phoneNumber } = body;
    if (!(userId && password && name && nickname && address && phoneNumber)) {
      return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const newUser = { ...initUserType, ...body, createdAt: dayjs() };

    return HttpResponse.json({ data: { user: newUser } });
  }),

  http.patch<userParamsType, UserType>(`${root}/:id`, async ({ params, cookies, request }) => {
    await delay(500);

    if (!cookies.token) {
      return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    const body = await request.json();
    let res = await fetch('mockData/users.json');
    const users = await res.json();
    const foundUser = users.filter(({ _id, deletedAt }: UserType) => _id === params.id && !deletedAt)[0];
    if (!body || !foundUser) {
      return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const newUser = { ...foundUser, ...body, updatedAt: dayjs() };

    return HttpResponse.json({ data: { user: newUser } });
  }),

  http.delete<userParamsType, UserType>(`${root}/:id`, async ({ params, cookies }) => {
    await delay(500);

    if (!cookies.token) {
      return HttpResponse.json({ error: 'Not Authorized' }, { status: 401 });
    }

    let res = await fetch('mockData/users.json');
    const users = await res.json();
    const foundUser = users.filter(({ _id, deletedAt }: UserType) => _id === params.id && !deletedAt)[0];
    if (!foundUser) {
      return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    return HttpResponse.json({ status: 204 });
  }),

  http.get<userParamsType>(`${root}/:id/dogs`, async ({ params }) => {
    await delay(500);

    const res = await fetch('mockData/dogs.json');
    const dogs = await res.json();
    const foundDogs = dogs.filter(({ user, deletedAt }: DogType) => user === params.id && !deletedAt);
    const userDogs = dogDataFiltering(foundDogs);

    return HttpResponse.json({ data: { userDogs } });
  }),
];
