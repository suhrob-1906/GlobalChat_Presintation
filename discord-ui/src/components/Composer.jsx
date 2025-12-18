import React, { useState, useRef } from 'react';

function IconButton({ children, onClick, title }) {
  return (
    <button 
      onClick={onClick}
      title={title}
      className="w-10 h-10 flex items-center justify-center text-[#b5bac1] hover:text-[#dbdee1] transition-colors"
    >
      {children}
    </button>
  );
}

export default function Composer({ channelName = 'general', onSend }) {
  const [message, setMessage] = useState('');
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && onSend) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 pb-6 pt-0">
      <div className="flex items-center bg-[#383a40] rounded-lg">
        <IconButton title="Attach files">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"/>
          </svg>
        </IconButton>
        
        <input
          ref={inputRef}
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message #${channelName}`}
          className="flex-1 bg-transparent py-2.5 px-0 text-[#dbdee1] placeholder-[#6d6f78] outline-none text-base"
        />
        
        <div className="flex items-center">
          <IconButton title="Send a gift">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.982 13.68c.018.252.018.504.018.756v7.872c0 .795-.672 1.392-1.5 1.392h-17c-.828 0-1.5-.597-1.5-1.392v-7.872c0-.252 0-.504.018-.756h19.964zM3.646 8.396c-.588 0-1.068-.48-1.068-1.068V6.5c0-.588.48-1.068 1.068-1.068h6.872c-.192-.756-.192-1.512 0-2.268C10.98 1.66 12.348.688 13.944.688c1.308 0 2.496.684 3.132 1.836.312.564.444 1.2.444 1.908h4.5c.588 0 1.068.48 1.068 1.068v.828c0 .588-.48 1.068-1.068 1.068H3.646zm7.356.432V12h2v-3.172h4.5c.096-.24.156-.5.156-.828 0-.432-.072-.828-.252-1.152-.336-.612-.984-.984-1.716-.984-.948 0-1.752.612-2.04 1.452-.24.684-.24 1.404 0 2.088-.612 0-1.26-.012-1.884.024-.624-.036-1.272-.024-1.884-.024-.24-.684-.24-1.404 0-2.088-.288-.84-1.092-1.452-2.04-1.452-.732 0-1.38.372-1.716.984-.18.324-.252.72-.252 1.152 0 .328.06.588.156.828h4.5z"/>
            </svg>
          </IconButton>
          
          <IconButton title="Open GIF picker">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 5.13c0-.68.55-1.24 1.23-1.24H10v2.47H3.97A.5.5 0 0 1 3.47 5.9V5.13zm0 6.13a.5.5 0 0 1 .49-.5h4.47v2.47H2.5a.5.5 0 0 1-.5-.5v-1.47zm0 5.62c0-.68.55-1.23 1.23-1.23H10v2.47H3.23c-.68 0-1.23-.55-1.23-1.24z"/>
              <path d="M22 5.13c0-.68-.55-1.24-1.23-1.24H14v2.47h6.03a.5.5 0 0 0 .5-.46V5.13zm0 6.13a.5.5 0 0 0-.49-.5h-4.47v2.47H21.5a.5.5 0 0 0 .5-.5v-1.47zm0 5.62c0-.68-.55-1.23-1.23-1.23H14v2.47h6.77c.68 0 1.23-.55 1.23-1.24z"/>
              <path d="M12 3.13a.5.5 0 0 0-.5.5v16.74a.5.5 0 0 0 1 0V3.63a.5.5 0 0 0-.5-.5z"/>
            </svg>
          </IconButton>
          
          <IconButton title="Open sticker picker">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.0002 0.500244C5.64624 0.500244 0.500244 5.64624 0.500244 12.0002C0.500244 18.3542 5.64624 23.5002 12.0002 23.5002C18.3542 23.5002 23.5002 18.3542 23.5002 12.0002C23.5002 5.64624 18.3542 0.500244 12.0002 0.500244ZM12.0002 21.5002C6.75024 21.5002 2.50024 17.2502 2.50024 12.0002C2.50024 6.75024 6.75024 2.50024 12.0002 2.50024C17.2502 2.50024 21.5002 6.75024 21.5002 12.0002C21.5002 17.2502 17.2502 21.5002 12.0002 21.5002ZM8.00024 10.0002C8.00024 9.17224 8.67224 8.50024 9.50024 8.50024C10.3282 8.50024 11.0002 9.17224 11.0002 10.0002C11.0002 10.8282 10.3282 11.5002 9.50024 11.5002C8.67224 11.5002 8.00024 10.8282 8.00024 10.0002ZM13.0002 10.0002C13.0002 9.17224 13.6722 8.50024 14.5002 8.50024C15.3282 8.50024 16.0002 9.17224 16.0002 10.0002C16.0002 10.8282 15.3282 11.5002 14.5002 11.5002C13.6722 11.5002 13.0002 10.8282 13.0002 10.0002ZM17.6002 14.4002C16.5002 16.5002 14.3002 17.5002 12.0002 17.5002C9.70024 17.5002 7.50024 16.5002 6.40024 14.4002C6.20024 14.0002 6.40024 13.5002 6.80024 13.3002C7.20024 13.1002 7.70024 13.3002 7.90024 13.7002C8.70024 15.2002 10.3002 15.8002 12.0002 15.8002C13.7002 15.8002 15.3002 15.2002 16.1002 13.7002C16.3002 13.3002 16.8002 13.1002 17.2002 13.3002C17.6002 13.5002 17.8002 14.0002 17.6002 14.4002Z"/>
            </svg>
          </IconButton>
          
          <IconButton title="Select emoji">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM8.5 9c.83 0 1.5.67 1.5 1.5S9.33 12 8.5 12 7 11.33 7 10.5 7.67 9 8.5 9zm7.5 7H8c-.55 0-1-.45-1-1s.45-1 1-1h8c.55 0 1 .45 1 1s-.45 1-1 1zm-.5-4c-.83 0-1.5-.67-1.5-1.5S14.67 9 15.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </IconButton>
        </div>
      </div>
    </form>
  );
}
