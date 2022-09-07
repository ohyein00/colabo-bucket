import React, {useState} from "react";
import * as S from './index.styles'
import BucketHeader from "../../components/organims/BucketHeader";
import Buttons from "../../components/atoms/Buttons";
import ItemCheckBox from "../../components/molcules/ItemCheckBox";
import {useRecoilValue} from "recoil";
import {userDiscountBucket, userItemsBucket} from "../../recoil/bucket";
import {useItemsApi} from "../../hooks/useQueryHooks";
import {BucketResponse} from "../../types/bucketItemType";
import BucketList from "../../components/organims/BucketList";

const BucketPage = () => {
  // recoil 장바구니 상태 가져오기
  // recoil 적용된 할인 상태 가져오기



  return (
    <>

      <S.Container>
        <BucketHeader/>
        <BucketList/>
        <Buttons>버튼이다아아</Buttons>
      </S.Container>


    </>
  )
}
export default BucketPage
