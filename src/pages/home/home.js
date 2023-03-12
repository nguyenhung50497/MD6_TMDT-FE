
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Home() {
    return (
        <div className="row">
            <div className="col-12">
                <Navbar></Navbar>
                <Outlet></Outlet>
                <Footer></Footer>
            </div>
        </div>
    )
}
