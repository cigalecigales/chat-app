import React from 'react';
import styled from 'styled-components';

import ChatList, { ChatListData } from '../components/chat-list';
import Button from '../components/button';
import CreateChatRoomModal from '../components/create-chatroom-modal';

const data: ChatListData[] = [{
  name: 'チャットルーム１',
  numberOfPeople: 10,
  roomId: 1
}, {
  name: 'チャットルーム２',
  numberOfPeople: 23,
  roomId: 2
}, {
  name: 'チャットルーム３',
  numberOfPeople: 9,
  roomId: 3
}];

interface ChatListPageState {
  isShow: boolean;
}

class ChatListPage extends React.Component<{}, ChatListPageState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      isShow: false
    };
  }

  displayModal() {
    this.setState({
      isShow: true
    });
  }

  createChatRoom() {
    this.setState({
      isShow: false
    });
  }

  render() {
    return (
      <ChatListPageStyle>
        <div className="title">
          <div className="chatRoomList">チャットルーム一覧</div>
          <div>
            <Button name="チャットルームを作成" onClick={() => this.displayModal()} primary />
          </div>
        </div>
        
        <ChatList data={data} />

        <CreateChatRoomModal
          onButtonClick={() => this.createChatRoom()}
          onTextInput={() => {}}
          isShow={this.state.isShow} />
      </ChatListPageStyle>
    )
  }
}

const ChatListPageStyle = styled.div`
  padding: 20px;

  .title {
    display: flex;
    align-items: center;
    justify-content:space-between;
    margin-bottom: 30px;
  }

  .chatRoomList {
    font-weight: bold;
    font-size: 20px;
  }
`;

export default ChatListPage;
