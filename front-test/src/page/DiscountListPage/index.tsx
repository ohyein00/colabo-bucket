import React, {useEffect, useState} from "react";
import AddItemTemplate from "../../templates/AddItemTemplate";
import {BucketResponse, DiscountDto} from "../../types/bucketItemType";
import {getItems} from "../../service/itemsApi";

const DiscountListPage = () => {
  const [items,setItems] = useState<DiscountDto>({})
  useEffect(() => {
    (async () => {
        try {
          const res = await getItems<BucketResponse>()
          setItems(res.discounts)
        } catch (e) {
          console.log(e)
        }
      }
    )()
  }, [])
  return (
    <>
      <AddItemTemplate discountList={items}/>
    </>
  )
}

export default DiscountListPage
