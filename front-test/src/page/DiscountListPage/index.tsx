import React from "react";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {BucketResponse, } from "../../types/bucketItemType";
import {UseItemsApi} from "../../hooks/UseQueryHooks";
const DiscountListPage = () => {
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  return (
    <>
          <AddItemTemplate discountList={data?.discounts}/>
    </>
  )
}

export default DiscountListPage

