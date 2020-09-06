/**
 * チャットルーム作成
 */
export interface CreateRoom {
  roomName: string;
}

/**
 * チャットルーム入室
 */
export interface JoinRoom {
  roomId: string;
  userName: string;
}

/**
 * 会話
 */
export interface Conversation {
  roomId: string;
  userName: string;
  message: string;
}

/**
 * 現在のチャットルーム
 */
export interface CurrentRoom {
  roomId: string;
}
