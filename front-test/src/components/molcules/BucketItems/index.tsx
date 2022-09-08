import React, {ChangeEvent, useEffect, useState} from "react";
import * as S from './index.styles'
import Span from "../../atoms/Span";
import {Color} from "../../../contants/Color";
import {useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {calcBucketDiscount, calcItemsBucket, userDiscountBucket, userItemsBucket} from "../../../recoil/bucket";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import UseCurrency from "../../../hooks/UseCurrency";

type BucketListProps = {
  bucketData: BucketResponse | undefined

}
//할인정보 key를 넘기면 현재 값을 계산해서 넘겨주는 component
export const DiscountInfoArea = ({discount}: { discount: string }) => {
  const discountVal = useRecoilValue(calcBucketDiscount(discount))
  return (
    <S.InfoContainer>
      <S.PriceArea>
        <Span styled={{fontSize: '0.8rem', color: Color.darkGrey, display: 'block'}}>
          {discountVal[discount].name}
        </Span>
        <Span styled={{fontSize: '0.8rem', color: Color.darkGrey, display: 'block'}}>
          {
            discountVal[discount].discountItemList.map((item, index) => {
              const name = item.count > 1 ? `${item.name}X${item.count}` : `${item.name}`
              return index + 1 < discountVal[discount].discountItemList.length ? name + ', ' : name
            })
          }
        </Span>
        <Span styled={{fontSize: '0.8rem', color: Color.darkPink, display: 'block'}}>
          <>
            {UseCurrency(discountVal[discount].totalDiscount)}
            ({discountVal[discount].rate}%)
          </>
        </Span>
      </S.PriceArea>
    </S.InfoContainer>
  )
}
//아이템 key를 넘기면 현재 값을 계산해서 넘겨주는 component
export const ItemlistInfoArea = ({item}: { item: string }) => {
  const calcItemsBucketVal = useRecoilValue(calcItemsBucket(item))

  return (
    <>
      <S.Title>
        {calcItemsBucketVal[item].name}
      </S.Title>
      <S.InfoContainer>
        <S.PriceArea>
          <Span styled={{fontSize: '0.8rem', display: 'block'}}>
            <span>{calcItemsBucketVal[item].totalPrice}</span>원
          </Span>
        </S.PriceArea>
      </S.InfoContainer>
    </>
  )
}
