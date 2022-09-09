import BucketTotalCount from "../../components/molcules/BucketTotalCount";
import React from "react";
import BucketList from "../../components/organims/BucketList";
import BucketHeader from "../../components/organims/BucketHeader";
import Buttons from "../../components/atoms/Buttons";

const BucketTemplate = ()=>{
  return(
    <>
      <BucketHeader/>
      <BucketList/>
      <BucketTotalCount/>
      <Buttons>버튼이다아아</Buttons>
    </>
    )

}
export default BucketTemplate
