import React, {SetStateAction, useCallback, ChangeEvent} from "react";
import Span from "../../atoms/Span";
import * as S from './index.styles'
import {Color} from "../../../contants/Color";
import {DiscountDto, ItemsDto} from "../../../types/bucketItemType";

type ItemCheckBox = {
  label: string;
  id: string;
  value: string;
  price?: string | null;
  rate?: number | string | null;
  setChecked: React.Dispatch<SetStateAction<any>>;
  checked: string[];
}
const ItemCheckBox = (props: ItemCheckBox) => {
  const {label, id, value, price,rate, setChecked, checked} = props
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target
    if (e.target.checked) {
      setChecked([...checked, value])
    } else {
      const res = checked.filter((item) => item !== value)
      setChecked([...res])
    }
  }, [checked, setChecked])
  return (
    <>
      <S.Container>
        <S.InputArea>
          <S.Input onChange={onChange} name={label}
                   checked={checked.includes(value)}
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
          {checked.includes(value) &&
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
