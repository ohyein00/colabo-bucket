import React, {useState} from "react";
import ItemListForm from "../../components/organims/ItemListForm";
import {DiscountDto, ItemsDto} from "../../types/bucketItemType";
import PopupHeader from "../../components/organims/PopupHedaer";
import * as S from "./index.styles";

type AddItemTemplateProps = {
  itemList?: ItemsDto
  discountList?: DiscountDto
}
const AddItemTemplate = (props:AddItemTemplateProps) => {
  const {itemList,discountList} = props

  return (
    <>
      <S.Wrapper>
      <PopupHeader/>
      {itemList && <ItemListForm itemList={itemList}/> }
      {discountList && <ItemListForm discountList={discountList}/> }
      </S.Wrapper>
    </>
  )
}
export default AddItemTemplate
