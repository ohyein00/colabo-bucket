import Span from "../../atoms/Span";
import {Color} from "../../../contants/Color";
import UseCurrency from "../../../hooks/UseCurrency";
import React, {useEffect, useState} from "react";
import {useRecoilSnapshot, useRecoilValue} from "recoil";
import {calcBucketDiscount, calcItemsBucket, userDiscountBucket} from "../../../recoil/bucket";
import * as S from './index.styles'
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";

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

  let totalPrice = 0
   Object.keys(data?.items || []).map((item)=>{
    const bucketItems = snapshot.getLoadable(calcItemsBucket(item)).getValue();
     totalPrice += bucketItems[item].totalPrice
  })
  Object.keys(data?.discounts || []).map((discount)=>{
    const discountItemList = snapshot.getLoadable(calcBucketDiscount(discount)).getValue();
    const itemPriceList = discountItemList[discount].discountItemList?.map((item)=>{
      return Number(data?.items[item].price) * Number(data?.discounts[discount].rate)
    })
    const totalCount = calTotalCount(itemPriceList || [0])
  })
  return(
    <S.TotalArea>
      <Span styled={{fontSize: '0.9rem', color: Color.black}}>
        합계
      </Span>
      <Span styled={{fontSize: '1.1rem', color: Color.black,fontWeight:500}}>
        {UseCurrency(totalPrice)}
      </Span>
    </S.TotalArea>
  )
}

export default BucketTotalCount
