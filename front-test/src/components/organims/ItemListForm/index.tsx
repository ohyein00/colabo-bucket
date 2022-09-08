import React, {FormEvent, useState} from "react";
import ItemCheckBox from "../../molcules/ItemCheckBox";
import {DiscountDto, ItemsDto} from "../../../types/bucketItemType";
import Buttons from "../../atoms/Buttons";
import {useSetRecoilState, useRecoilState, useRecoilSnapshot} from "recoil";
import {calcBucketDiscount, UserDiscountBucketType, userItemsBucket, UserItemsBucketType} from "../../../recoil/bucket";
import {userDiscountBucket} from "../../../recoil/bucket";
import {useNavigate} from "react-router-dom";

type ItemListFormProps = {
  itemList?: ItemsDto
  discountList?: DiscountDto
}

const ItemListForm = (props: ItemListFormProps) => {
  const {itemList, discountList} = props
  const navigate = useNavigate()
  const [userItemsBucketVal,setUserItemsBucket] = useRecoilState(userItemsBucket)
  const [userDiscountBucketVal,setUserDiscountBucket] = useRecoilState(userDiscountBucket)
  const setCaclBucket = useSetRecoilState(calcBucketDiscount(''))
  const [itemCheckedList, setItemCheckedList] = useState<string[]>(Object.keys(userItemsBucketVal) || [])
  const [DiscountCheckedList, setDiscountCheckedList] = useState<string[]>(Object.keys(userDiscountBucketVal) || [])

  const snapshot = useRecoilSnapshot();

  const onsubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (itemList && itemCheckedList) {
      const itemsInitialData:UserItemsBucketType = {}
      itemCheckedList.forEach((item) => {
        if(!itemsInitialData[item]) { /* 기존에 없는 아이템일 경우 갯수 하나씩 기본으로 담아주기 */
          itemsInitialData[item] = {count: 1,name:itemList[item].name,price:itemList[item].price,totalPrice:itemList[item].price}
        }
      })
      setUserItemsBucket(itemsInitialData)
    }
    if (discountList && DiscountCheckedList) {
      /* 현재 버킷 아이템들 기본으로 담아주기 */
      const discountInitialData:UserDiscountBucketType = {}
      DiscountCheckedList.forEach((item) => {
        /* 기존에 담은 할인 대상이 있을 경우 */
        if(userDiscountBucketVal[item]){
          discountInitialData[item] = {discountItemList:userDiscountBucketVal[item].discountItemList}
        }else{
          discountInitialData[item] = {discountItemList:itemCheckedList}
        }
      })
      setUserDiscountBucket(discountInitialData)
    }
    navigate(-1)
  }
  return (
    <>
      <form onSubmit={onsubmit}>
        {itemList &&
          Object.keys(itemList).map((item) => (
            <ItemCheckBox label={itemList[item].name}
                          key={item}
                          id={item} value={item}
                          price={String(itemList[item].price)}
                          setChecked={setItemCheckedList}
                          checked={itemCheckedList}
            />
          ))
        }
        {discountList &&
          Object.keys(discountList).map((item) => (
            <ItemCheckBox label={discountList[item].name}
                          key={item}
                          id={item} value={item}
                          rate={discountList[item].rate}
                          setChecked={setDiscountCheckedList}
                          checked={DiscountCheckedList}
            />
          ))
        }
        <Buttons>완료</Buttons>
      </form>
    </>
  )
}
export default React.memo(ItemListForm)
