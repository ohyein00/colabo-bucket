import React from 'react';
import BucketPage from "./page/BucketPage";
import ItemListPage from "./page/ItemListPage";
import {Route, Routes} from "react-router-dom";
import DiscountListPage from "./page/DiscountListPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<BucketPage/>}/>
      <Route path="/items" element={<ItemListPage/>}/>
      <Route path="/discount" element={<DiscountListPage/>}/>
    </Routes>

  );
}

export default App;
