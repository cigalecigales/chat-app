import React from 'react';
import styled from 'styled-components';

import Message from './message';

export interface MessageData {
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
      <MessageListStyle>
        {this.props.messages.map((item: MessageData) => {
          return <Message
                    userName={item.userName}
                    time={item.time}
                    message={item.message}
                    key={item.id} />
        })}
      </MessageListStyle>
    )
  }
}

const MessageListStyle = styled.div`
  position: absolute;
  bottom: 0;
`;

export default MessageList;
