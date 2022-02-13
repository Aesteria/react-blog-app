import { render } from 'react-dom';
import App from './App';
import { AuthContextProvider } from './context/auth-context';
import { FlashMessagesContextProvider } from './context/flash-messages-context';

const rootElement = document.getElementById('root');
render(
  <AuthContextProvider>
    <FlashMessagesContextProvider>
      <App />
    </FlashMessagesContextProvider>
  </AuthContextProvider>,
  rootElement
);
