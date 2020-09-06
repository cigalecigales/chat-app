import { action } from 'typesafe-actions';

import { ActionTypes } from '../types/action';
import { CreateRoom, Conversation, JoinRoom, CurrentRoom } from '../types/reception';

// WebSocketの接続先
const URL: string = 'ws://localhost:3333';

/**
 * WebSocketへの接続
 * 
 * @param url 接続先URL
 */
export const connectWebSocket = (url = URL) => action(
  ActionTypes.WebSocketEvents.WEBSOCKET_CONNECT,
  { url }
);

/**
 * チャットルーム作成
 * 
 * @param data 送信データ
 */
export const createRoom = (data: CreateRoom) => action(
  ActionTypes.WebSocketEvents.WEBSOCKET_SEND, {
    type: ActionTypes.WebSocketEvents.WEBSOCKET_CREATE_ROOM,
    ...data
  }
);

/**
 * チャットルームへの入室
 * 
 * @param data 送信データ
 */
export const joinRoom = (data: JoinRoom) => action(
  ActionTypes.WebSocketEvents.WEBSOCKET_SEND, {
    type: ActionTypes.WebSocketEvents.WEBSOCKET_JOIN_ROOM,
    ...data
  }
);

/**
 * メッセージの送信
 * 
 * @param data 送信データ
 */
export const sendMessage = (data: Conversation) => action(
  ActionTypes.WebSocketEvents.WEBSOCKET_SEND,{
    type: ActionTypes.WebSocketEvents.WEBSOCKET_CONVERSATION, 
    ...data
  }
);

/**
 * チャットルーム一覧取得
 */
export const getRoomsList = () => action(
  ActionTypes.WebSocketEvents.WEBSOCKET_SEND,{
    type: ActionTypes.WebSocketEvents.WEBSOCKET_GET_ROOMS_LIST, 
  }
);

/**
 * 現在のチャットルーム情報取得
 * 
 * @param data 送信データ
 */
export const getCurrentRoom = (data: CurrentRoom) => action(
  ActionTypes.WebSocketEvents.WEBSOCKET_SEND,{
    type: ActionTypes.WebSocketEvents.WEBSOCKET_GET_CURRENT_ROOM, 
    ...data
  }
);

/**
 * チャットルーム退室
 */
export const leaveRoom = () => action(
  ActionTypes.WebSocketEvents.WEBSOCKET_SEND,{
    type: ActionTypes.WebSocketEvents.WEBSOCKET_LEAVE_ROOM
  }
);

/**
 * 現在のチャットルーム情報クリア
 */
export const clearCurrentRoom = () => action(
  ActionTypes.Events.NORMAL,{
    type: ActionTypes.Events.CLEAR_CURRENT_ROOM, 
  }
);

/**
 * 現在のチャットルームIDの設定
 */
export const setCurrentRoomId = (roomId: string) => action(
  ActionTypes.Events.NORMAL,{
    type: ActionTypes.Events.SET_CURRENT_ROOM_ID, 
    roomId
  }
);
