import React from 'react';

import ChatListItem from './chat-list-item';

export interface ChatListData {
  roomId: string;
  name: string;
  users: []
}

interface ChatListProps {
  data: ChatListData[];
}

class ChatList extends React.Component<ChatListProps> {
  render() {
    return (
      <div>
        {this.props.data && this.props.data.map((item: ChatListData) => {
          return <ChatListItem
                    name={item.name} 
                    numberOfPeople={item.users.length} 
                    roomId={item.roomId}
                    key={item.roomId}
                  />
        })}
      </div>
    )
  }
}

export default ChatList;
