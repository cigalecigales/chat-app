import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import * as H from 'history';

import UserList, { UserItem } from '../components/user-list';
import Button from '../components/button';
import MessageList, { MessageItem } from '../components/message-list';
import JoinChatRoom from '../components/join-chat-room';
import CreateMessage from '../components/create-message';
import { ApplicationState } from '../store';
import { getCurrentRoom, connectWebSocket, joinRoom, sendMessage, clearCurrentRoom, setCurrentRoomId, leaveRoom } from '../store/actions';

interface ChatRoomPageProps extends RouteComponentProps {
  // 現在のチャットルームID
  currentRoomId: string;
  // 現在のチャットルーム名
  currentRoomName: string;
  // 現在のチャットルームのユーザー一覧
  currentRoomUsers: UserItem[];
  // 現在のチャットルームのメッセージ一覧
  currentRoomLogs: MessageItem[];
  // 履歴
  history: H.History;

  // WebSocketへの接続
  connectWebSocket: typeof connectWebSocket;
  // 現在のチャットルームの情報取得
  getCurrentRoom: typeof getCurrentRoom;
  // チャットルームへの入室
  joinRoom: typeof joinRoom;
  // メッセージの送信
  sendMessage: typeof sendMessage;
  // 現在のチャットルーム情報のクリア
  clearCurrentRoom: typeof clearCurrentRoom;
  // 現在のチャットルームID設定
  setCurrentRoomId: typeof setCurrentRoomId;
  // チャットルーム退室
  leaveRoom: typeof leaveRoom;
}

interface ChatRoomPageState {
  // チャットルームへの入室フラグ
  isJoin: boolean;
  // 現在のチャットルームID
  currentRoomId: string;
  // 入力欄への入力内容
  text: string;
  // ユーザー名
  userName: string;
}

class ChatRoomPage extends React.Component<ChatRoomPageProps, ChatRoomPageState> {

  constructor(props: ChatRoomPageProps) {
    super(props);
    // ステートの初期化
    this.state = {
      isJoin: false,
      currentRoomId: this.getCurrentRoomId(),
      text: '',
      userName: ''
    };
  }

  /**
   * コンポーネントがマウントされた際の処理
   */
  componentDidMount() {
    if (!this.state.currentRoomId) {
      // 現在のチャットルームIDが未設定の場合はチャットルーム一覧に戻る
      this.props.history.push('/');
    } else {
      // 現在のチャットルームIDが存在する場合は保存
      this.props.setCurrentRoomId(this.state.currentRoomId);
    }

    // WebSocketへの接続
    this.props.connectWebSocket();
    setTimeout(() => {
      // 現在のチャットルームの情報取得
      this.getCurrentRoomInfo();
    }, 1000);
  }

  /**
   * 現在のチャットルーム情報取得処理
   */
  getCurrentRoomInfo(): void {
    this.props.getCurrentRoom({
      roomId: this.state.currentRoomId
    });
  }

  /**
   * 現在のチャットルームIDの取得
   */
  getCurrentRoomId(): string {
    const parameters: string = window.location.search;
    // パラメーターの内、「roomId」を取得
    const roomIdParam: string[] = parameters.split('&').filter(p => p.indexOf('roomId') > 0);
    // パラメーターが存在する場合はその値を取得
    if (roomIdParam.length === 1) {
      const roomId = roomIdParam[0].split('=')[1];
      return roomId;
    }
    return '';
  }

  /**
   * 入室ボタンクリック時の処理
   */
  onClickJoin(): void {
    if (this.state.text) {
      this.props.joinRoom({
        roomId: this.state.currentRoomId,
        userName: this.state.text
      });
      this.setState({
        isJoin: true,
        userName: this.state.text,
        text: ''
      });
    }
  }

  /**
   * 投稿ボタンクリック時の処理
   */
  onClickSending(): void {
    if (this.state.text) {
      this.props.sendMessage({
        roomId: this.state.currentRoomId,
        userName: this.state.userName,
        message: this.state.text
      });
      this.setState({
        text: ''
      });
    }
  }

  /**
   * 入力欄に入力時の処理
   * 
   * @param e フォームイベント
   */
  onInputText(e: React.FormEvent<HTMLDivElement>): void {
    const text: string | null = e.currentTarget.textContent;
    this.setState({
      text: text ? text : ''
    });
  }

  /**
   * 入力欄からフォーカスアウト時の処理
   * 
   * @param e フォームイベント
   */
  onBlurText(e: React.FormEvent<HTMLDivElement>): void {
    e.currentTarget.textContent = '';
  }

  /**
   * 戻るボタンクリック時の処理
   */
  backToRoomList(): void {
    // 現在のチャットルーム情報のクリア
    this.props.clearCurrentRoom();
    // チャットルーム退室
    this.props.leaveRoom();
    // チャットルーム一覧ページに遷移
    this.props.history.push('/');
  }

  render() {
    return (
      <ChatRoomPageStyle isJoin={this.state.isJoin}>
        <div className="menu">
          <div className="chatRoomName">
            {this.props.currentRoomName}
          </div>
          <div className="userList">
            <UserList users={this.props.currentRoomUsers} />
          </div>
          <div className="button">
            <Button name="戻る" onClick={() => this.backToRoomList()} />
          </div>
        </div>
        <div className="message">
          <MessageList messages={this.props.currentRoomLogs} />
        </div>
        <div className="createMessage">
          <div className="notJoin">
            <JoinChatRoom
              onInputText={(e) => this.onInputText(e)}
              onBlurText={(e) => this.onBlurText(e)}
              onClickButton={() => this.onClickJoin()}
            />
          </div>
          <div className="join">
            <CreateMessage
              onInputText={(e) => this.onInputText(e)}
              onBlurText={(e) => this.onBlurText(e)}
              onClickButton={() => this.onClickSending()}              
            />
          </div>
        </div>
      </ChatRoomPageStyle>
    )
  }
}

const mapStateToProps = ({ app }: ApplicationState) => ({
  currentRoomId: app.currentRoom.id,
  currentRoomName: app.currentRoom.name,
  currentRoomUsers: app.currentRoom.users,
  currentRoomLogs: app.currentRoom.logs
});

const mapDispatchToProps = ({
  getCurrentRoom,
  connectWebSocket,
  joinRoom,
  sendMessage,
  clearCurrentRoom,
  setCurrentRoomId,
  leaveRoom
});

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ChatRoomPage))
;
