import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import * as H from 'history';

import ChatList from '../components/chat-list';
import Button from '../components/button';
import CreateChatRoomModal from '../components/create-chat-room-modal';
import { ApplicationState } from '../store';
import { getRoomsList, connectWebSocket, createRoom } from '../store/actions';
import { Room } from '../types/store';

interface ChatListPageProps extends RouteComponentProps {
  // チャットルーム一覧
  rooms: Room[];
  // 履歴
  history: H.History;
  // チャットルーム一覧取得
  getRoomsList: typeof getRoomsList;
  // WebSocketへの接続
  connectWebSocket: typeof connectWebSocket;
  // チャットルーム作成
  createRoom: typeof createRoom;
}

interface ChatListPageState {
  // チャットルーム作成モーダルの表示／非表示フラグ
  isCreateChatRoomModalShow: boolean;
  // チャットルーム名
  chatRoomName: string;
}

class ChatListPage extends React.Component<ChatListPageProps, ChatListPageState> {

  constructor(props: ChatListPageProps) {
    super(props);
    // ステートの初期化
    this.state = {
      isCreateChatRoomModalShow: false,
      chatRoomName: ''
    };
  }

  /**
   * コンポーネントがマウントされた際の処理
   */
  componentDidMount() {
    // WebSocketへの接続
    this.props.connectWebSocket();
    setTimeout(() => {
      // チャットルーム一覧の取得
      this.props.getRoomsList();
    }, 1000);
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
    // チャットルーム名が入力されている場合
    if (this.state.chatRoomName) {
      this.props.createRoom({
        roomName: this.state.chatRoomName
      });
      this.setState({
        isCreateChatRoomModalShow: false
      });
    }
  }

  /**
   * チャットルーム名取得処理
   * 
   * @param e フォームイベント
   */
  getChatRoomName(e: React.FormEvent<HTMLDivElement>): void {
    // チャットルーム名入力欄に入力した内容を取得し、ステートに設定
    const text: string | null = e.currentTarget.textContent;
    this.setState({
      chatRoomName: text ? text : ''
    });
  }

  /**
   * チャットルーム名クリア処理
   * 
   * @param e フォームイベント
   */
  clearChatRoomName(e: React.FormEvent<HTMLDivElement>): void {
    // チャットルーム名入力欄からフォーカスアウトした場合に
    // 入力欄に入力した内容をクリアする
    e.currentTarget.textContent = '';
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
        
        <ChatList data={this.props.rooms} />

        <CreateChatRoomModal
          onClickButton={() => this.createChatRoom()}
          onBlurText={(e) => this.clearChatRoomName(e)}
          onInputText={(e) => this.getChatRoomName(e)}
          isShow={this.state.isCreateChatRoomModalShow}
        />

      </ChatListPageStyle>
    )
  }
}

const mapStateToProps = ({ app }: ApplicationState) => ({
  rooms: app.rooms
});

const mapDispatchToProps = ({
  getRoomsList,
  connectWebSocket,
  createRoom
});

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatListPage))
;
