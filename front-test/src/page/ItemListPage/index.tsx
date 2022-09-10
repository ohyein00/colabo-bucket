import React from "react";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {BucketResponse} from "../../types/bucketItemType";
import {UseItemsApi} from "../../hooks/UseQueryHooks";

const ItemListPage = () => {
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()

  return (
    <>
          <AddItemTemplate itemList={data?.items}/>
    </>
  )
}

export default ItemListPage
