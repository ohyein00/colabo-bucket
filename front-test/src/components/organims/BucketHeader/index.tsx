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
        <Buttons onClick={()=>onClick('/items')} styled={{fontSize: '0.9rem',padding:'10px 20px'}} colorType='gray'>시술</Buttons>
        <Buttons onClick={()=>onClick('/discount')} styled={{fontSize: '0.9rem',padding:'10px 20px'}} colorType='pink'>할인</Buttons>
        </S.ButtonArea>
      </S.Container>
    </>
  )
}
export default BucketHeader
