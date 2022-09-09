import React, {useState} from "react";
import * as S from './index.styles'
import BucketTemplate from "../../templates/BucketTemplate";

const BucketPage = () => {
  // recoil 장바구니 상태 가져오기
  // recoil 적용된 할인 상태 가져오기



  return (
    <>

      <S.Container>
        <BucketTemplate/>
      </S.Container>


    </>
  )
}
export default BucketPage
