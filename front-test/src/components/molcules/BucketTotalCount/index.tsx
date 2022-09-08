import Span from "../../atoms/Span";
import {Color} from "../../../contants/Color";
import UseCurrency from "../../../hooks/UseCurrency";
import React, {useEffect, useState} from "react";
import {useRecoilSnapshot, useRecoilValue} from "recoil";
import {calcBucketDiscount, calcItemsBucket, userDiscountBucket, userItemsBucket} from "../../../recoil/bucket";
import * as S from './index.styles'

const BucketTotalCount = ()=>{
  const userItemsBucketValue = useRecoilValue(userItemsBucket)
  const userDiscountBucketValue = useRecoilValue(userDiscountBucket)
  const [totalCount,setTotalCount] = useState(0)
  const snapshot = useRecoilSnapshot();

  useEffect(()=>{
    console.log('dd')
    let totalDiscount = 0
    Object.keys(userDiscountBucketValue).forEach((discount)=>{
      const discountState = snapshot.getLoadable(calcBucketDiscount(discount)).getValue();
      totalDiscount -= Number(discountState[discount].totalDiscount)
    })
    Object.keys(userItemsBucketValue).map((item)=>{
      const itemTotalPrice = snapshot.getLoadable(calcItemsBucket(item)).getValue();
      totalDiscount += itemTotalPrice[item].totalPrice
    })
    setTotalCount(totalDiscount)
  },[userItemsBucketValue,userDiscountBucketValue])

  return(
    <S.TotalArea>
      <Span styled={{fontSize: '0.9rem', color: Color.black}}>
        합계
      </Span>
      <Span styled={{fontSize: '1.1rem', color: Color.black,fontWeight:500}}>
        {UseCurrency(totalCount)}
      </Span>
    </S.TotalArea>
  )
}

export default BucketTotalCount
