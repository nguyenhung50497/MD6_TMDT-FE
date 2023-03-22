import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import {
   deleteProduct,
   getProductByIdShop,
   getProducts,
} from "../../service/productService";
import { getCategories } from "../../service/categoryService";
import NavbarShop from "../../components/NavbarShop";
import Footer from "../../components/Footer";

export default function ProductManager() {
   const { id } = useParams();
   const [page, setPage] = useSearchParams();
   const page1 = page.get("page") || 1;
   const [check, setCheck] = useState(0);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const products = useSelector((state) => {
      return state.products.products.products;
   });
   const count = useSelector((state) => {
      return state.products.products.count;
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
      dispatch(getProductByIdShop({ idShop: id, page: 1 }));
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
   }, []);
   return (
      <>
         {products && (
            <>
               <div
                  className="col-8 p-3 pl-5 bg-light"
                  style={{ marginLeft: "-1px" }}>
                  <div
                     style={{
                        height: "70px",
                        borderBottom: "1px solid rgb(231, 229, 229)",
                     }}>
                     <div
                        className="mt-2 ml-4"
                        style={{ float: "left", width: "20%" }}>
                        <h2>{count} Sản Phẩm</h2>
                     </div>
                     <div
                        className="mr-3"
                        style={{ float: "right", width: "20%" }}>
                        <Link
                           to={`/create-product/${id}`}
                           style={{ textDecoration: "none" }}>
                           <button className="add-product pl-3 pr-3">
                              <svg
                                 xmlns="http://www.w3.org/2000/svg"
                                 width="30"
                                 height="30"
                                 fill="currentColor"
                                 class="bi bi-plus"
                                 viewBox="0 0 16 16">
                                 <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                              </svg>
                              Thêm Sản Phẩm Mới
                           </button>
                        </Link>
                     </div>
                  </div>
                  <div className="mt-5 row">
                     <div className="col-1"></div>
                     <div className="col-10">
                        <table className="table">
                           <thead className="thead-light">
                              <tr>
                                 <th>#</th>
                                 <th>Sản Phẩm</th>
                                 <th>Danh Mục</th>
                                 <th>Giá</th>
                                 <th>Số Lượng</th>
                                 <th>Đã Bán</th>
                                 <th>Thao Tác</th>
                              </tr>
                           </thead>
                           <tbody>
                              {products.map((item, key) => (
                                 <>
                                    <tr>
                                       <td>{key + 1}</td>
                                       <td style={{ width: "30%" }}>
                                          <div className="row">
                                             <div className="col-4 pl-5">
                                                <img
                                                   src={item.image}
                                                   alt=""
                                                   style={{
                                                      width: "60px",
                                                      height: "60px",
                                                      borderRadius: "10%",
                                                   }}
                                                />
                                             </div>
                                             <div className="col-8 text-left">
                                                <p
                                                   className="d-block ml-2 mb-1 mt-1 text-dark"
                                                   style={{
                                                      fontSize: "15px",
                                                   }}>
                                                   {item.nameProduct}
                                                </p>
                                             </div>
                                          </div>
                                       </td>
                                       <td style={{ width: "20%" }}>
                                          {item.nameCategory}
                                       </td>
                                       <td
                                          className="text-danger"
                                          style={{ width: "15%" }}>
                                          <span
                                             style={{
                                                fontSize: "12px",
                                                textDecoration: "underline",
                                             }}>
                                             đ
                                          </span>{" "}
                                          {item.price &&
                                             formatCurrency(item.price)}
                                       </td>
                                       <td style={{ width: "10%" }}>
                                          {item.quantity < 1000 && (
                                             <>{item.quantity}</>
                                          )}
                                          {item.quantity >= 1000 && (
                                             <>
                                                {(item.quantity / 1000).toFixed(
                                                   1
                                                )}
                                                k
                                             </>
                                          )}
                                       </td>
                                       <td style={{ width: "8%" }}>
                                          {item.sold < 1000 && <>{item.sold}</>}
                                          {item.sold >= 1000 && (
                                             <>
                                                {(item.sold / 1000).toFixed(1)}k
                                             </>
                                          )}
                                       </td>
                                       <th style={{ width: "12%" }}>
                                          <div>
                                             <div>
                                                <a
                                                   className="btn"
                                                   style={{
                                                      textDecoration: "none",
                                                      color: "blue",
                                                      fontWeight: "bold",
                                                   }}
                                                   onClick={() => {
                                                      navigate(
                                                         `/edit-product/${item.idProduct}`
                                                      );
                                                      window.scrollTo({
                                                         top: 255,
                                                         left: 0,
                                                         behavior: "smooth",
                                                      });
                                                   }}>
                                                   Cập nhật
                                                </a>
                                             </div>
                                             <div>
                                                <span
                                                   className="btn text-danger"
                                                   style={{
                                                      fontWeight: "bold",
                                                   }}
                                                   onClick={() => {
                                                      swal({
                                                         title: "Are you sure?",
                                                         text: "Once deleted, you will not be able to recover this imaginary file!",
                                                         icon: "warning",
                                                         buttons: true,
                                                         dangerMode: true,
                                                      }).then((willDelete) => {
                                                         if (willDelete) {
                                                            dispatch(
                                                               deleteProduct(
                                                                  item.idProduct
                                                               )
                                                            ).then(() => {
                                                               dispatch(
                                                                  getProductByIdShop(
                                                                     {
                                                                        idShop:
                                                                           id,
                                                                        page: 1,
                                                                     }
                                                                  )
                                                               ).then(() => {
                                                                  navigate(
                                                                     `/shop-manager/${id}`
                                                                  );
                                                               });
                                                            });
                                                            swal(
                                                               "Poof! Your imaginary file has been deleted!",
                                                               {
                                                                  icon: "success",
                                                               }
                                                            );
                                                         } else {
                                                            swal(
                                                               "Your imaginary file is safe!"
                                                            );
                                                         }
                                                      });
                                                   }}>
                                                   Xoá
                                                </span>
                                             </div>
                                             <div>
                                                <Link
                                                   className="text-success"
                                                   to={`/product-detail/${item.idProduct}`}
                                                   style={{
                                                      textDecoration: "none",
                                                   }}>
                                                   Chi tiết
                                                </Link>
                                             </div>
                                          </div>
                                       </th>
                                    </tr>
                                 </>
                              ))}
                           </tbody>
                        </table>
                     </div>
                     <div className="col-1"></div>
                  </div>
               </div>
               <div className="col-2"></div>
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
                                       dispatch(
                                          getProductByIdShop({
                                             idShop: id,
                                             page: page1 - 1,
                                          })
                                       );
                                       navigate(
                                          `/shop-manager/${id}?page=` +
                                             (page1 - 1)
                                       );
                                       window.scrollTo({
                                          top: 0,
                                          behavior: "smooth",
                                       });
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
                                       dispatch(
                                          getProductByIdShop({
                                             idShop: id,
                                             page: Number(page1) + 1,
                                          })
                                       );
                                       navigate(
                                          `/shop-manager/${id}?page=` +
                                             (Number(page1) + 1)
                                       );
                                       window.scrollTo({
                                          top: 0,
                                          behavior: "smooth",
                                       });
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
            </>
         )}
      </>
   );
}
