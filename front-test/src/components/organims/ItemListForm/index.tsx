import React, {FormEvent} from "react";
import {DiscountDto, ItemsDto} from "../../../types/bucketItemType";
import Buttons from "../../atoms/Buttons";
import {useNavigate} from "react-router-dom";
import ItemCheckBoxArea from "../ItemCheckBoxArea";
import DiscountCheckBoxArea from "../../molcules/DiscountCheckBoxArea";

type ItemListFormProps = {
  itemList?: ItemsDto
  discountList?: DiscountDto
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
        <Buttons styled={{display:"block",width:'100%',margin:'15px 0 0 0',padding:'15px 20px'}}>완료</Buttons>
      </form>
    </>
  )
}
export default React.memo(ItemListForm)
