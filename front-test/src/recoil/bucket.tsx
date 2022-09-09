import {atom, atomFamily, DefaultValue, selector, selectorFamily, useRecoilSnapshot} from 'recoil';
import {BucketResponse} from "../types/bucketItemType";
import {UseItemsApi} from "../hooks/UseQueryHooks";


export type bucketItemType = {
  id: string,
  name: string,
  price: number,
}
export type discountItemType = {
  name: string,
  rate:number
}
export type discountItemListType = {
  id:string,
  name: string,
  rate:number,
  discountItems: bucketItemType[],
}
export const bucketItemsQuery = atom<bucketItemType[]>({
  key: 'bucketItemsQuery',
  default: [],
});
export const discountItemsQuery = atom<discountItemListType[]>({
  key: 'discountItemsQuery',
  default: [],
});
type DiscountInfoType = {
  discountItemLength: { [index: string]: number };
  totalCount: number
}

export const discountItemCount = selectorFamily<DiscountInfoType,string>({
  key:'',
  get:el => ({get})=>{
    const discountItems = get(discountItemsQuery)
    const bucketItems = get(bucketItemsQuery)
    const discountEl = discountItems.find((item)=>item.id === el)

    const discountItemLength: { [index: string]: number }={}
    discountEl?.discountItems.forEach((x) => {
      discountItemLength[x.id] = (discountItemLength[x.id] || 0) + 1;
    });

    //아이템 갯수새기
    const bucketItemLength: { [index: string]: number } = {}
    bucketItems.forEach((x) => {
      bucketItemLength[x.id] = (bucketItemLength[x.id] || 0) + 1;
    });

    // 아이템 목록에 없으면 삭제해주기
    Object.keys(discountItemLength).forEach((id)=>{
      if(!bucketItemLength[id]){
        delete discountItemLength[id]
      }
    })
    // 아이템 목록 업데이트시 동기화
   Object.keys(discountItemLength).forEach((id)=>{
     if((!!bucketItemLength[id] && !!discountItemLength[id]) && (bucketItemLength[id] !== discountItemLength[id])){
       discountItemLength[id] = bucketItemLength[id]
     }
   })

    let totalDiscount = 0
    Object.keys(discountItemLength).forEach((id)=>{
      const i = bucketItems.find((item)=>item.id === id)
      totalDiscount -= Number(i?.price) * Number(discountItemLength[id] || 0)  * Number(discountEl?.rate)
    })

    return{
      discountItemLength:discountItemLength,
      totalCount:Math.floor(totalDiscount),
    }
  }
})



