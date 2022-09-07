import {atom} from 'recoil';

type UserItemsBucketType = {
  items: string[],
}
type UserDiscountBucketType = {
  [index: string]: string[]
}
export const userItemsBucket = atom<UserItemsBucketType | null>({
  key: 'userItemsBucket',
  default: null,
});
export const userDiscountBucket = atom<UserDiscountBucketType | null>({
  key: 'userDiscountBucket',
  default: null,
});
