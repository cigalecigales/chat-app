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
          <div className="name">
            {this.props.userName}
          </div>
          <div className="time">
            {this.props.time}
          </div>
        </div>
        <div className="message">
          {this.props.message}
        </div>
      </MessageStyle>
    )
  }
}

const MessageStyle = styled.div`
  margin: 30px 0px;

  .user {
    display: flex;
    align-items: center;

    .name {
      font-weight: bold;
    }

    .time {
      font-size: 14px;
      margin-left: 10px;
      color: #4d4d4d;
    }
  }
`;

export default Message;
