import {BucketResponse} from "../types/bucketItemType";
import {useRecoilValue} from "recoil";
import {calcBucketDiscount, userDiscountBucket} from "../recoil/bucket";
import {UseItemsApi} from "./UseQueryHooks";

const UseCurrency = (price:number)=>{
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const currency = data?.currency_code || 'KRW'
  switch(currency){
    case 'KRW':
      return `${price}원`
    case 'USD':
      return `$${price}`
  }
}

export default UseCurrency
