import styled from "styled-components";
import {Color} from "../../../contants/Color";

export const Container = styled.div`
  display:flex;
  justify-content: space-between;
  width:100%;
`
export const Title = styled.h5`
  width:100%;
  font-size:0.9rem;
`
export const PriceArea = styled.div`
  margin-top:7px;
  padding-right:15px;
`
export const InfoContainer = styled.div``
export const Node = styled.div`
  width:100%;
  padding:10px 0;
  
  &+&{
    border-top:1px solid ${Color.lightGrey};  
  }
`
export const ItemArea = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
`
export const ButtonArea = styled.div`
  margin-top:10px;
`
