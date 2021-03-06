import React from 'react';
import styled from 'styled-components';

interface InputTextProps {
  // テキストが入力された場合のイベント
  onInput: ((e: React.FormEvent<HTMLDivElement>) => void);
  // テキストからフォーカスが外れた場合のイベント
  onBlur: ((e: React.FormEvent<HTMLDivElement>) => void);
  // プレースホルダー用
  placeholder: string;
}

class InputText extends React.Component<InputTextProps> {
  render() {
    return (
      <InputTextStyle>
        <div
          contentEditable={true}
          onInput={this.props.onInput}
          onBlur={this.props.onBlur}
          className="text" 
          data-placeholder={this.props.placeholder}
        >
        </div>
      </InputTextStyle>
    )
  }
}

const InputTextStyle = styled.div`
  .text {
    border: 1px solid #dcdcdc;
    border-radius: 3px;
    padding: 10px;

    &:focus {
      border: 1px solid #d3d3d3;
    }
  }

  [data-placeholder]:empty:before{
    content: attr(data-placeholder);
    color: #888;
  }
`;

export default InputText;
