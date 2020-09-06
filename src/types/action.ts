enum WebSocketEvents {
  WEBSOCKET_CONNECT          = '@@WEBSOCKET/CONNECT',
  WEBSOCKET_OPEN             = '@@WEBSOCKET/OPEN',
  WEBSOCKET_SEND             = '@@WEBSOCKET/SEND',
  WEBSOCKET_MESSAGE          = '@@WEBSOCKET/MESSAGE',
  WEBSOCKET_CLOSE            = '@@WEBSOCKET/CLOSE',

  WEBSOCKET_CREATE_ROOM      = 'create-room',
  WEBSOCKET_JOIN_ROOM        = 'join-room',
  WEBSOCKET_CONVERSATION     = 'conversation',
  WEBSOCKET_LEAVE_ROOM       = 'leave-room',
  WEBSOCKET_GET_ROOMS_LIST   = 'get-rooms-list',
  WEBSOCKET_GET_CURRENT_ROOM = 'get-current-room',
  WEBSOCKET_DISCONNECT       = 'disconnect'
}

enum Events {
  NORMAL                     = '@@NORMAL/MESSAGE',

  CLEAR_CURRENT_ROOM         = 'clear-current-room',
  SET_CURRENT_ROOM_ID        = 'set-current-room-id'
}

export const ActionTypes = {
  WebSocketEvents: WebSocketEvents,
  Events: Events
};
