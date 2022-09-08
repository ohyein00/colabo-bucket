import {atom, atomFamily, DefaultValue, selector, selectorFamily} from 'recoil';
import {BucketResponse} from "../types/bucketItemType";
import {UseItemsApi} from "../hooks/UseQueryHooks";

export type UserItemsBucketType = {
  [index: string]: {
    name: string,
    count:number,
    price:number,
    totalPrice: number
  }
}

export type UserDiscountBucketType = {
  [index: string]: {
    discountItemList: string[];
  }
}

export type CalcBucketDiscountType = {
  [index: string]: {
    name: string;
    discountItemList: { name: string, count: number }[];
    rate: number;
    totalDiscount: number;
  }
}
export type BucketTotalType = {
  item: UserItemsBucketType
  discount: CalcBucketDiscountType
}

// 장바구니에 담은 시술 정보
export const userItemsBucket = atom<UserItemsBucketType>({
  key: 'userItemsBucket',
  default: {},
});

// 장바구니에 담은 할인 정보
export const userDiscountBucket = atom<UserDiscountBucketType>({
  key: 'userDiscountBucket',
  default: {},
});


// 아이템리스트 더하기 함수
const calTotalCount = (itemList: number[]) => {
  return itemList.reduce(function add(sum, curVal) {
    return sum + curVal
  }, 0)
}

// 아이템 총 금액 계산
export const calcItemsBucket = atomFamily<UserItemsBucketType, string>({
  key: 'calcItemsBucket',
  default: selectorFamily({
    key: 'calcItemsBucket/default',
    get: (item) => ({get}) => {
      const {UseGetItemsQuery} = UseItemsApi()
      const {data} = UseGetItemsQuery<BucketResponse>()
      const userItemsBucketState = get(userItemsBucket)
      const res = Number(data?.items[item].price) * Number(userItemsBucketState[item].count)
      return {
        [item]:{
          name: data?.items[item].name || '',
          price:data?.items[item].price ||0,
          totalPrice: res,
          count:userItemsBucketState[item].count
        }
      }
    },
    set: (item) => ({set}, newValue) => {
      set(userItemsBucket,newValue)
    }
  })
});

// 할인 정보 계산
export const calcBucketDiscount = atomFamily<CalcBucketDiscountType, string>({
  key: 'calcBucketDiscount',
  default: selectorFamily({
    key: 'calcBucketDiscount/default',
    get: (key) => ({get}) => {
      const {UseGetItemsQuery} = UseItemsApi()
      const {data} = UseGetItemsQuery<BucketResponse>()
      const discountBucketState = get(userDiscountBucket)//체크한 장바구니 상태
      const userItemsBucketState = get(userItemsBucket)//체크한 아이템 상태
      const priceList = discountBucketState[key].discountItemList.map((item) => {
        return Number(data?.items[item].price)
      })
      const discountItemList = discountBucketState[key].discountItemList.map((item) => {
        return {name: data?.items[item].name || '', count: userItemsBucketState[item].count}
      })
      const totalPrice = calTotalCount(priceList)
      return {
        [key]: {
          name: data?.discounts[key].name || '',
          discountItemList: discountItemList,
          rate: Math.floor(Number(data?.discounts[key].rate) * 100),
          totalDiscount: Math.floor(totalPrice * Number(data?.discounts[key].rate)),
        }
      }
    },
  })
});


