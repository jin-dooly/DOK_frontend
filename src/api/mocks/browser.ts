import { setupWorker } from 'msw/browser';
import { homeHandlers, userHandlers } from '@api/mocks/handlers';

export const worker = setupWorker(...userHandlers, ...homeHandlers);
