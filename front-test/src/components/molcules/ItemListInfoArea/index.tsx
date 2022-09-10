import {useRecoilValue} from "recoil";
import {bucketItemsQuery, bucketItemType} from "../../../recoil/bucket";
import React, {useEffect, useState} from "react";
import * as S from "../DiscountInfoArea/index.styles";
import Span from "../../atoms/Span";
import {Color} from "../../../contants/Color";
import UseCurrency from "../../../hooks/UseCurrency";

/**
 *  시술 목록 영역
 *  */
export const ItemlistInfoArea = ({id}: { id: string }) => {
  const bucketItemsVal = useRecoilValue(bucketItemsQuery)
  const [itemEl, setItemEl] = useState<bucketItemType[]>()
  useEffect(() => {
    const curVal = bucketItemsVal.filter((item) => item.id === id)
    setItemEl(curVal)
  }, [bucketItemsVal])
  const itemPrice = UseCurrency(itemEl ? Number(itemEl[0]?.price) * Number(itemEl.length) : 0)
  return (
    <>
      {
        !!itemEl?.length && // 장바구니에 담겨있는 것만
        (
          <S.Node>
            <S.Title>
              <Span styled={{fontSize: '0.9rem', fontWeight:'bold', color: Color.black, display: 'block',margin:'0 0 10px 0'}}>
              {itemEl[0]?.name}
              </Span>
            </S.Title>
            <S.InfoContainer>
              <S.PriceArea>
                <Span styled={{fontSize: '0.8rem', display: 'block'}}>
                  <span>{itemPrice}</span>
                </Span>
              </S.PriceArea>
            </S.InfoContainer>
          </S.Node>
        )
      }
    </>
  )
}
