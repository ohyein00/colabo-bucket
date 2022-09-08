import React, {useEffect,useState} from "react";
import PopupHeader from "../../components/organims/PopupHedaer";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {BucketResponse, ItemsDto} from "../../types/bucketItemType";
import {UseItemsApi} from "../../hooks/UseQueryHooks";

const ItemListPage = () => {
  const [items,setItems] = useState<ItemsDto>({})
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()

  return (
    <>
      <PopupHeader/>
      {/*form*/}
      <AddItemTemplate itemList={data?.items}/>
    </>
  )
}

export default ItemListPage
