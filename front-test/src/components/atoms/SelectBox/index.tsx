import React, {ChangeEvent} from "react";
import {FormControl, Select, MenuItem, SelectProps, SelectChangeEvent} from "@mui/material";
export type SelectBoxProps = {
  label: string;
  items: string[] | number[];
  value:number;
  onHandleChange:(event:SelectChangeEvent<number|string>)=>void;
} & SelectProps;

const SelectBox = ({ value, label, items,onHandleChange }: SelectBoxProps)=>{
  return(
    <FormControl
      sx={{
        fontSize: '0.85rem',
        width: 70,
      }}
    >
      <Select
        labelId={label}
        autoWidth={false}
        value={value}
        onChange={onHandleChange}
        defaultValue={value}
      >
        {items?.map((item) => (
          <MenuItem
            sx={{
              fontSize: '0.85rem',
              width: 70,
              padding: '3px 15px',
            }}
            key={item}
            value={item}
          >
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default SelectBox
