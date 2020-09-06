/**
 * アプリケーションステート
 */
export interface AppState {
  currentRoom: {
    id: string;
    name: string;
    users: {
      name: string;
      socketId: string;
    }[];
    logs: {
      logId: number;
      userName: string;
      time: string;
      message: string;
    }[];
  },
  currentUser: {
    name: string;
  },
  rooms: Room[]
}

/**
 * ユーザー
 */
export interface User {
  name: string;
  socketId: string;
}

/**
 * チャットルーム
 */
export interface Room {
  id: string;
  name: string;
  users: User[]
}
