import { http, HttpResponse, delay } from 'msw';
import { jobPostUrl as root } from '@api/apiUrls';

export const jobPostHandlers = [
  http.get(`${root}/:id`, async ({ params, request }) => {
    await delay(500);

    return HttpResponse.json({});
  }),
];
