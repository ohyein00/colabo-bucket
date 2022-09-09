import React, {ChangeEvent, FormEvent, useCallback, useMemo, useState} from "react";
import ItemCheckBox from "../../molcules/ItemCheckBox";
import {BucketResponse, DiscountDto, ItemsDto} from "../../../types/bucketItemType";
import Buttons from "../../atoms/Buttons";
import {useSetRecoilState, useRecoilState, useRecoilSnapshot, useRecoilValue} from "recoil";
import {
  calcBucketDiscount, CalcBucketDiscountType,
  calcItemsBucket,
  UserDiscountBucketType,
  UserItemsBucketType
} from "../../../recoil/bucket";
import {userDiscountBucket} from "../../../recoil/bucket";
import {useNavigate} from "react-router-dom";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";

type ItemListFormProps = {
  itemList?: ItemsDto
  discountList?: DiscountDto
}


const ItemCheckBoxArea = React.memo((props: { item: string }) => {
  const {item} = props
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const [itemsCountVal, setItemsCountBucket] = useRecoilState(calcItemsBucket(item))
  const onHandleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setItemsCountBucket({
        [item]: {
          name: data?.items[item].name || '',
          price: data?.items[item].price || 0,
          totalPrice: Number(data?.items[item].price) * 1,
          count: 1
        }
      })
    } else {
      setItemsCountBucket({
        [item]: {
          name: data?.items[item].name || '',
          price: data?.items[item].price || 0,
          totalPrice: 0,
          count: 0
        }
      })
    }
  }, [item])

  return (
    <>
      <ItemCheckBox
        label={data?.items[item].name || ''}
        id={item}
        value={item}
        checked={itemsCountVal[item].count > 0}
        onHandleChange={onHandleChange}
        price={Number(data?.items[item].price) || 0}
      />
    </>
  )
})
const calTotalCount = (itemList: number[]) => {
  return itemList.reduce(function add(sum, curVal) {
    return sum + curVal
  }, 0)
}
const DiscountCheckBoxArea = (props: { id: string }) => {
  const {id} = props
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const [calcDiscountBucketVal, setDiscountItemsBucket] = useRecoilState(calcBucketDiscount(id))
  const snapshot = useRecoilSnapshot();

  /* 장바구니 수량이 1이상인 아이템 불러오기 */
  const bucketItems = React.useMemo(() =>
    Object.keys(data?.items || []).filter((item) => {
      const calcItemBucket = snapshot.getLoadable(calcItemsBucket(item)).getValue();
      return calcItemBucket[item].count > 0
    }), [])

  /* 장바구니 아이템들 할인율 계산 */

  const totalDiscount = () => {
    return bucketItems?.map((item) => {
      const calcItemBucket = snapshot.getLoadable(calcItemsBucket(item)).getValue();
      return Number(data?.items[item].price) * Number(data?.discounts[id].rate) * calcItemBucket[item].count
    })
  }

  /* 현재 장바구니 목록으로 할인 담기 */
  const onHandleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const res: CalcBucketDiscountType = {
      [id]: {
        name: calcDiscountBucketVal[id].name,
        discountItemList: null,
        rate: calcDiscountBucketVal[id].rate,
        totalDiscount: calcDiscountBucketVal[id].totalDiscount,
        checked: false,
      }
    }
    if (event.target.checked) {
      res[id].checked = true
      res[id].discountItemList = bucketItems
      res[id].totalDiscount = calTotalCount(totalDiscount() || [0])
    } else {
      res[id].checked = false
      res[id].discountItemList = null
      res[id].totalDiscount = 0
    }
    setDiscountItemsBucket(res)
  }, [id])

  return (
    <>
      <ItemCheckBox
        label={data?.discounts[id].name || ''}
        id={id}
        value={id}
        checked={Number(calcDiscountBucketVal[id].discountItemList?.length) > 0}
        onHandleChange={onHandleChange}
        rate={data?.discounts[id].rate}
      />
    </>
  )
}
const ItemListForm = (props: ItemListFormProps) => {
  const {itemList, discountList} = props
  const navigate = useNavigate()

  const onsubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    navigate(-1)
  }
  return (
    <>
      <form onSubmit={onsubmit}>
        {itemList &&
          Object.keys(itemList).map((item) => (
            <ItemCheckBoxArea item={item} key={item}/>
          ))
        }

        {discountList &&
          Object.keys(discountList).map((item) => (
            <DiscountCheckBoxArea id={item} key={item}/>
          ))
        }
        <Buttons>완료</Buttons>
      </form>
    </>
  )
}
export default React.memo(ItemListForm)
