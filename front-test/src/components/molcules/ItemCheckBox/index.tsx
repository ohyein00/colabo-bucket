import React, {SetStateAction, useCallback, ChangeEvent} from "react";
import Span from "../../atoms/Span";
import * as S from './index.styles'
import {Color} from "../../../contants/Color";
import UseCurrency from "../../../hooks/UseCurrency";
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
  const priceString = rate || UseCurrency(Number(price))
  return (
    <>
      <S.Container>
        <S.InputArea>
          <S.Input onChange={onHandleChange} name={label}
                   checked={checked}
                   id={id} type="checkbox" value={value}/>
          <label htmlFor={id}>
            <Span styled={{display: "block", fontWeight: "bold",'fontSize':'1rem'}}>
              {label}{itemSize && itemSize>1 &&`X${itemSize}`}
            </Span>
            <Span styled={{display: "inline-block", fontSize: "0.9rem", color:rate ? Color.darkPink : Color.darkGrey}}>
              {priceString}
            </Span>
          </label>
        </S.InputArea>
        <S.Icon>
          {checked &&
            <Span styled={{color: Color.purple,fontSize:'1.3rem'}}>
              ✔
            </Span>
          }
        </S.Icon>
      </S.Container>
    </>
  )
}
export default ItemCheckBox
