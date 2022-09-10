import BucketTotalCount from "../../components/molcules/BucketTotalCount";
import React from "react";
import BucketList from "../../components/organims/BucketList";
import BucketHeader from "../../components/organims/BucketHeader";
import Buttons from "../../components/atoms/Buttons";
import * as S from './index.styles'
import {Wrapper} from "./index.styles";

const BucketTemplate = ()=>{
  return(
    <S.Wrapper>
    <S.Container>
      <S.TopArea>
      <BucketHeader/>
      <BucketList/>
      </S.TopArea>
      {/*<BucketTotalCount/>*/}
      <S.BottomArea>
        <BucketTotalCount/>
      <Buttons styled={{padding:'15px 20px'}}>다음</Buttons>

      </S.BottomArea>
    </S.Container>
    </S.Wrapper>
    )

}
export default BucketTemplate
