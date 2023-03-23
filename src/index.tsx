import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';

import { Provider } from 'react-redux';
import App from './App';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
    <Toaster position="top-right" />
  </Provider>
);
