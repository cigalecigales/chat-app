import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  name: string;
  onClick: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void);
  primary?: boolean;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <ButtonStyle onClick={this.props.onClick} primary={this.props.primary}>
        {this.props.name}
      </ButtonStyle>
    )
  }
}

const ButtonStyle = styled.div<{primary?: boolean}>`
  display: inline-block;
  padding: 8px 15px;
  background: ${props => props.primary ? '#ffd700' : '#dcdcdc'};
  border-radius: 5px;

  &:hover {
    cursor: pointer;
    background: ${props => props.primary ? '#ffa500' : '#d3d3d3'};
  }
`;

export default Button;
