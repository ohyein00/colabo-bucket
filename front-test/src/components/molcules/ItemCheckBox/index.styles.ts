import styled from "styled-components";

export const Container = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding:10px 15px 10px 0;
  border-bottom:1px solid #efefef;
`
export const InputArea = styled.div`
  label{
    cursor: pointer;
    line-height:1.2;
  }
`
export const Input = styled.input`
  position:absolute;
  left:-10000px;
  width: 0;
  height: 0;
  visibility: hidden;
  text-indent: -100000000px;
`
export const Icon = styled.div`
`
