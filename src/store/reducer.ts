import { Reducer } from 'redux';

import { AppState } from '../types/store';
import { ActionTypes } from '../types/action';
import { formatDate } from '../utils';

// 初期state
export const initialState: AppState = {
  currentRoom: {
    id: '',
    name: '',
    users: [],
    logs: []
  },
  currentUser: {
    name: ''
  },
  rooms: []
}

const reducer: Reducer = (state = initialState, action) => {
  switch (action.type) {
    // WebScoketからの受信イベントの場合
    case ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE: {
      switch(action.payload.type) {
        // チャットルーム作成
        case ActionTypes.WebSocketEvents.WEBSOCKET_CREATE_ROOM: {
          return { ...state, rooms: action.payload.rooms};
        }

        // チャットルーム入室
        case ActionTypes.WebSocketEvents.WEBSOCKET_JOIN_ROOM: {
          console.log('入室')
          const currentState = { ...state };
          let copyCurrentRoom = JSON.parse(JSON.stringify(currentState.currentRoom));
          // 現在開いているチャットルームの場合、ユーザー一覧を更新
          if (copyCurrentRoom.id === action.payload.roomId) {
            copyCurrentRoom.users = action.payload.users;
            // 入室ログの追加
            copyCurrentRoom.logs.push({
              logId: copyCurrentRoom.logs.length + 1,
              userName: '管理者☆彡',
              time: formatDate('yyyy/MM/dd HH:mm:ss'),
              message: `■■■■■ ${action.payload.userName} さんが入室しました。 ■■■■■`
            });
          }
          return { ...state, currentRoom: copyCurrentRoom };
        }

        // 会話
        case ActionTypes.WebSocketEvents.WEBSOCKET_CONVERSATION: {
          const currentState = { ...state };
          let copyCurrentRoom = JSON.parse(JSON.stringify(currentState.currentRoom));
          // 現在開いているチャットルームの場合、メッセージ一覧を更新
          if (copyCurrentRoom.id === action.payload.roomId) {
            copyCurrentRoom.logs.push({
              logId: copyCurrentRoom.logs.length + 1,
              userName: action.payload.userName,
              time: action.payload.time,
              message: action.payload.message
            });
          }
          return { ...state, currentRoom: copyCurrentRoom };
        }

        // チャットルーム一覧取得
        case ActionTypes.WebSocketEvents.WEBSOCKET_GET_ROOMS_LIST: {
          return { ...state, rooms: action.payload.rooms};
        }

        // 現在のチャットルーム取得
        case ActionTypes.WebSocketEvents.WEBSOCKET_GET_CURRENT_ROOM: {
          const currentState = { ...state };
          let copyCurrentRoom = JSON.parse(JSON.stringify(currentState.currentRoom));
          // 現在開いているチャットルームの場合、メッセージ一覧を更新
          if (copyCurrentRoom.id === action.payload.roomId) {
            return { ...state, currentRoom: {
              id: action.payload.roomId,
              name: action.payload.roomName,
              users: action.payload.users,
              logs: action.payload.logs
            }};
          }
          return { ...state };
        }

        // チャットルーム退室
        case ActionTypes.WebSocketEvents.WEBSOCKET_DISCONNECT:
        case ActionTypes.WebSocketEvents.WEBSOCKET_LEAVE_ROOM: {
          const currentState = { ...state };
          let copyCurrentRoom = JSON.parse(JSON.stringify(currentState.currentRoom));
          // 現在開いているチャットルームの場合、ユーザー削除・退室ログ追加
          if (copyCurrentRoom.id === action.payload.roomId) {
            let loopCount = 0;
            for (const user of copyCurrentRoom.users) {
              if (user.socketId === action.payload.socketId) {
                // 該当ユーザーを削除
                copyCurrentRoom.users.splice(loopCount, 1);
                // 退室ログの追加
                copyCurrentRoom.logs.push({
                  logId: copyCurrentRoom.logs.length + 1,
                  userName: '管理者☆彡',
                  time: formatDate('yyyy/MM/dd HH:mm:ss'),
                  message: `■■■■■ ${user.name} さんが退室しました。 ■■■■■`
                });
                break;
              }
              loopCount++;
            }
          }
          return { ...state, currentRoom: copyCurrentRoom };
        }
      }

      return { ...state };
    }

    // WebSocket以外のイベントの場合
    case ActionTypes.Events.NORMAL: {
      switch(action.payload.type) {
        // 現在のチャットルーム情報クリア
        case ActionTypes.Events.CLEAR_CURRENT_ROOM: {
          return { ...state, currentRoom: {
            id: '',
            name: '',
            users: [],
            logs: []
          }};
        }

        // 現在のチャットルームID設定
        case ActionTypes.Events.SET_CURRENT_ROOM_ID: {
          return { ...state, currentRoom: {
            id: action.payload.roomId,
            name: '',
            users: [],
            logs: []
          }};
        }
      }

      return { ...state };
    }

    // それ以外のイベント
    default: {
      return state;
    }
  }
}

export { reducer };
