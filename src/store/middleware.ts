import { Middleware, MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import io from 'socket.io-client';

import { ActionTypes } from '../types/action';

let websocket: SocketIOClient.Socket;
// 初期化済みフラグ
let isInitialization = false;

export const websocketMiddleware: Middleware =
  <S>({ getState }: MiddlewareAPI<Dispatch, S>) =>
    (next: Dispatch<AnyAction>) =>
      (action: any): any => {
        switch(action.type) {
          // WebSocketへの接続
          case ActionTypes.WebSocketEvents.WEBSOCKET_CONNECT: {
            if (websocket === undefined || !websocket.connected) {
              // 接続
              websocket = io(action.payload.url);
            }

            if (!isInitialization) {
              // コールバックのアタッチ
              // open
              websocket.on('open', () => next({ 
                type: ActionTypes.WebSocketEvents.WEBSOCKET_OPEN
              }));
              // close
              websocket.on('close', (event: string) => next({ 
                type: ActionTypes.WebSocketEvents.WEBSOCKET_CLOSE,
                payload: event
              }));
              // チャットルーム作成
              websocket.on(
                ActionTypes.WebSocketEvents.WEBSOCKET_CREATE_ROOM,
                (event: string) => next(
                  { type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE, payload: event }
                )
              );
              // チャットルーム入室
              websocket.on(
                ActionTypes.WebSocketEvents.WEBSOCKET_JOIN_ROOM,
                (event: string) => next(
                  { type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE, payload: event }
                )
              );
              // 会話
              websocket.on(
                ActionTypes.WebSocketEvents.WEBSOCKET_CONVERSATION,
                (event: string) => next(
                  { type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE, payload: event }
                )
              );
              // チャットルーム一覧取得
              websocket.on(
                ActionTypes.WebSocketEvents.WEBSOCKET_GET_ROOMS_LIST,
                (event: string) => next(
                  { type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE, payload: event }
                )
              );
              // 現在のチャットルーム取得
              websocket.on(
                ActionTypes.WebSocketEvents.WEBSOCKET_GET_CURRENT_ROOM,
                (event: string) => next(
                  { type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE, payload: event }
                )
              );
              // 切断
              websocket.on(
                ActionTypes.WebSocketEvents.WEBSOCKET_DISCONNECT,
                (event: string) => next(
                  { type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE, payload: event }
                )
              );
              // チャットルーム退室
              websocket.on(
                ActionTypes.WebSocketEvents.WEBSOCKET_LEAVE_ROOM,
                (event: string) => next(
                  { type: ActionTypes.WebSocketEvents.WEBSOCKET_MESSAGE, payload: event }
                )
              );

              isInitialization = true;
            }
            break;
          }

          // WebSocketへのデータ送信
          case ActionTypes.WebSocketEvents.WEBSOCKET_SEND: {
            switch(action.payload.type) {
              // チャットルーム作成
              case ActionTypes.WebSocketEvents.WEBSOCKET_CREATE_ROOM: {
                websocket.emit(
                  ActionTypes.WebSocketEvents.WEBSOCKET_CREATE_ROOM,
                  action.payload
                );
                break;
              }
              // チャットルーム入室
              case ActionTypes.WebSocketEvents.WEBSOCKET_JOIN_ROOM: {
                websocket.emit(
                  ActionTypes.WebSocketEvents.WEBSOCKET_JOIN_ROOM,
                  action.payload
                );
                break;
              }
              // 会話
              case ActionTypes.WebSocketEvents.WEBSOCKET_CONVERSATION: {
                websocket.emit(
                  ActionTypes.WebSocketEvents.WEBSOCKET_CONVERSATION,
                  action.payload
                );
                break;
              }
              // チャットルーム一覧取得
              case ActionTypes.WebSocketEvents.WEBSOCKET_GET_ROOMS_LIST: {
                websocket.emit(
                  ActionTypes.WebSocketEvents.WEBSOCKET_GET_ROOMS_LIST
                );
                break;
              }
              // 現在のチャットルーム取得
              case ActionTypes.WebSocketEvents.WEBSOCKET_GET_CURRENT_ROOM: {
                websocket.emit(
                  ActionTypes.WebSocketEvents.WEBSOCKET_GET_CURRENT_ROOM,
                  action.payload
                );
                break;
              }
              // チャットルーム退室
              case ActionTypes.WebSocketEvents.WEBSOCKET_LEAVE_ROOM: {
                websocket.emit(
                  ActionTypes.WebSocketEvents.WEBSOCKET_LEAVE_ROOM,
                  action.payload
                );
                break;
              }
            }
            break;
          }
        }
        return next(action);
      }
