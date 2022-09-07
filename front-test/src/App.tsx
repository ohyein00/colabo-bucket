import React from 'react';
import BucketPage from "./page/BucketPage";
import ItemListPage from "./page/ItemListPage";
import {Route, Routes} from "react-router-dom";
import DiscountListPage from "./page/DiscountListPage";
import {RecoilRoot} from "recoil";

function App() {
  return (

    <RecoilRoot>
      <Routes>
        <Route path="/" element={<BucketPage/>}/>
        <Route path="/items" element={<ItemListPage/>}/>
        <Route path="/discount" element={<DiscountListPage/>}/>
      </Routes>
    </RecoilRoot>

  );
}

export default App;
