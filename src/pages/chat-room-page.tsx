import React from 'react';
import styled from 'styled-components';

import UserList, { UserItem } from '../components/user-list';
import Button from '../components/button';
import MessageList, { MessageItem } from '../components/message-list';
import JoinChatRoom from '../components/join-chat-room';
import CreateMessage from '../components/create-message';

const users: UserItem[] = [{
  name: 'ユーザー 1',
  socketId: 'xxx1'
}, {
  name: 'ユーザー 2',
  socketId: 'xxx2'
}, {
  name: 'ユーザー 3',
  socketId: 'xxx3'
}];

const messages: MessageItem[] = [{
  logId: 1,
  userName: 'ユーザー 1',
  time: '2020/01/01 00:01',
  message: 'テストメッセージ 1'
}, {
  logId: 2,
  userName: 'ユーザー 2',
  time: '2020/01/01 00:02',
  message: 'テストメッセージ 2'
}, {
  logId: 3,
  userName: 'ユーザー 3',
  time: '2020/01/01 00:03',
  message: 'テストメッセージ 3'
}];

interface ChatRoomPageProps {
}

interface ChatRoomPageState {
  // チャットルームへの入室フラグ
  isJoin: boolean;
}

class ChatRoomPage extends React.Component<ChatRoomPageProps, ChatRoomPageState> {

  constructor(props: ChatRoomPageProps) {
    super(props);
    // ステートの初期化
    this.state = {
      isJoin: false
    };
  }

  render() {
    return (
      <ChatRoomPageStyle isJoin={this.state.isJoin}>
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
          <div className="notJoin">
            <JoinChatRoom
              onInputText={() => {}}
              onBlurText={() => {}}
              onClickButton={() => {}}
            />
          </div>
          <div className="join">
            <CreateMessage
              onInputText={() => {}}
              onBlurText={() => {}}
              onClickButton={() => {}}              
            />
          </div>
        </div>
      </ChatRoomPageStyle>
    )
  }
}

const ChatRoomPageStyle = styled.div<{ isJoin: boolean; }>`
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

    .notJoin {
      display: ${props => !props.isJoin ? 'block' : 'none'};
    }

    .join {
      display: ${props => props.isJoin ? 'block' : 'none'};
    }
  }
`;

export default ChatRoomPage;
