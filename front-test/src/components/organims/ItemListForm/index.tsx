import React, {useState} from "react";
import ItemCheckBox from "../../molcules/ItemCheckBox";
import {DiscountDto, ItemsDto} from "../../../types/bucketItemType";
import Buttons from "../../atoms/Buttons";

type ItemListFormProps = {
  itemList?: ItemsDto
  discountList?: DiscountDto
}

const ItemListForm = (props: ItemListFormProps) => {
  const {itemList,discountList} = props
  const [checkedList, setCheckedList] = useState<string[]>([])
  const onsubmit = () => {
  }
  return (
    <>
      <form onSubmit={onsubmit}>
        { itemList &&
          Object.keys(itemList).map((item) => (
            <ItemCheckBox label={itemList[item].name}
                          key={item}
                          id={item} value={item}
                          price={String(itemList[item].price)}
                          setChecked={setCheckedList}
                          checked={checkedList}
            />
          ))
        }
        { discountList &&
          Object.keys(discountList).map((item) => (
            <ItemCheckBox label={discountList[item].name}
                          key={item}
                          id={item} value={item}
                          rate={discountList[item].rate}
                          setChecked={setCheckedList}
                          checked={checkedList}
            />
          ))
        }
        <Buttons>완료</Buttons>
      </form>
    </>
  )
}
export default ItemListForm
