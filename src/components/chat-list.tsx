import React from 'react';

import ChatListItem from './chat-list-item';

export interface ChatListData {
  name: string;
  numberOfPeople: number;
  roomId: number;
}

interface ChatListProps {
  data: ChatListData[];
}

class ChatList extends React.Component<ChatListProps> {
  render() {
    return (
      <div>
        {this.props.data.map((item: ChatListData) => {
          return <ChatListItem
                    name={item.name} 
                    numberOfPeople={item.numberOfPeople} 
                    roomId={item.roomId}
                    key={item.roomId} />
        })}
      </div>
    )
  }
}

export default ChatList;
