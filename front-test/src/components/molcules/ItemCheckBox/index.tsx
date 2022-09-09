import React, {SetStateAction, useCallback, ChangeEvent} from "react";
import Span from "../../atoms/Span";
import * as S from './index.styles'
import {Color} from "../../../contants/Color";
type ItemCheckBox = {
  label: string;
  id: string;
  value: string;
  price?: string | number | null;
  rate?: string | number | null;
  checked: boolean;
  itemSize?:number;
  onHandleChange:(event: ChangeEvent<HTMLInputElement>,arg1?:any)=>void;
}
const ItemCheckBox = (props: ItemCheckBox) => {
  const {label, id, value, price,rate, checked,onHandleChange,itemSize} = props
  return (
    <>
      <S.Container>
        <S.InputArea>
          <S.Input onChange={onHandleChange} name={label}
                   checked={checked}
                   id={id} type="checkbox" value={value}/>
          <label htmlFor={id}>
            <Span styled={{display: "block", fontWeight: "bold"}}>
              {label}{itemSize && itemSize>1 &&`X${itemSize}`}
            </Span>
            <Span styled={{display: "inline-block", fontSize: "1.2rem", color:price ? Color.darkGrey : Color.darkPink}}>
              {price || rate}
            </Span>
          </label>
        </S.InputArea>
        <S.Icon>
          {checked &&
            <Span styled={{color: Color.purple}}>
              ✔
            </Span>
          }
        </S.Icon>
      </S.Container>
    </>
  )
}
export default ItemCheckBox
