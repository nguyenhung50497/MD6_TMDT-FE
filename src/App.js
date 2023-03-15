import "./App.css";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import ListProduct from "./pages/products/ListProduct";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetail from "./pages/products/ProductDetail";
import './App.css';
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import {useSelector} from "react-redux";
import AccountUser from "./pages/users/accountUser";
import ProfileUser from "./pages/users/profileUser";
import AddressUser from "./pages/users/addressUser";
import Password from "./pages/users/password";
import CreateShop from "./pages/shops/createShop";
import ShopInterface from "./pages/shops/shopInterface";
import {Route, Routes} from "react-router-dom"
import React from "react";
import ListProduct from "./pages/home/product/listProduct";
import Home from "./pages/home/home";
import Search from "./pages/home/product/search";
import ProductDetail from "./pages/home/product/productDetail";

function App() {
    const user = useSelector(state => {
        return state.users.users
    })
    return (
        <Routes>

            <Route path={'login'} element={<Login/>}/>
            <Route path={'register'} element={<Register/>}/>
            <Route path={''} element={<Home/>}>
                <Route path={'shopInterface'} element={<ShopInterface/>}/>
            </Route>
            {user !== null ?
                <>
                    <Route path={"home"} element={<Home />}>
                        <Route path={""} element={<ListProduct />}></Route>
                        <Route path={"create-product"} element={<CreateProduct />} />
                        <Route path={"edit-product/:id"} element={<EditProduct />} />
                        <Route path={"product-detail/:id"} element={<ProductDetail />} />
                    </Route>

                    <Route path={'account'} element={<AccountUser/>}>
                        <Route path={''} element={<ProfileUser/>}/>
                        <Route path={'address/:id'} element={<AddressUser/>}/>
                        <Route path={'password/:id'} element={<Password/>}/>
                        <Route path={'shop/:id'} element={<CreateShop/>}/>
                    </Route>
                </>
                :
                <>
                    <Route path={'*'} element={<Home/>}/>
                </>
            }
        </Routes>
    );
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
