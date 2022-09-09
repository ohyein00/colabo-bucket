import React from "react";
import * as S from './index.styles'
import {DiscountInfoArea,ItemlistInfoArea} from "../../molcules/BucketItems";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import ItemSelectArea from "../ItemSelectArea";
type BucketContainerProps = {
}
const BucketContainer = (props: BucketContainerProps) => {

  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  return (
    <>
      <S.Container>
        <S.Container>
          { data &&
            Object.keys(data?.items).map((item) =>
              <div key={item}>
                <ItemlistInfoArea item={item} key={item}/>
                <ItemSelectArea item={item}/>
              </div>
            )
          }
       { data &&
            Object.keys(data?.discounts).map((item) =>
              <div>
                <DiscountInfoArea key={item} discount={item}/>
              </div>
            )
          }
        </S.Container>
      </S.Container>
    </>
  )
}
export default BucketContainer
