import React from 'react';

import Message from './message';

interface MessageData {
  id: string;
  userName: string;
  time: string;
  message: string;
}

interface MessageListProps {
  messages: MessageData[];
}

class MessageList extends React.Component<MessageListProps> {
  render() {
    return (
      <div>
        {this.props.messages.map((item: MessageData) => {
          return <Message
                    userName={item.userName}
                    time={item.time}
                    message={item.message}
                    key={item.id} />
        })}
      </div>
    )
  }
}

export default MessageList;
