import logo from './logo.svg';
import './App.css';
import Login from "./pages/auth/login";
import {Route, Routes} from "react-router-dom";
import Register from "./pages/auth/register";
import {useSelector} from "react-redux";
import Home from "./pages/home/home";

function App() {
    const user = useSelector(state => {
        return state.users.users
    })
    return (
        <Routes>
            <Route path={'login'} element={<Login/>}/>
            <Route path={'register'} element={<Register/>}/>
            <Route path={''} element={<Home/>}/>
        </Routes>
    );
}

export default App;
