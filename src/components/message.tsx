import React from 'react';
import styled from 'styled-components';

interface MessageProps {
  userName: string;
  time: string;
  message: string;
}

class Message extends React.Component<MessageProps> {
  render() {
    return (
      <MessageStyle>
        <div className="user">
          <div>{this.props.userName}</div>
          <div>{this.props.time}</div>
        </div>
        <div className="message">
          {this.props.message}
        </div>
      </MessageStyle>
    )
  }
}

const MessageStyle = styled.div`
  .user {
    display: flex;
  }
`;

export default Message;
