import React, {useEffect,useState} from "react";
import PopupHeader from "../../components/organims/PopupHedaer";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {BucketResponse, ItemsDto} from "../../types/bucketItemType";
import {UseItemsApi} from "../../hooks/UseQueryHooks";
import * as S from './index.styles'
const ItemListPage = () => {
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()

  return (
    <>
      <S.Wrapper>
        <S.Container>
          <AddItemTemplate itemList={data?.items}/>
        </S.Container>
      </S.Wrapper>
    </>
  )
}

export default ItemListPage
