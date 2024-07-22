import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { worker } from 'api/mocks/browser';

worker.start().then(() => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(<App />);
});
