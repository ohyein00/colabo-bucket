import React, {useState} from "react";
import ItemListForm from "../../components/organims/ItemListForm";
import {DiscountDto, ItemsDto} from "../../types/bucketItemType";
import PopupHeader from "../../components/organims/PopupHedaer";

type AddItemTemplateProps = {
  itemList?: ItemsDto
  discountList?: DiscountDto
}
const AddItemTemplate = (props:AddItemTemplateProps) => {
  const {itemList,discountList} = props
  return (
    <>
      <PopupHeader/>
      {itemList && <ItemListForm itemList={itemList}/> }
      {discountList && <ItemListForm discountList={discountList}/> }
    </>
  )
}
export default AddItemTemplate
