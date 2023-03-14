import "./App.css";
import Home from "./pages/home/home";
import { Route, Routes } from "react-router-dom";
import ListProduct from "./pages/products/ListProduct";
import CreateProduct from "./pages/products/CreateProduct";
import EditProduct from "./pages/products/EditProduct";
import ProductDetail from "./pages/products/ProductDetail";

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
}

export default App;
