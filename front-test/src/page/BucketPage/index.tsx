import React, {useState} from "react";
import * as S from './index.styles'
import BucketHeader from "../../components/organims/BucketHeader";
import Buttons from "../../components/atoms/Buttons";
import ItemCheckBox from "../../components/molcules/ItemCheckBox";

const BucketPage = () => {
  // recoil 장바구니 상태 가져오기
  // recoil 적용된 할인 상태 가져오기


  return (
    <>
      <BucketHeader/>
      <S.Container>장바구니</S.Container>
      <Buttons>버튼이다아아</Buttons>

    </>
  )
}
export default BucketPage
