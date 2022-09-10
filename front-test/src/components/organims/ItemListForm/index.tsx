import React, {FormEvent,useState} from "react";
import {DiscountDto, ItemsDto} from "../../../types/bucketItemType";
import Buttons from "../../atoms/Buttons";
import {useNavigate} from "react-router-dom";
import ItemCheckBoxArea from "../ItemCheckBoxArea";
import DiscountCheckBoxArea from "../../molcules/DiscountCheckBoxArea";
import {bucketItemsQuery, bucketItemType, discountItemListType} from "../../../recoil/bucket";
import {useRecoilState} from "recoil";
import {discountItemsQuery} from "../../../recoil/bucket";
type ItemListFormProps = {
  itemList?: ItemsDto
  discountList?: DiscountDto
}

const ItemListForm = (props: ItemListFormProps) => {
  const {itemList, discountList} = props
  const navigate = useNavigate()
  const [discountItems, setDiscountItems] = useRecoilState(discountItemsQuery)
  const [items, setItems] = useRecoilState(bucketItemsQuery)
  const [discountBucketItem,setDiscountBucketItem] = useState<discountItemListType[]>([...discountItems])
  const [bucketItem,setBucketItem] = useState<bucketItemType[]>([...Array.from(new Set(items))])
  const minCount = 1

  const onsubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if(discountList && discountBucketItem.length<minCount){
      alert(`할인을 ${minCount}개 이상 담아주세요`)
      return
    }else{
      setDiscountItems(discountBucketItem)
    }

    if(itemList && bucketItem.length<minCount){
      alert(`시술을 ${minCount}개 이상 담아주세요`)
      return
    }else{
      setItems(bucketItem)
    }

    navigate(-1)
  }

  return (
    <>
      <form onSubmit={onsubmit}>
        {itemList &&
          Object.keys(itemList).map((item) => (
            <ItemCheckBoxArea bucketItem={bucketItem} setBucketItem={setBucketItem} id={item} key={item}/>
          ))
        }
        {discountList &&
          Object.keys(discountList).map((item) => (
            <DiscountCheckBoxArea discountBucketItem={discountBucketItem}
                                  setDiscountBucketItem={setDiscountBucketItem} id={item} key={item}/>
          ))
        }
        <Buttons styled={{display:"block",width:'100%',margin:'15px 0 0 0',padding:'15px 20px'}}>완료</Buttons>
      </form>
    </>
  )
}
export default React.memo(ItemListForm)
