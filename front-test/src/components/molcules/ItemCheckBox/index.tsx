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
  onHandleChange:(event: ChangeEvent<HTMLInputElement>)=>void;
}
const ItemCheckBox = (props: ItemCheckBox) => {
  const {label, id, value, price,rate, checked,onHandleChange} = props
  return (
    <>
      <S.Container>
        <S.InputArea>
          <S.Input onChange={onHandleChange} name={label}
                   checked={checked}
                   id={id} type="checkbox" value={value}/>
          <label htmlFor={id}>
            <Span styled={{display: "block", fontWeight: "bold"}}>
              {label}
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
