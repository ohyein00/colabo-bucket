import {useRecoilState} from "recoil";
import {calcItemsBucket} from "../../../recoil/bucket";
import SelectBox from "../../atoms/SelectBox";
import React from "react";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import {BucketResponse} from "../../../types/bucketItemType";
import {SelectChangeEvent} from "@mui/material";

const ItemSelectArea = ({item}: { item: string }) => {
  const [itemsCountVal, setItemsCountBucket] = useRecoilState(calcItemsBucket(item))
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const selectItmems = React.useMemo(() => Array.from({length: 10}, (v, i) => i + 1), [])

  const onHandleChange = (event: SelectChangeEvent<number | string>) => {
    const curNum = Number(event.target.value)
    setItemsCountBucket({
        [item]:{
          ...itemsCountVal[item],
          totalPrice:Number(data?.items[item].price) * curNum || 0,
          count: curNum,
        },
    })
  };
  return (
    <>
      {
        itemsCountVal[item].count > 0 &&
        <SelectBox label={data?.items[item].name || ''} items={selectItmems} onHandleChange={onHandleChange}
                   value={itemsCountVal[item].count || 1}
        />
      }
    </>
  )
}

export default ItemSelectArea
