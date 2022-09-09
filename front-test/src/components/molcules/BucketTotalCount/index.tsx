import Span from "../../atoms/Span";
import {Color} from "../../../contants/Color";
import UseCurrency from "../../../hooks/UseCurrency";
import React, {useCallback, useEffect, useState} from "react";
import {useRecoilSnapshot, useRecoilValue} from "recoil";
import * as S from './index.styles'
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import {bucketItemsQuery, discountItemCount, discountItemsQuery} from "../../../recoil/bucket";

// 아이템리스트 더하기 함수
const calTotalCount = (itemList: number[]) => {
  return itemList.reduce(function add(sum, curVal) {
    return sum + curVal
  }, 0)
}

const BucketTotalCount = () =>{
  const snapshot = useRecoilSnapshot();
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const bucketItemValue = useRecoilValue(bucketItemsQuery)

  const calcTotalPrice = ()=>{
    let totalPrice = 0
    const priceList = bucketItemValue.map((item)=> item.price)
    totalPrice += calTotalCount(priceList)
    Object.keys(data?.discounts || []).forEach((item)=>{
      const bucketItems = snapshot.getLoadable(discountItemCount(item)).getValue();
      totalPrice += bucketItems.totalCount
    })
    return totalPrice
  }
  return(
    <S.TotalArea>
      <Span styled={{fontSize: '0.9rem', color: Color.black}}>
        합계
      </Span>
      <Span styled={{fontSize: '1.1rem', color: Color.black,fontWeight:500}}>
        {UseCurrency(calcTotalPrice())}
      </Span>
    </S.TotalArea>
  )
}

export default BucketTotalCount
