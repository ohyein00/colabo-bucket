export type ItemsDto = {
  [index: string]: {
    count: number;
    name: string;
    price: number;
  },
}
export type DiscountDto = {
  [index: string]: {
    name: string;
    rate: number;
  },
}
export type BucketResponse = {
  items:ItemsDto;
  discounts:DiscountDto;
  currency_code:'USD'|'KRW'
}
