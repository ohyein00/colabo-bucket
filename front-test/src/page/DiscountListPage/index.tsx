import React, { useState} from "react";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {BucketResponse, DiscountDto} from "../../types/bucketItemType";
import {UseItemsApi} from "../../hooks/UseQueryHooks";
import * as S from './index.styles'

const DiscountListPage = () => {
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  return (
    <>
      <S.Wrapper>
        <S.Container>
          <AddItemTemplate discountList={data?.discounts}/>
        </S.Container>
      </S.Wrapper>
    </>
  )
}

export default DiscountListPage

