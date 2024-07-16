import { HttpResponse, StrictRequest, delay, http } from 'msw';
import { userUrl as root } from '../../apiUrls';

type userType = {
  _id: string;
  name: string;
  phoneNumber: string;
  userId: string;
  password: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  __v: number;
};

type dogType = {
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  __v: number;
};

type filteredUserType = Omit<userType, 'name' | 'phoneNumber' | 'userId' | 'password' | 'createdAt' | 'updatedAt' | 'deletedAt' | '__v'>;
type filteredDogType = Omit<dogType, 'user' | 'createdAt' | 'updatedAt' | 'deletedAt' | '__v'>;

const userDataFiltering = (data: userType | userType[]): filteredUserType | filteredUserType[] => {
  if (Array.isArray(data)) {
    return data.map(({ name, phoneNumber, userId, password, createdAt, updatedAt, deletedAt, __v, ...filtered }: userType) => filtered);
  }
  const { name, phoneNumber, userId, password, createdAt, updatedAt, deletedAt, __v, ...filtered } = data;
  return filtered;
};

const dogDataFiltering = (data: dogType | dogType[]): filteredDogType | filteredDogType[] => {
  if (Array.isArray(data)) {
    return data.map(({ user, createdAt, updatedAt, deletedAt, __v, ...filtered }: dogType) => filtered);
  }
  const { user, createdAt, updatedAt, deletedAt, __v, ...filtered } = data;
  return filtered;
};

export const userHandlers = [
  http.get(`${root}/:id/profile`, async ({ params }) => {
    await delay(500);
    console.log(params.id);

    let res = await fetch('mockData/users.json');
    const users = await res.json();
    const foundUser = users.filter(({ _id, deletedAt }: userType) => _id === params.id && !deletedAt)[0];
    if (!foundUser) {
      return HttpResponse.json({ status: 400 });
    }
    const user = userDataFiltering(foundUser);

    res = await fetch('mockData/dogs.json');
    const dogs = await res.json();
    const foundDogs = dogs.filter(({ user, deletedAt }: dogType) => user === params.id && !deletedAt);
    const userDogs = dogDataFiltering(foundDogs);

    return HttpResponse.json({
      data: {
        user,
        userDogs,
        rating: [4, 1],
      },
    });
  }),
];
