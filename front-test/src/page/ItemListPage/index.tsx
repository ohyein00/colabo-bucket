import React, {useEffect,useState} from "react";
import PopupHeader from "../../components/organims/PopupHedaer";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {BucketResponse, ItemsDto} from "../../types/bucketItemType";
import {useItemsApi} from "../../hooks/useQueryHooks";

const ItemListPage = () => {
  const [items,setItems] = useState<ItemsDto>({})
  const {useGetItemsQuery} = useItemsApi()
  const {data} = useGetItemsQuery<BucketResponse>()

  return (
    <>
      <PopupHeader/>
      {/*form*/}
      <AddItemTemplate itemList={data?.items}/>
    </>
  )
}

export default ItemListPage
