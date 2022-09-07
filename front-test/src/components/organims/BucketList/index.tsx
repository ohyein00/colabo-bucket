import React from "react";
import * as S from './index.styles'
import BucketItems from "../../molcules/BucketItems";

type BucketContainerProps = {
}
const BucketContainer = (props: BucketContainerProps) => {
  return (
    <>
      <S.Container>
        <BucketItems />
        <BucketItems />
      </S.Container>
    </>
  )
}
export default BucketContainer
