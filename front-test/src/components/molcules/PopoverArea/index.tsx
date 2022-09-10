import {Popover, PopoverProps} from "@mui/material";
import React, {ReactNode, useState,SetStateAction} from "react";
import * as S from './index.styles'

type SeletPopOverType = {
  title: string;
  children: ReactNode;
  setAnchorEl?:  React.Dispatch<SetStateAction<HTMLButtonElement | null>>;
  handleClose : ()=>void
} & PopoverProps
const PopoverArea = (props: SeletPopOverType) => {
  const {title, children,open,anchorEl,handleClose} = props
  const id = open ? 'simple-popover' : undefined;

  return (

    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <S.Inner>
        <S.Title>{title}</S.Title>
        <S.ContentArea>
          {children}
        </S.ContentArea>
      </S.Inner>
    </Popover>
  )
}
export default PopoverArea
