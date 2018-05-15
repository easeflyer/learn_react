import React from 'react';
import ReactDOM from 'react-dom';

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
      <div>
        <h1>Hello!</h1>
        {/* 之所以能这样做，是因为在 JavaScript 中，true && expression 总是返回 expression，而 false && expression 总是返回 false。*/}
        {unreadMessages.length > 0 &&
          <h2>
            You have {unreadMessages.length} unread messages.
          </h2>
        }
      </div>
    );
  }
  
  const messages = ['React', 'Re: React', 'Re:Re: React'];
  ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
  );
  
  