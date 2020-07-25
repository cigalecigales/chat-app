import React from 'react';

import User from './user';

export interface UserData {
  name: string;
  id: string;
  isMe: boolean;
}

interface UserListProps {
  users: UserData[];
}

class UserList extends React.Component<UserListProps> {
  render() {
    return (
      <div>
        {this.props.users.map((item: UserData) => {
          return <User name={item.name} key={item.id} />
        })}
      </div>
    )
  }
}

export default UserList;
