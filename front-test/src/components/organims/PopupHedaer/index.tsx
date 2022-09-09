import React from "react";
import * as S from './index.styles'
import Span from "../../atoms/Span";
import Buttons from "../../atoms/Buttons";
import {Color} from "../../../contants/Color";
import {useNavigate} from "react-router-dom";

const PopupHeader = () => {
  const navigate = useNavigate()
  return (
    <>
      <S.Container>
        <Buttons onClick={()=>navigate(-1)} styled={{background:'none'}}>
          <Span styled={{fontSize: '1.2rem', color: Color.darkPink}}>
            ❌
          </Span>
        </Buttons>
        <Span styled={{fontSize: '1.1rem',display:'block;'}}>할인</Span>
      </S.Container>
    </>
  )
}
export default PopupHeader
