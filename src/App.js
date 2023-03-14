import "./App.css";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import ListProduct from "./pages/products/ListProduct";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetail from "./pages/products/ProductDetail";
import logo from './logo.svg';
import './App.css';
import Login from "./pages/auth/login";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/auth/register";
import {useSelector} from "react-redux";
import Home from "./pages/home/home";
import AccountUser from "./pages/users/accountUser";
import ProfileUser from "./pages/users/profileUser";
import AddressUser from "./pages/users/addressUser";
import Password from "./pages/users/password";
import CreateShop from "./pages/users/createShop";

function App() {
   return (
      <div>
         <Routes>
            <Route path={"home"} element={<Home />}>
               <Route path={""} element={<ListProduct />}></Route>
               <Route path={"create-product"} element={<CreateProduct />} />
               <Route path={"edit-product/:id"} element={<EditProduct />} />
               <Route path={"product-detail/:id"} element={<ProductDetail />} />
            </Route>
         </Routes>
      </div>
   );
    const user = useSelector(state => {
        return state.users.users
    })
    return (
        <Routes>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'register'} element={<Register/>}/>
            <Route path={''} element={<Home/>}/>
            {user !== null ?
                <>
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
}

export default App;
