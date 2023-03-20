import "./App.css";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import ListProduct from "./pages/products/ListProduct";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetail from "./pages/products/ProductDetail";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { useSelector } from "react-redux";
import AccountUser from "./pages/users/accountUser";
import ProfileUser from "./pages/users/profileUser";
import AddressUser from "./pages/users/addressUser";
import Password from "./pages/users/password";
import CreateShop from "./pages/shops/createShop";
import ShopInterface from "./pages/shops/shopInterface";
import ShopManager from "./pages/shops/shopManager";
import Address from "./pages/products/address";
import React from "react";
import SearchProduct from "./pages/products/SearchProduct";
import CartDetail from "./pages/carts/CartDetail";
import Sales from "./pages/stats/sales";


function App() {
   const user = useSelector((state) => {
      return state.users.users;
   });
   return (
      <Routes>
         <Route path={"login"} element={<Login />} />
         <Route path={"register"} element={<Register />} />
         <Route path={""} element={<Home />}>
            <Route path={""} element={<ListProduct />}></Route>
            <Route path={"search"} element={<SearchProduct/>} />
            <Route path="address" element={<Address />} />
            <Route path={"product-detail/:id"} element={<ProductDetail />} />
             <Route path={"search/cart-detail"} element={<CartDetail />} />
             <Route path={"cart-detail/stats/sales"} element={<Sales />} />
         </Route>
         <Route path={"shopInterface/:id"} element={<ShopInterface />} />
         {user !== null ? (
            <>
               <Route path={""} element={<Home />}>
                  <Route
                     path={"create-product/:id"}
                     element={<CreateProduct />}
                  />
                  <Route path={"edit-product/:id"} element={<EditProduct />} />
               </Route>
               <Route path="shop-manager/:id" element={<ShopManager />}></Route>
               <Route path={"account"} element={<AccountUser />}>
                  <Route path={""} element={<ProfileUser />} />
                  <Route path={"address/:id"} element={<AddressUser />} />
                  <Route path={"password/:id"} element={<Password />} />
                  <Route path={"shop/:id"} element={<CreateShop />} />
               </Route>
            </>
         ) : (
            <>
               <Route path={"*"} element={<Home />} />
            </>
         )}
      </Routes>
   );
}

export default App;


