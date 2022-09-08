
import {useQuery} from "react-query";
import {getItems} from "../service/itemsApi";

export const UseItemsApi = () => {
  const UseGetItemsQuery = <T>() =>
    useQuery<T>(
      ['items'],
      () => getItems(),
      {
        staleTime: 100000,
        cacheTime: 100000,
        refetchOnMount: false,
        retry: 0,
        onError: (err) => {
          console.log(err);
        },
      },
    );
  return { UseGetItemsQuery };
};
