import React from 'react';
import styled from 'styled-components';

import InputText from './input-text';
import Button from './button';

interface CreateMessageProps {
  isJoin: boolean;
  onInput: ((e: React.FormEvent<HTMLDivElement>) => void);
  onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void);
}

class CreateMessage extends React.Component<CreateMessageProps> {
  render() {
    return (
      <CreateMessageStyle isJoin={this.props.isJoin}>
        <div className="input">
          <div className="notJoin">
            <InputText placeholder="ユーザー名" onInput={this.props.onInput} />
          </div>
          <div className="join">
            <InputText placeholder="メッセージ" onInput={this.props.onInput} />
          </div>
        </div>
        <div className="button">
          <div className="notJoin">
            <Button name="入室" onClick={this.props.onClick} primary />
          </div>
          <div className="join">
            <Button name="投稿" onClick={this.props.onClick} primary />
          </div>
        </div>
      </CreateMessageStyle>
    )
  }
}

const CreateMessageStyle = styled.div<{isJoin: boolean}>`
  display: grid;
  grid-template-rows: 80px;
  grid-template-columns: 1fr 80px;
  align-items: center;

  .input {
    padding: 10px;
  }

  .notJoin {
    display: ${props => !props.isJoin ? 'block' : 'none'};
  }

  .join {
    display: ${props => props.isJoin ? 'block' : 'none'};
  }
`;

export default CreateMessage;
