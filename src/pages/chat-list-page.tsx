import React from 'react';
import styled from 'styled-components';

import ChatList, { ChatListData } from '../components/chat-list';
import Button from '../components/button';
import CreateChatRoomModal from '../components/create-chat-room-modal';

const data: ChatListData[] = [{
  roomId: 'ROOM_1',
  name: 'チャットルーム 1',
  users: []
}, {
  roomId: 'ROOM_2',
  name: 'チャットルーム 2',
  users: []
}, {
  roomId: 'ROOM_3',
  name: 'チャットルーム 3',
  users: []
}];

interface ChatListPageProps {
}

interface ChatListPageState {
  // チャットルーム作成モーダルの表示／非表示フラグ
  isCreateChatRoomModalShow: boolean;
}

class ChatListPage extends React.Component<ChatListPageProps, ChatListPageState> {

  constructor(props: ChatListPageProps) {
    super(props);
    // ステートの初期化
    this.state = {
      isCreateChatRoomModalShow: false,
    };
  }

  /**
   * チャットルーム作成モーダル表示処理
   */
  displayCreateChatroomModal(): void {
    this.setState({
      isCreateChatRoomModalShow: true
    });
  }

  /**
   * チャットルーム作成処理
   */
  createChatRoom(): void {
    this.setState({
      isCreateChatRoomModalShow: false
    });
  }

  render() {
    return (
      <ChatListPageStyle>
        <div className="title">
          <div className="chatRoomList">チャットルーム一覧</div>
          <div>
            <Button
              name="チャットルームを作成"
              onClick={() => this.displayCreateChatroomModal()}
              primary
            />
          </div>
        </div>
        
        <ChatList data={data} />

        <CreateChatRoomModal
          onClickButton={() => this.createChatRoom()}
          onBlurText={() => {}}
          onInputText={() => {}}
          isShow={this.state.isCreateChatRoomModalShow}
        />

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
