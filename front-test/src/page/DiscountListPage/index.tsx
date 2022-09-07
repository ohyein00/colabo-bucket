import React, {useEffect, useState} from "react";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {BucketResponse, DiscountDto} from "../../types/bucketItemType";
import {getItems} from "../../service/itemsApi";
import {useItemsApi} from "../../hooks/useQueryHooks";

const DiscountListPage = () => {
  const [items,setItems] = useState<DiscountDto>({})
  const {useGetItemsQuery} = useItemsApi()
  const {data} = useGetItemsQuery<BucketResponse>()
  return (
    <>
      <AddItemTemplate discountList={data?.discounts}/>
    </>
  )
}

export default DiscountListPage
