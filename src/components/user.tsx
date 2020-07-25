import React from 'react';
import styled from 'styled-components';

interface UserProps {
  name: string;
}

class User extends React.Component<UserProps> {
  render() {
    return (
      <UserStyle>
        <div>{this.props.name}</div>
      </UserStyle>
    )
  }
}

const UserStyle = styled.div`
  color: #ffffff;
  margin: 5px 0px;
`;

export default User;
