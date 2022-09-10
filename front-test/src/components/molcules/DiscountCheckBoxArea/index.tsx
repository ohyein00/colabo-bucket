import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import {useRecoilState, useRecoilValue} from "recoil";
import {bucketItemsQuery, bucketItemType, discountItemListType, discountItemsQuery} from "../../../recoil/bucket";
import React, {ChangeEvent, SetStateAction, useCallback, useState} from "react";
import ItemCheckBox from "../ItemCheckBox";

type DiscountCheckBoxAreaProps={
  id: string
  setDiscountBucketItem: React.Dispatch<SetStateAction<discountItemListType[]>>
  discountBucketItem: discountItemListType[]
}
const DiscountCheckBoxArea = (props:DiscountCheckBoxAreaProps) => {
  const {id,discountBucketItem,setDiscountBucketItem} = props
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const bucketItemsVal = useRecoilValue(bucketItemsQuery)
  const [checkState, setCheckState] = useState<boolean>(!!discountBucketItem.find(item => item.id === id))

  const onHandleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const val = event.target.value
      const initialData: discountItemListType = {
        id: val,
        name: data?.discounts[id].name || '',
        rate: data?.discounts[id].rate || 0,
        discountItems: [...bucketItemsVal] //담는 기준 현재 장바구니 기본 셋팅
      }
      setDiscountBucketItem(currVal => [...currVal, initialData])

      setCheckState(true)
    } else {
      const restItem = discountBucketItem.filter((item) => item.id !== event.target.value)
      setDiscountBucketItem(restItem)
      setCheckState(false)
    }
  }, [id])

  return (
    <>
      <ItemCheckBox
        label={data?.discounts[id].name || ''}
        id={id}
        value={id}

        checked={checkState}
        onHandleChange={onHandleChange}
        rate={data?.discounts[id].rate || 0}
      />
    </>
  )
}

export default DiscountCheckBoxArea
