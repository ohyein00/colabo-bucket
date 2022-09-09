import styled from "styled-components";

export const Container = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  padding-right:15px;
  padding-bottom:10px;
  border-bottom:1px solid #efefef;
`
export const InputArea = styled.div`
  label{
    cursor: pointer;
    line-height:1.2;
  }
`
export const Input = styled.input`
  width: 0;
  height: 0;
  visibility: hidden;
  text-indent: -100000000px;
`
export const Icon = styled.div`
`
