import React, {useState} from "react";
import BucketTemplate from "../../templates/BucketTemplate";
import {UseItemsApi} from "../../hooks/UseQueryHooks";
import {BucketResponse} from "../../types/bucketItemType";

const BucketPage = () => {
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()

  return (
    <>
      <BucketTemplate/>
    </>
  )
}
export default BucketPage
