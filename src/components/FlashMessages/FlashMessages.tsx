import { useContext } from 'react';
import { FlashMessagesContext } from '../../context/flash-messages-context';

const FlashMessages = () => {
  const { flashMessages } = useContext(FlashMessagesContext);

  return (
    <div className="floating-alerts">
      {flashMessages.map((msg, index) => {
        return (
          <div
            key={index}
            className="alert alert-success text-center floating-alert shadow-sm"
          >
            {msg}
          </div>
        );
      })}
    </div>
  );
};

export default FlashMessages;
