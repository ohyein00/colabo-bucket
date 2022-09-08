import React from "react";
import * as S from './index.styles'
import {useRecoilCallback, useRecoilSnapshot, useRecoilValue} from "recoil";
import {calcBucketDiscount, calcItemsBucket, userDiscountBucket, userItemsBucket} from "../../../recoil/bucket";
import {DiscountInfoArea,ItemlistInfoArea} from "../../molcules/BucketItems";
type BucketContainerProps = {
}
const calTotalCount = (itemList:number[]) =>{
  return itemList.reduce(function add(sum,curVal){
    return sum + curVal
  },0)
}
const calDiscount = (total:number,rate:number)=>{
  return total * (1 - rate)
}
const BucketContainer = (props: BucketContainerProps) => {
  const userItemsBucketValue = useRecoilValue(userItemsBucket)
  const userDiscountBucketValue = useRecoilValue(userDiscountBucket)
  return (
    <>
      <S.Container>
        <S.Container>
          {
            userItemsBucketValue &&
            Object.keys(userItemsBucketValue).map((item) =>
              <S.Node key={item}>
                <ItemlistInfoArea item={item} key={item}/>
              </S.Node>
            )
          }
          {userDiscountBucketValue &&
            Object.keys(userDiscountBucketValue).map((item) =>
              <S.Node>
                <DiscountInfoArea key={item} discount={item}/>
              </S.Node>
            )
          }
        </S.Container>
      </S.Container>
    </>
  )
}
export default BucketContainer
