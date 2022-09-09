import React, {ChangeEvent, FormEvent, useCallback, useState} from "react";
import ItemCheckBox from "../../molcules/ItemCheckBox";
import {BucketResponse, DiscountDto, ItemsDto} from "../../../types/bucketItemType";
import Buttons from "../../atoms/Buttons";
import {useRecoilState,useRecoilValue} from "recoil";
import {
  bucketItemsQuery, bucketItemType,
discountItemListType, discountItemsQuery,

} from "../../../recoil/bucket";
import {useNavigate} from "react-router-dom";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";

type ItemListFormProps = {
  itemList?: ItemsDto
  discountList?: DiscountDto
}


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
const ItemListForm = (props: ItemListFormProps) => {
  const {itemList, discountList} = props
  const navigate = useNavigate()

  const onsubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(-1)
  }
  return (
    <>
      <form onSubmit={onsubmit}>
        {itemList &&
          Object.keys(itemList).map((item) => (
            <ItemCheckBoxArea id={item} key={item}/>
          ))
        }
        {discountList &&
          Object.keys(discountList).map((item) => (
            <DiscountCheckBoxArea id={item} key={item}/>
          ))
        }
        <Buttons>완료</Buttons>
      </form>
    </>
  )
}
export default React.memo(ItemListForm)
