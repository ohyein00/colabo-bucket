import styled from "styled-components";
import {Color} from "../../../contants/Color";

export const Container = styled.div`
  position:relative;
  display:flex;
  align-items: center;
  padding:15px 20px;
  text-align:center;
  span{
    width:100%;
    text-align:center;
  }
  button{
    position:absolute;
    left:0;
    top:50%;
    transform:translateY(-50%)
  }
`
