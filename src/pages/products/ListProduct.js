import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import { deleteProduct, getProducts } from "../../service/productService";
import { getCategories } from "../../service/categoryService";

export default function ListProduct() {
   const [page, setPage] = useSearchParams();
   const page1 = page.get("page") || 1;
   const [check, setCheck] = useState(0);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const products = useSelector((state) => {
      return state.products.products.products;
   });
   const categories = useSelector((state) => {
      return state.categories.categories;
   });
   const loading = useSelector((state) => state.products.loading);
   const totalPages = useSelector((state) => {
      if (state.products.products !== undefined) {
         return state.products.products.totalPage;
      }
   });
   const formatCurrency = (price) => {
      var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
      var priceWithCommas = price.toLocaleString();
      var arParts = String(priceWithCommas).split(DecimalSeparator);
      var intPart = arParts[0];
      var decPart = arParts.length > 1 ? arParts[1] : "";
      return intPart;
   };
   useEffect(() => {
      dispatch(getProducts(1));
   }, []);
   useEffect(() => {
      dispatch(getCategories());
   }, []);
   return (
      <>
         <div className="row mt-2">
            <div className="col-2"></div>
            <div className="col-8 row" style={{ marginLeft: "-1px" }}>
               <div
                  className="col-12 bg-light pt-3"
                  style={{
                     border: "1px solid rgb(231, 229, 229)",
                     height: "60px",
                  }}>
                  <strong className="text-secondary">DANH MỤC</strong>
               </div>
               {categories &&
                  categories.map((item, key) => (
                     <div className="col-2 bg-light card-category">
                        <div>
                           <img
                              src={item.imageCategory}
                              alt=""
                              style={{
                                 width: "100%",
                                 height: "150px",
                              }}
                           />
                           <p className="text-center">{item.nameCategory}</p>
                        </div>
                     </div>
                  ))}
            </div>
            <div className="col-2"></div>
         </div>
         <div className="row mt-3">
            <div className="col-2"></div>
            <div className="col-8 row" style={{ marginLeft: "-1px" }}>
               <div
                  className="col-12 bg-light pt-3 text-center"
                  style={{
                     border: "1px solid rgb(231, 229, 229)",
                     height: "60px",
                     fontSize: "20px",
                  }}>
                  <strong className="text-danger">Sản Phẩm</strong>
               </div>
               {products !== undefined &&
                  products.map((item, key) => (
                     <>
                        <div
                           key={key}
                           className="col-lg-2 col-md-3 p-1 card-product">
                           <div>
                              <div
                                 className="bg-light shadow-sm"
                                 style={{
                                    height: "300px",
                                 }}>
                                 <Link
                                    to={`product-detail/${item.idProduct}`}
                                    style={{
                                       textDecoration: "none",
                                    }}>
                                    <img
                                       className="img-fluid"
                                       src={item.image}
                                       style={{
                                          height: "200px",
                                          width: "100%",
                                       }}
                                       alt=""
                                    />
                                 </Link>
                                 <div>
                                    <div style={{ height: "50px" }}>
                                       <p
                                          className="d-block ml-2 mb-1 mt-1 text-dark"
                                          style={{
                                             fontSize: "13px",
                                          }}>
                                          {item.nameProduct}
                                       </p>
                                    </div>
                                    <div>
                                       <div
                                          className="text-danger ml-1"
                                          style={{
                                             float: "left",
                                          }}>
                                          <span
                                             className="text-danger"
                                             style={{
                                                fontSize: "12px",
                                                textDecoration: "underline",
                                             }}>
                                             đ
                                          </span>{" "}
                                          {item.price &&
                                             formatCurrency(item.price)}
                                       </div>
                                       <div
                                          className="text-secondary mr-1 mt-1"
                                          style={{
                                             float: "right",
                                             fontSize: "13px",
                                          }}>
                                          {item.sold < 1000 && (
                                             <>Đã bán: {item.sold}</>
                                          )}
                                          {item.sold >= 1000 && (
                                             <>
                                                Đã bán:{" "}
                                                {(item.sold / 1000).toFixed(1)}k
                                             </>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </>
                  ))}
               <div className="col-12 mt-3">
                  <nav aria-label="Page navigation example">
                     <ul className="pagination justify-content-center">
                        <li className="page-item">
                           {page1 == 1 ? (
                              <>
                                 <div className="page-link">
                                    <span
                                       aria-hidden="true"
                                       style={{
                                          color: "black",
                                       }}>
                                       &laquo;
                                    </span>
                                 </div>
                              </>
                           ) : (
                              <>
                                 <button
                                    className="page-link"
                                    onClick={() => {
                                       dispatch(getProducts(page1 - 1));
                                       navigate("/home?page=" + (page1 - 1));
                                    }}>
                                    {" "}
                                    <span aria-hidden="true">&laquo;</span>
                                 </button>
                              </>
                           )}
                        </li>
                        <li className="page-item">
                           <a className="page-link">
                              {page1}/{totalPages}
                           </a>
                        </li>
                        <li className="page-item">
                           {page1 == totalPages ? (
                              <>
                                 <div className="page-link">
                                    <span
                                       aria-hidden="true"
                                       style={{
                                          color: "black",
                                       }}>
                                       &raquo;
                                    </span>
                                 </div>
                              </>
                           ) : (
                              <>
                                 <button
                                    className="page-link"
                                    onClick={() => {
                                       dispatch(getProducts(Number(page1) + 1));
                                       navigate(
                                          "/home?page=" + (Number(page1) + 1)
                                       );
                                    }}>
                                    {" "}
                                    <span aria-hidden="true">&raquo;</span>
                                 </button>
                              </>
                           )}
                        </li>
                     </ul>
                  </nav>
               </div>
            </div>
            <div className="col-2"></div>
         </div>
      </>
   );
}
