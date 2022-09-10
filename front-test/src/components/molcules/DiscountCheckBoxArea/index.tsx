import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import {useRecoilState, useRecoilValue} from "recoil";
import {bucketItemsQuery, discountItemListType, discountItemsQuery} from "../../../recoil/bucket";
import React, {ChangeEvent, useCallback, useState} from "react";
import ItemCheckBox from "../ItemCheckBox";

const DiscountCheckBoxArea = (props: { id: string }) => {
  const {id} = props
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const bucketItemsVal = useRecoilValue(bucketItemsQuery)
  const [discountItems, setDiscountItems] = useRecoilState(discountItemsQuery)
  const [checkState, setCheckState] = useState<boolean>(!!discountItems.find(item => item.id === id))

  const onHandleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const val = event.target.value
      const initialData: discountItemListType = {
        id:val,
        name: data?.discounts[id].name || '',
        rate: data?.discounts[id].rate || 0,
        discountItems: [...bucketItemsVal] //현재 장바구니 기본 셋팅
      }
      if (initialData) {
        setDiscountItems(currVal => [...currVal, initialData])
      }
      setCheckState(true)
    } else {
      const restItem = discountItems.filter((item) => item.id !== event.target.value)
      setDiscountItems(restItem)
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
