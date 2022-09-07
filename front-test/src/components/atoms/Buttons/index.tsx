import React from 'react';
import styled, {css} from 'styled-components';
import {Color} from "../../../contants/Color";

export type ButtonsProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  id?: string;
  styled?: React.CSSProperties;
  colorType?:'gray'|'pink'|'purple';
  [prop: string]: any;
}

export const StyledButton = styled.button<{ styled?: React.CSSProperties; colorType?:'gray'|'pink'|'purple'}>`
  display:${props => props.styled?.display ? props.styled?.display : 'inline-block'};
  background:${props => props.styled?.background ? props.styled?.background : '#835ece'};
  color: ${props => props.styled?.color ? props.styled?.color : '#fff'};
  padding: ${props => props.styled?.padding ? props.styled?.padding : '7px 20px'};
  border: ${props => props.styled?.border ? props.styled?.border : 'none'};
  font-size: ${props => props.styled?.fontSize ? props.styled?.fontSize : '1.2rem'};
  ${(props) => {
    if (props.colorType && props.colorType === 'purple') {
      return css`
        background:${Color.purple};
        color:${Color.white};
      `;
    }
    if (props.colorType && props.colorType === 'pink') {
      return css`
        background: ${Color.lightPink};
        color: ${Color.darkPink}
      `;
    }
    if (props.colorType && props.colorType === 'gray') {
      return css`
        background: ${Color.lightGrey};
        color: ${Color.darkGrey}
      `;
    }
  }}
`

function Buttons(props: ButtonsProps) {
  const {children, onClick, id, styled, ...restProps} = props
  return (
    <StyledButton id={id} onClick={onClick} styled={styled} {...restProps}>
      {children}
    </StyledButton>
  );
}


export default Buttons;
