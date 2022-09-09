import {atom, atomFamily, DefaultValue, selector, selectorFamily, useRecoilSnapshot} from 'recoil';
import {BucketResponse} from "../types/bucketItemType";
import {UseItemsApi} from "../hooks/UseQueryHooks";



export type bucketItems = {
  [index: string]: {
    name: string,
    price: number,
    count:number,
    discount:[],
  }
}


export type UserItemsBucketType = {
  [index: string]: {
    count: number,
    price: number,
    totalPrice: number,
    name: string,
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
    discountItemList: string[] | null;
    rate: number;
    totalDiscount: number;
    checked:boolean
  }
}
export type BucketTotalType = {
  item: UserItemsBucketType
}


// 장바구니 카운트
export const userDiscountBucket = atom<UserDiscountBucketType>({
  key: 'userDiscountBucket',
  default: {},
});
// 아이템 금액 계산
export const calcItemsBucket = atomFamily<UserItemsBucketType, string>({
  key: 'calcItemsBucket',
  default: selectorFamily({
    key: 'calcItemsBucket/default',
    get: (item) => ({get}) => {
      const {UseGetItemsQuery} = UseItemsApi()
      const {data} = UseGetItemsQuery<BucketResponse>()
      return {
        [item]: {
          name: data?.items[item].name || '',
          price: data?.items[item].price || 0,
          totalPrice:0,
          count:0
        }
      }
    },
  })
})

export const calcBucketDiscountIds = atom<CalcBucketDiscountType[]>({
  key: "calcBucketDiscountIds",
  default: []
})

// 할인 정보 계산
export const calcBucketDiscount = atomFamily<CalcBucketDiscountType, string>({
  key: 'calcBucketDiscount',
  default: selectorFamily({
    key: 'calcBucketDiscount/default',
    get: (key) => ({get}) => {
      const {UseGetItemsQuery} = UseItemsApi()
      const {data} = UseGetItemsQuery<BucketResponse>()
      const snapshot = useRecoilSnapshot();

      return {
        [key]: {
          name: data?.discounts[key].name || '',
          discountItemList: [],
          rate: Number(data?.discounts[key].rate),
          totalDiscount:0,
          checked:false,
        }
      }
    },
    set: (id) => ({set}, newVal) => {
      set(calcBucketDiscountIds(id), prev => [...prev, newVal]);
    }
  })
});



