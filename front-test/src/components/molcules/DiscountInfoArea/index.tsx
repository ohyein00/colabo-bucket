import React, {ChangeEvent, useCallback, useEffect, useState} from "react";
import * as S from './index.styles'
import Span from "../../atoms/Span";
import {Color} from "../../../contants/Color";
import {
  useRecoilState,
  useRecoilValue,
} from "recoil";

import {
  bucketItemType, discountItemCount, discountItemListType, discountItemsQuery,
} from "../../../recoil/bucket";
import {BucketResponse} from "../../../types/bucketItemType";
import UseCurrency from "../../../hooks/UseCurrency";
import {UseItemsApi} from "../../../hooks/UseQueryHooks";
import PopoverArea from "../PopoverArea";
import Buttons from "../../atoms/Buttons";
import ItemCheckBox from "../ItemCheckBox";


/**
 *  장바구니 할인 정보 영역
 *  */
export const DiscountInfoArea = ({id}: { id: string }) => {
  const discountItemsValue = useRecoilValue(discountItemsQuery)
  const discountItemCountValue = useRecoilValue(discountItemCount(id))
  const {UseGetItemsQuery} = UseItemsApi()
  const {data} = UseGetItemsQuery<BucketResponse>()
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const [discountItems, setDiscountItems] = useRecoilState(discountItemsQuery)
  const [checkedState, setCheckedState] = useState<string[]>([...Object.keys(discountItemCountValue.discountItemLength)]);

  /* popover 핸들러 */
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /* popover 핸들러 */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /* 할인 대상 체크박스 핸들러 */
  const onHandleChange = useCallback((event: ChangeEvent<HTMLInputElement>,position:number) => {
    if (event.target.checked) {
      const value = event.target.value
      setCheckedState(prevState => [...prevState,value])
      /*setCheckedState(prevState => prevState.map((box,index) => index === position ? val : box))*/
    } else {
      const value = event.target.value
      /*setCheckedState(prevState => prevState.map((box,index) => index === position ? '' : box))*/
      const otherItems = checkedState?.filter((item)=>item !== value)
      setCheckedState(otherItems)
    }
  },[id,checkedState])

  /* 체크 항목들을 새로 넘겨주기 */
  const SubmitHandleClick = useCallback(()=>{
    const newDiscountList:bucketItemType[] = checkedState?.filter((item)=>item !== '').map((item)=>(
      {
        id:  item,
        name:  data?.items[item].name || '',
        price:  Number(data?.items[item].price || 0),
      }
    )) || []
    const otherItems = discountItems.filter((item)=>item.id !== id)
    const initialData:discountItemListType = {
      id:id,
      name: data?.discounts[id].name || '',
      rate:Number(data?.discounts[id].rate || 0),
      discountItems: newDiscountList || [],
    }
    otherItems.push(initialData)
    setDiscountItems(otherItems)
    //체크가 전부 해제되었다면 바로 닫기
    if(checkedState.length===0){
      handleClose()
    }
  },[id,checkedState])
  /* 할인 삭제 */
  const DeleteHandleClick = useCallback(()=>{
    setDiscountItems(currVal => currVal.filter(item=>item.id !== id))
  },[])

  return (
    <>
      <S.Container>
      <S.Node>
        <S.ItemArea>
          <S.PriceArea>
            <Span styled={{fontSize: '0.9rem', fontWeight:'bold', color: Color.black, display: 'block',margin:'0 0 10px 0'}}>
              {data?.discounts[id].name}
            </Span>
            <Span styled={{fontSize: '0.8rem', color: Color.darkGrey, display: 'block'}}>
              {
                Object.keys(discountItemCountValue.discountItemLength).map((item, index) =>
                  <span key={item}>
                    {data?.items[item].name || ''}
                    {
                      discountItemCountValue.discountItemLength[item] >= 1 &&
                      `X${discountItemCountValue.discountItemLength[item]}`
                    }
                    {
                      index + 1 < Object.keys(discountItemCountValue.discountItemLength).length &&
                      `, `
                    }
                  </span>
                )
              }
            </Span>
            <Span styled={{fontSize: '0.8rem', color: Color.darkPink, display: 'block'}}>
              <>
                {UseCurrency(discountItemCountValue.totalCount)}
                ({Math.floor(Number(data?.discounts[id].rate) * 100)}%)
              </>
            </Span>
          </S.PriceArea>
          <Buttons onClick={handleClick} styled={{fontSize:'0.8rem',width:'100px'}}>수정</Buttons>
        </S.ItemArea>
      </S.Node>

      {/* 할인 정보 수정 영역 */}
      <PopoverArea title={data?.discounts[id].name || ''} anchorEl={anchorEl} open={open} handleClose={handleClose}>
        <S.Node>
          {Object.keys(discountItemCountValue.discountItemLength).length > 0 ?
            Object.keys(discountItemCountValue.discountItemLength).map((item, index) =>
                <ItemCheckBox
                  key={item}
                  label={data?.items[item].name || ''}
                  id={item}
                  value={item}
                  checked={checkedState?.includes(item)}
                  onHandleChange={e=>onHandleChange(e,index)}
                  itemSize={discountItemCountValue.discountItemLength[item]}
                  price={Number(data?.items[item].price) * discountItemCountValue.discountItemLength[item]}
                />
            )
            : <>
              <Span styled={{display:'block',fontSize:'0.7rem'}}>아이템이 없습니다.</Span>
              <Span styled={{display:'block',fontSize:'0.7rem'}}>할인을 삭제 후 다시 담아주세요.</Span></>
          }
        </S.Node>
        <S.ButtonArea>
          <Buttons onClick={DeleteHandleClick}
            styled={{background:Color.white,color:Color.black,fontSize:'0.9rem'}}>삭제</Buttons>
          <Buttons onClick={SubmitHandleClick}
                   type="button"
                   styled={{background:Color.white,color:Color.black,fontSize:'0.9rem'}}>확인</Buttons>
        </S.ButtonArea>
      </PopoverArea>
      </S.Container>
    </>
  )
}



