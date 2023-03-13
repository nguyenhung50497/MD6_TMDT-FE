import './App.css';
import {Route, Routes} from "react-router-dom"
import React from "react";
import ListProduct from "./pages/home/product/listProduct";
import Home from "./pages/home/home";
import Search from "./pages/home/product/search";
import ProductDetail from "./pages/home/product/productDetail";

function App() {
    return (
        <>
            <Routes>
                <Route path="home" element={<Home/>}>
                    <Route path={''} element={<ListProduct/>}/>
                    <Route path={'search'} element={<Search/>}/>

                </Route>
                <Route path="productDetail/:id" element={<ProductDetail/>}/>
            </Routes>

        </>
    );
}

export default App;