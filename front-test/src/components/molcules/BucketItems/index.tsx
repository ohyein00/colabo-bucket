import React, {useEffect, useState} from "react";
import * as S from './index.styles'
import Span from "../../atoms/Span";
import {Color} from "../../../contants/Color";
import {
  useRecoilValue,
} from "recoil";

import {
  bucketItemsQuery, bucketItemType, discountItemCount, discountItemsQuery,
} from "../../../recoil/bucket";
import {BucketResponse} from "../../../types/bucketItemType";
import UseCurrency from "../../../hooks/UseCurrency";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";


export const DiscountInfoArea = ({id}: { id: string }) => {
  const discountItemsValue = useRecoilValue(discountItemsQuery)
  const discountItemCountValue = useRecoilValue(discountItemCount(id))
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  return (
    <>
      {
        <S.Node>
          <S.PriceArea>
            <Span styled={{fontSize: '0.8rem', color: Color.darkGrey, display: 'block'}}>
              {data?.discounts[id].name}
            </Span>
            <Span styled={{fontSize: '0.8rem', color: Color.darkGrey, display: 'block'}}>
              {
                Object.keys(discountItemCountValue.discountItemLength).sort().map((item,index) =>
                  <>
                    {data?.items[item].name || ''}
                    {
                      discountItemCountValue.discountItemLength[item] >= 1 &&
                      `X${discountItemCountValue.discountItemLength[item]}`
                    }
                    {
                      index + 1 < Object.keys(discountItemCountValue.discountItemLength).length &&
                      `, `
                    }
                  </>
                )
              }
            </Span>
            <Span styled={{fontSize: '0.8rem', color: Color.darkPink, display: 'block'}}>
              <>
                {UseCurrency(discountItemCountValue.totalCount)}
                ({Math.floor(Number(data?.discounts[id].rate) * 100)}%)
              </>
            </Span>
          </S.PriceArea>
        </S.Node>
      }
    </>
  )
}
//아이템 key를 넘기면 현재 값을 계산해서 넘겨주는 component
export const ItemlistInfoArea = ({id}: { id: string }) => {
  const bucketItemsVal = useRecoilValue(bucketItemsQuery)
  const [itemEl, setItemEl] = useState<bucketItemType[]>()
  useEffect(() => {
    const curVal = bucketItemsVal.filter((item) => item.id === id)
    setItemEl(curVal)
  }, [bucketItemsVal])

  return (
    <>
      {
        !!itemEl?.length &&
        (
          <S.Node>
            <S.Title>
              {itemEl[0]?.name}
            </S.Title>
            <S.InfoContainer>
              <S.PriceArea>
                <Span styled={{fontSize: '0.8rem', display: 'block'}}>
                  <span>{Number(itemEl[0]?.price) * Number(itemEl.length)}</span>원
                </Span>
              </S.PriceArea>
            </S.InfoContainer>
          </S.Node>
        )
      }
    </>
  )
}

