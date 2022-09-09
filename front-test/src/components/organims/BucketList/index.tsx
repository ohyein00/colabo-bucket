import React, {useEffect} from "react";
import * as S from './index.styles'
import {DiscountInfoArea} from "../../molcules/DiscountInfoArea";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import ItemSelectArea from "../ItemSelectArea";
import {useRecoilValue} from "recoil";
import {discountItemsQuery} from "../../../recoil/bucket";
import {ItemlistInfoArea} from "../../molcules/ItemListInfoArea";

const BucketContainer = () => {
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const discountItemsValue = useRecoilValue(discountItemsQuery)

  return (
    <>
        <S.Container>
          { data &&
            Object.keys(data?.items).map((item) =>
              <S.ItemArea key={item}>
                <ItemlistInfoArea id={item} key={item}/>
                <ItemSelectArea id={item}/>
              </S.ItemArea>
            )
          }
       { data &&
         discountItemsValue.map((item) =>
              <div>
                <DiscountInfoArea id={item.id} key={item.id}/>
              </div>
            )
          }
        </S.Container>
    </>
  )
}
export default BucketContainer
