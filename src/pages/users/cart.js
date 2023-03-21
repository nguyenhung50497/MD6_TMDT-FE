import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
   deleteCartDetails,
   getCartDetailsByUser,
} from "../../service/cartDetailService";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Field } from "formik";
import swal from "sweetalert";
import { getCartByIdUser, payCart } from "../../service/cartService";

export default function Cart() {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const formatCurrency = (price) => {
      var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
      var priceWithCommas = price.toLocaleString();
      var arParts = String(priceWithCommas).split(DecimalSeparator);
      var intPart = arParts[0];
      var decPart = arParts.length > 1 ? arParts[1] : "";
      return intPart;
   };
   const user = useSelector((state) => {
      if (state.users.users) {
         return state.users.users;
      }
   });
   const cart = useSelector((state) => {
      if (state.carts.cart) {
         return state.carts.cart;
      }
   });
   const cartDetails = useSelector((state) => {
      if (state.cartDetails.cartDetails) {
         return state.cartDetails.cartDetails;
      }
   });
   let sum = 0;
   if (cartDetails) {
      for (let i of cartDetails) {
         if (i.statusCart === "chưa thanh toán") {
            sum += i.priceInCart * i.quantityCart;
         }
      }
   }
   useEffect(() => {
      dispatch(getCartByIdUser(user.idUser));
   }, []);
   useEffect(() => {
      dispatch(getCartDetailsByUser(user.idUser));
   }, []);
   return (
      <div className="row">
         <div className="col-12">
            <Navbar />
         </div>
         <div className="col-12" style={{ marginTop: "130px" }}>
            <div className="row">
               <div className="col-2"></div>
               <div className="col-8">
                  <div className="col-12 bg-light mb-2">
                     <div className="row">
                        <div className="col-12">
                           <div
                              className="row mb-3 mt-2 pl-3"
                              style={{ fontWeight: "bold" }}>
                              <div className="col-4">Sản Phẩm</div>
                              <div className="col-2 text-center">Danh Mục</div>
                              <div className="col-2 text-center">Đơn Giá</div>
                              <div className="col-1 text-center">Số Lượng</div>
                              <div className="col-2 text-center">Số Tiền</div>
                              <div className="col-1 text-center">Thoa Tác</div>
                           </div>
                        </div>
                     </div>
                  </div>
                  {cartDetails &&
                     cartDetails.map((item, index) => (
                        <>
                           <div className="col-12 bg-light mb-2">
                              <div className="row">
                                 <div className="col-12 m-2">
                                    <svg
                                       xmlns="http://www.w3.org/2000/svg"
                                       width="16"
                                       height="16"
                                       fill="currentColor"
                                       class="bi bi-shop-window"
                                       viewBox="0 0 16 16">
                                       <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                    <span className="ml-2">
                                       {item.nameShop}
                                    </span>
                                 </div>
                                 <div className="col-12">
                                    <div className="row mb-3 mt-2 pl-3">
                                       <div className="col-4">
                                          <img
                                             src={item.image}
                                             alt=""
                                             style={{
                                                width: "100px",
                                             }}
                                          />
                                          <span className="ml-3">
                                             {item.nameProduct}
                                          </span>
                                       </div>
                                       <div className="col-2 text-center">
                                          <span>{item.nameCategory}</span>
                                       </div>
                                       <div className="col-2 text-center">
                                          <span
                                             style={{
                                                fontSize: "16px",
                                                textDecoration: "underline",
                                             }}>
                                             đ
                                          </span>{" "}
                                          <span>
                                             {item.priceInCart &&
                                                formatCurrency(
                                                   item.priceInCart
                                                )}
                                          </span>
                                       </div>
                                       <div className="col-1">
                                          <input
                                             type="number"
                                             value={item.quantityCart}
                                             style={{
                                                textAlign: "center",
                                                width: "90px",
                                             }}
                                          />
                                       </div>
                                       <div className="col-2 text-danger text-center">
                                          <span
                                             style={{
                                                fontSize: "16px",
                                                textDecoration: "underline",
                                             }}>
                                             đ
                                          </span>{" "}
                                          <span>
                                             {item.priceInCart &&
                                                formatCurrency(
                                                   item.priceInCart *
                                                      item.quantityCart
                                                )}
                                          </span>
                                       </div>
                                       <div className="col-1 text-center">
                                          {item.statusCart ===
                                             "chưa thanh toán" && (
                                             <a
                                                className="btn"
                                                onClick={() => {
                                                   swal({
                                                      title: "Bạn có chắc chắn?",
                                                      text: "Bạn sẽ xoá sản phẩm đã chọn!",
                                                      icon: "warning",
                                                      buttons: true,
                                                      dangerMode: true,
                                                   }).then((willDelete) => {
                                                      if (willDelete) {
                                                         dispatch(
                                                            deleteCartDetails(
                                                               item.idCartDetail
                                                            )
                                                         ).then(() => {
                                                            dispatch(
                                                               getCartDetailsByUser(
                                                                  user.idUser
                                                               )
                                                            ).then(() => {
                                                               navigate(
                                                                  "/cart"
                                                               );
                                                            });
                                                         });
                                                         swal(
                                                            "Xoá thành công!",
                                                            {
                                                               icon: "success",
                                                            }
                                                         );
                                                      } else {
                                                         swal("Đã huỷ xoá!");
                                                      }
                                                   });
                                                }}>
                                                Xoá
                                             </a>
                                          )}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </>
                     ))}

                  <div className="col-12 bg-light" style={{ height: "80px" }}>
                     <div className="row p-3">
                        <div className="col-6"></div>
                        <div className="col-6">
                           <div className="row">
                              <div
                                 className="col-8 pt-2"
                                 style={{ fontSize: "24px" }}>
                                 Tổng Thanh Toán:{" "}
                                 <span
                                    style={{
                                       fontSize: "20px",
                                       textDecoration: "underline",
                                       color: "red",
                                    }}>
                                    đ
                                 </span>{" "}
                                 <span
                                    style={{
                                       fontSize: "24px",
                                       color: "red",
                                    }}>
                                    {sum != 0 && formatCurrency(sum)}
                                 </span>
                              </div>
                              <div className="col-4">
                                 <button
                                    className="muaHang w-100"
                                    onClick={() => {
                                       swal("Thanh toán thành công!");
                                       dispatch(
                                          payCart([cart.idCart, user.idUser])
                                       );
                                       navigate("/cart");
                                    }}>
                                    Thanh Toán
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-2"></div>
            </div>
         </div>
         <div className="col-12">
            <Footer />
         </div>
      </div>
   );
}
