import request from "./client";

export const getItems = <T>() => (
  request<T>({
    method: 'GET',
    url: `/requestAssignmentCalculatorData`,
  })
)
