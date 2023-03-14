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
import CreateShop from "./pages/shops/createShop";
import ShopInterface from "./pages/shops/shopInterface";

function App() {
    const user = useSelector(state => {
        return state.users.users
    })
    return (
        <Routes>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'register'} element={<Register/>}/>
            <Route path={''} element={<Home/>}/>
            <Route path={'shopInterface'} element={<ShopInterface/>}/>
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
