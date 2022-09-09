import React, {ChangeEvent, useEffect, useState} from "react";
import * as S from './index.styles'
import Span from "../../atoms/Span";
import {Color} from "../../../contants/Color";
import {
  useRecoilSnapshot,
  useRecoilValue,
} from "recoil";

import {
  calcBucketDiscount,
  calcItemsBucket,
} from "../../../recoil/bucket";
import {BucketResponse} from "../../../types/bucketItemType";
import UseCurrency from "../../../hooks/UseCurrency";

type BucketListProps = {
  bucketData: BucketResponse | undefined

}
//할인정보 key를 넘기면 현재 값을 계산해서 넘겨주는 component
export const DiscountInfoArea = ({discount}: { discount: string }) => {
  const calcBucketDiscountVal = useRecoilValue(calcBucketDiscount(discount))
  const snapshot = useRecoilSnapshot();

  return (
    <>
      {
        Number(calcBucketDiscountVal[discount].discountItemList?.length) >0 &&
        <S.Node>
          <S.PriceArea>
            <Span styled={{fontSize: '0.8rem', color: Color.darkGrey, display: 'block'}}>
              {calcBucketDiscountVal[discount].name}
            </Span>
            <Span styled={{fontSize: '0.8rem', color: Color.darkGrey, display: 'block'}}>
              {
                calcBucketDiscountVal[discount].discountItemList?.map((item, index) => {
                  const itemTotalPrice = snapshot.getLoadable(calcItemsBucket(item)).getValue();
                  const name = itemTotalPrice[item].count > 1 ?
                    `${itemTotalPrice[item].name}X${itemTotalPrice[item].count}` : `${itemTotalPrice[item].name}`
                  return index +1 < Number(calcBucketDiscountVal[discount].discountItemList?.length) ? `${name}, `:name
                })
              }
            </Span>
            <Span styled={{fontSize: '0.8rem', color: Color.darkPink, display: 'block'}}>
              <>
                {UseCurrency(calcBucketDiscountVal[discount].totalDiscount)}
                ({calcBucketDiscountVal[discount].rate}%)
              </>
            </Span>
          </S.PriceArea>
        </S.Node>
      }
    </>
  )
}
//아이템 key를 넘기면 현재 값을 계산해서 넘겨주는 component
export const ItemlistInfoArea = ({item}: { item: string }) => {
  const calcItemsBucketVal = useRecoilValue(calcItemsBucket(item))
  return (
    <>
      {
        calcItemsBucketVal && calcItemsBucketVal[item].count > 0 &&
        (
          <S.Node>
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
          </S.Node>
        )
      }
    </>
  )
}
