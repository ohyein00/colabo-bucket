import React, {ChangeEvent, SetStateAction, useCallback, useState} from "react";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import {useRecoilState} from "recoil";
import {bucketItemsQuery, bucketItemType, discountItemListType} from "../../../recoil/bucket";
import ItemCheckBox from "../../molcules/ItemCheckBox";
type ItemCheckBoxAreaProps={
  id: string
  setBucketItem: React.Dispatch<SetStateAction<bucketItemType[]>>
  bucketItem: bucketItemType[]
}

const ItemCheckBoxArea = React.memo((props: ItemCheckBoxAreaProps) => {
  const {id,setBucketItem,bucketItem} = props
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const [checkState, setCheckState] = useState<boolean>(!!bucketItem.find(item => item.id === id))

  const onHandleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    if (event.target.checked) {
      const val = event.target.value
      const initialData: bucketItemType = {
        id: val,
        name: data?.items[val].name || '',
        price: data?.items[val].price || 0,
      }
      if (initialData) {
        setBucketItem(currVal => [...currVal, initialData])
      }
      setCheckState(true)
    } else {
      const restItem = bucketItem.filter((item) => item.id !== event.target.value)
      setBucketItem(restItem)
      setCheckState(false)
    }
  }, [id])

  return (
    <>
      <ItemCheckBox
        label={data?.items[id].name || ''}
        id={id}
        value={id}
        checked={checkState}
        onHandleChange={onHandleChange}
        price={Number(data?.items[id].price) || 0}
      />
    </>
  )
})

export default ItemCheckBoxArea
