import React from "react";
import Buttons from "../../atoms/Buttons";
import * as S from './index.styles'
import {useNavigate} from "react-router-dom";

const BucketHeader = () => {
  const navigate = useNavigate()
  const onClick = (path:string) =>{
    navigate(path)
  }
  return (
    <>
      <S.Container>
        <S.ButtonArea>
        <Buttons onClick={()=>onClick('/items')} styled={{fontSize: '0.8rem'}} colorType='gray'>시술</Buttons>
        <Buttons onClick={()=>onClick('/discount')} styled={{fontSize: '0.8rem'}} colorType='pink'>할인</Buttons>
        </S.ButtonArea>
      </S.Container>
    </>
  )
}
export default BucketHeader
