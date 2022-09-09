import React, { useState} from "react";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {BucketResponse, DiscountDto} from "../../types/bucketItemType";
import {UseItemsApi} from "../../hooks/UseQueryHooks";

const DiscountListPage = () => {
  const [items,setItems] = useState<DiscountDto>({})
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  return (
    <>
      <AddItemTemplate discountList={data?.discounts}/>
    </>
  )
}

export default DiscountListPage

