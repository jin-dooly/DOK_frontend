import { setupWorker } from 'msw/browser';
import { authHandlers, dogHandlers, homeHandlers, jobPostHandlers, userHandlers } from '@api/mocks/handlers';

export const worker = setupWorker(...userHandlers, ...homeHandlers, ...dogHandlers, ...authHandlers, ...jobPostHandlers);
