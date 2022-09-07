import React, {FormEvent, useState} from "react";
import ItemCheckBox from "../../molcules/ItemCheckBox";
import {DiscountDto, ItemsDto} from "../../../types/bucketItemType";
import Buttons from "../../atoms/Buttons";
import {useSetRecoilState} from "recoil";
import {userItemsBucket} from "../../../recoil/bucket";
import {userDiscountBucket} from "../../../recoil/bucket";
import {useNavigate} from "react-router-dom";

type ItemListFormProps = {
  itemList?: ItemsDto
  discountList?: DiscountDto
}

const ItemListForm = (props: ItemListFormProps) => {
  const {itemList, discountList} = props
  const navigate = useNavigate()
  const [itemCheckedList, setItemCheckedList] = useState<string[]>([])
  const [DiscountCheckedList, setDiscountCheckedList] = useState<string[]>([])
  const setUserItemsBucket = useSetRecoilState(userItemsBucket)
  const setUserDiscountBucket = useSetRecoilState(userDiscountBucket)

  const onsubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (itemList) {
      setUserItemsBucket({items: [...itemCheckedList]})
    }
    if (discountList) {
      /* 현재 버킷 아이템들 기본으로 담아주기 */
      const discountInitialData:{[key:string]:string[]} = {}
      DiscountCheckedList.forEach((item) => {
        discountInitialData[item] = itemCheckedList
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
