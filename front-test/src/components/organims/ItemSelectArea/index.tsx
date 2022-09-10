import SelectBox from "../../atoms/SelectBox";
import React, {useEffect, useState} from "react";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import {SelectChangeEvent} from "@mui/material";
import {useRecoilState} from "recoil";
import {bucketItemsQuery, bucketItemType, discountItemsQuery, discountItemType} from "../../../recoil/bucket";
import Buttons from "../../atoms/Buttons";
import * as S from './index.styles'

const ItemSelectArea = ({id}: { id: string }) => {
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const [bucketItemsVal, setBucketItems] = useRecoilState(bucketItemsQuery)
  const [discountItems, setDiscountItems] = useRecoilState(discountItemsQuery)

  const selectLength = React.useMemo(() => Array.from({length: 10}, (v, i) => i + 1), [])
  const [countState, setCountState] = useState<number>(1)
  const [thisEl, setThisEl] = useState<bucketItemType[]>([])


  useEffect(() => {
    const thisItems = bucketItemsVal.filter(item => item.id === id)
    setCountState(thisItems?.length || 0)
    setThisEl(thisItems)
  },[bucketItemsVal])
  const onHandleChange = (event: SelectChangeEvent<number | string>) => {
    const curNum = Number(event.target.value)
    const restItems = bucketItemsVal.filter(item => item.id !== id)
    if (!!thisEl?.length) {
      /* 셀렉트된 수 만큼 push */
      for (let i = 0; i < curNum; i++) {
        if(data?.items[id]){
          restItems.push({
            id: id,
            name: data?.items[id].name,
            price: data?.items[id].price,
          })
        }
      }
    }
    setBucketItems(restItems)
  };
  const onHandleClick = ()=>{
    const restItems = bucketItemsVal.filter(item => item.id !== id)

    setBucketItems(restItems)
  }
  return (
    <>
      {
        !!thisEl?.length &&
        <S.Container>
          <SelectBox label={data?.items[id].name || ''} items={selectLength} onHandleChange={onHandleChange}
                     value={countState}
          />
          <Buttons onClick={onHandleClick} styled={{border:'1px solid #fff',margin:'0 0 0 10px'}}colorType="gray">🗑</Buttons>
        </S.Container>
      }
    </>
  )
}

export default ItemSelectArea
