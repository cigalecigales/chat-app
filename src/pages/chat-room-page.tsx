import React from 'react';
import styled from 'styled-components';

import UserList, { UserData } from '../components/user-list';
import Button from '../components/button';
import MessageList, { MessageData } from '../components/message-list';
import CreateMessage from '../components/create-message';

const users: UserData[] = [{
  name: 'ユーザー１',
  id: 'U1',
  isMe: false
}, {
  name: 'ユーザー２',
  id: 'U2',
  isMe: false
}, {
  name: 'ユーザー３',
  id: 'U3',
  isMe: false
}];

const messages: MessageData[] = [{
  id: 'M1',
  userName: 'ユーザー１',
  time: '00:01',
  message: 'こんにちはー！！'
}, {
  id: 'M2',
  userName: 'ユーザー２',
  time: '00:02',
  message: '早く梅雨明けしてほしいですねー。雨ばっかり…'
}, {
  id: 'M3',
  userName: 'ユーザー３',
  time: '00:03',
  message: 'ほんとほんと。'
}];

interface ChatRoomPageState {
  isJoin: boolean;
}

class ChatRoomPage extends React.Component<{}, ChatRoomPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isJoin: false
    };
  }

  onClick() {

  }

  onInput() {

  }

  render() {
    return (
      <ChatRoomPageStyle>
        <div className="menu">
          <div className="chatRoomName">
            チャットルーム名
          </div>
          <div className="userList">
            <UserList users={users} />
          </div>
          <div className="button">
            <Button name="戻る" onClick={() => {}} />
          </div>
        </div>
        <div className="message">
          <MessageList messages={messages} />
        </div>
        <div className="createMessage">
          <CreateMessage
            isJoin={this.state.isJoin}
            onClick={() => this.onClick()}
            onInput={() => this.onInput()} />
        </div>
      </ChatRoomPageStyle>
    )
  }
}

const ChatRoomPageStyle = styled.div`
  display: grid;
  grid-template-rows: 1fr 80px;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
  box-sizing: border-box;

  .menu {
    background: #27224d;
    grid-row: 1 / 3;
    grid-column: 1 / 2;
    display: grid;
    grid-template-rows: 80px 1fr 80px;
    grid-template-columns: 250px;

    .chatRoomName {
      font-size: 20px;
      color: #ffffff;
      font-weight: bold;
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      padding: 10px;
    }

    .userList {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      padding: 10px;
    }

    .button {
      grid-row: 3 / 4;
      grid-column: 1 / 2;
      text-align: center;
    }
  }

  >.message {
    grid-row: 1 / 2;
    grid-column: 2 / 3;
    position: relative;
    padding: 10px;
  }

  .createMessage {
    border-top: 1px solid #d3d3d3;
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }
`;

export default ChatRoomPage;
