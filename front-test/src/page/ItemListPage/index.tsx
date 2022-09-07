import React, {useEffect,useState} from "react";
import * as S from './index.styles'
import PopupHeader from "../../components/organims/PopupHedaer";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {getItems} from "../../service/itemsApi";
import {BucketResponse, ItemsDto} from "../../types/bucketItemType";

const ItemListPage = () => {
  const [items,setItems] = useState<ItemsDto>({})
  useEffect(() => {
    (async () => {
        try {
          const res = await getItems<BucketResponse>()
          setItems(res.items)
        } catch (e) {
          console.log(e)
        }
      }
    )()
  }, [])
  return (
    <>
      <PopupHeader/>
      {/*form*/}
      <AddItemTemplate itemList={items}/>
    </>
  )
}

export default ItemListPage
