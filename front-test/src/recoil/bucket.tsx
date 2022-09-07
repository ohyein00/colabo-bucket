import { atom } from 'recoil';

export const userBucket = atom<string | null>({
  key: 'userBucket',
  default: null,
});
