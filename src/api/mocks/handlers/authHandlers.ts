import { delay, http, HttpResponse, PathParams } from 'msw';
import { DOMAIN as root } from '@api/apiUrls';
import { UserType } from '@types';
import bcrypt from 'bcryptjs-react';

type authRequestType = {
  id: string;
  password: string;
};

export const authHandlers = [
  http.post<PathParams, authRequestType>(`${root}/login`, async ({ request }) => {
    await delay(500);

    const body = await request.json();
    if (!body.id || !body.password) {
      return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const res = await fetch('mockData/users.json');
    const users = await res.json();
    const foundUser = users.filter(({ userId, deletedAt }: UserType) => body.id === userId && !deletedAt);

    if (!foundUser) {
      return HttpResponse.json({ error: 'Not Found' }, { status: 404 });
    }

    const isCompare = bcrypt.compareSync(body.password, foundUser.password);
    if (!isCompare) {
      return HttpResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return new HttpResponse(null, {
      headers: {
        'Set-Cookie': `token=${foundUser._id}`,
      },
    });
  }),
];
