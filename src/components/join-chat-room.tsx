import React from 'react';
import styled from 'styled-components';

import InputText from './input-text';
import Button from './button';

interface JoinChatRoomModalProps {
  // ユーザー名が入力された場合のイベント
  onInputText: ((e: React.FormEvent<HTMLDivElement>) => void);
  // ユーザー名入力欄からフォーカスが外れた場合のイベント
  onBlurText: ((e: React.FormEvent<HTMLDivElement>) => void);
  // 入室ボタンがクリックされた場合のイベント
  onClickButton: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void);
}

class JoinChatRoomModal extends React.Component<JoinChatRoomModalProps> {
  render() {
    return (
      <JoinChatRoomModalStyle>
        <div className="input">
          <InputText
            placeholder="ユーザー名"
            onInput={this.props.onInputText}
            onBlur={this.props.onBlurText}
          />
        </div>
        <div className="button">
          <Button
            name="入室"
            onClick={this.props.onClickButton}
            primary
          />
        </div>
      </JoinChatRoomModalStyle>
    )
  }
}

const JoinChatRoomModalStyle = styled.div`
  display: grid;
  grid-template-rows: 80px;
  grid-template-columns: 1fr 80px;
  align-items: center;

  .input {
    padding: 10px;
  }
`;

export default JoinChatRoomModal;
