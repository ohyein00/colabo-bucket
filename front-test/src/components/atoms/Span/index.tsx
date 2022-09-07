import React from 'react';
import styled, {css} from 'styled-components';
import {Color} from "../../../contants/Color";

export type SpanProps = {
  children?: React.ReactNode;
  id?: string;
  styled?: React.CSSProperties;

  [prop: string]: any;
}

export const StyledSpan = styled.span<{ styled?: React.CSSProperties; }>`
  display: ${props => props.styled?.display ? props.styled?.display : 'inline'};
  background: ${props => props.styled?.background ? props.styled?.background : 'none'};
  color: ${props => props.styled?.color ? props.styled?.color : Color.black};
  font-weight: ${props => props.styled?.fontWeight ? props.styled?.fontWeight : 'normal'};
  padding: ${props => props.styled?.padding ? props.styled?.padding : '0'};
  border: ${props => props.styled?.border ? props.styled?.border : 'none'};
  font-size: ${props => props.styled?.fontSize ? props.styled?.fontSize : '1.2rem'};
`

const Span = (props: SpanProps) => {
  const {children, id, styled, ...restProps} = props
  return (
    <StyledSpan id={id} styled={styled} {...restProps}>
      {children}
    </StyledSpan>
  );
}


export default Span;
