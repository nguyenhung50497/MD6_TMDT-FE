import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import {Outlet} from "react-router-dom";


export default function Home() {
    return (
        <div className="row">
            <div className="col-12">
                <div className="row">
                    <div className="col-12"><Navbar/></div>
                    <div className="col-12"><Header></Header></div>
                    <div className="col-12"><Outlet></Outlet></div>
                    <div className="col-12"><Footer></Footer></div>
                </div>
                <div className="col-12">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}