import { render } from 'react-dom';
import App from './App';
import { AppContextProvider } from './context/appContext';

const rootElement = document.getElementById('root');
render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  rootElement
);
