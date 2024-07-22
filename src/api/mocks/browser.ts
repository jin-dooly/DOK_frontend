import { setupWorker } from 'msw/browser';
import { homeHandlers, userHandlers } from './handlers';

export const worker = setupWorker(...userHandlers, ...homeHandlers);
