import React, {ChangeEvent, useCallback, useState} from "react";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import {useRecoilState} from "recoil";
import {bucketItemsQuery, bucketItemType} from "../../../recoil/bucket";
import ItemCheckBox from "../../molcules/ItemCheckBox";

const ItemCheckBoxArea = React.memo((props: { id: string }) => {
  const {id} = props
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const [bucketItemsVal, setBucketItems] = useRecoilState(bucketItemsQuery)
  const [checkState, setCheckState] = useState<boolean>(!!bucketItemsVal.find(item => item.id === id))

  const onHandleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {

    if (event.target.checked) {
      const val = event.target.value
      const initialData: bucketItemType = {
        id: val,
        name: data?.items[val].name || '',
        price: data?.items[val].price || 0,
      }
      if (initialData) {
        setBucketItems(currVal => [...currVal, initialData])
      }
      setCheckState(true)
    } else {
      const restItem = bucketItemsVal.filter((item) => item.id !== event.target.value)
      setBucketItems(restItem)
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
