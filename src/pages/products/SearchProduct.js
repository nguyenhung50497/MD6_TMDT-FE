import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import {getProducts, search} from "../../service/productService";
import {Field, Form, Formik} from "formik";


export default function SearchProduct() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [page, setPage] = useSearchParams();
    const page1 = page.get("page") || 1;
    const totalPages = useSelector((state) => {
        if (state.products.products !== undefined) {
            return state.products.search.totalPage;
        }
    });
    let products = useSelector((state) => {
        return state.products.search.products;
    });


    let allProducts = useSelector((state) => {
        return state.products.products.products;
    });
    let province = []
    for (let i = 0; i < allProducts.length; i++) {
        province.push(allProducts[i].addressShop)
    }
    let uniqueProvince = province.filter((value, index, array) => array.indexOf(value) === index);


    const keyword = useSelector((state) => {
        return state.products.keyword;
    });
    const existUrl = useSelector((state) => state.products.existUrl);
    const [queryValue, setQueryValue] = useState({
        addressShop: [],
        nameCategory: [],
        minPrice: [""],
        maxPrice: [""],
        keyword: [...keyword],
    });
    const [queryStringAPI, setQueryStringAPI] = useState("");
    const loading = useSelector((state) => {
        return state.products.loading;
    });
    const formatCurrency = (price) => {
        let DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
        let priceWithCommas = price.toLocaleString();
        let arParts = String(priceWithCommas).split(DecimalSeparator);
        let intPart = arParts[0];
        let decPart = arParts.length > 1 ? arParts[1] : "";
        return intPart;
    };

    function handleChange(event) {
        const isChecked = event.target.checked;
        const value = event.target.value;
        if (isChecked === true) {
            if (
                value === "Hà Nội" ||
                value === "TP Hồ Chí Minh" ||
                value === "Hải Phòng" ||
                value === "Cần Thơ" ||
                value === "Đà Nẵng" ||
                value === "Bắc Ninh" ||
                value === "Huế" ||
                value === "Biên Hòa" ||
                value === "Thủ Đức" ||
                value === "Hải Dương"
            ) {
                queryValue.addressShop.push(value);
                setQueryValue({
                    addressShop: queryValue.addressShop,
                    nameCategory: [...queryValue.nameCategory],
                    minPrice: [...queryValue.minPrice],
                    maxPrice: [...queryValue.maxPrice],
                    keyword: [...keyword],
                });
            }
            if (
                value === "Thời Trang" ||
                value === "Mẹ & Bé" ||
                value === "Thiết Bị Điện Tử" ||
                value === "Máy Tính & Laptop" ||
                value === "Đồng Hồ" ||
                value === "Giày Dép" ||
                value === "Nhà Cửa & Đời Sống" ||
                value === "Sức Khỏe" ||
                value === "Phụ Kiện & Trang Sức Nữ" ||
                value === "Thể Thao" ||
                value === "Oto & Xe Máy & Xe Đạp" ||
                value === "Bách Hóa Online"
            ) {
                queryValue.nameCategory.push(value);
                setQueryValue({
                    addressShop: [...queryValue.addressShop],
                    nameCategory: queryValue.nameCategory,
                    minPrice: [...queryValue.minPrice],
                    maxPrice: [...queryValue.maxPrice],
                    keyword: [...keyword],
                });
            }
        } else if (isChecked === false) {
            if (
                value === "Hà Nội" ||
                value === "TP Hồ Chí Minh" ||
                value === "Hải Phòng" ||
                value === "Cần Thơ" ||
                value === "Đà Nẵng" ||
                value === "Bắc Ninh" ||
                value === "Huế" ||
                value === "Biên Hòa" ||
                value === "Thủ Đức" ||
                value === "Hải Dương"
            ) {
                for (let i = 0; i < queryValue.addressShop.length; i++) {
                    if (queryValue.addressShop[i] === value)
                        queryValue.addressShop.splice(i, 1);
                }
                setQueryValue({
                    addressShop: queryValue.addressShop,
                    nameCategory: [...queryValue.nameCategory],
                    minPrice: [...queryValue.minPrice],
                    maxPrice: [...queryValue.maxPrice],
                    keyword: [...keyword],
                });
            }
            if (
                value === "Thời Trang" ||
                value === "Mẹ & Bé" ||
                value === "Thiết Bị Điện Tử" ||
                value === "Máy Tính & Laptop" ||
                value === "Đồng Hồ" ||
                value === "Giày Dép" ||
                value === "Nhà Cửa & Đời Sống" ||
                value === "Sức Khỏe" ||
                value === "Phụ Kiện & Trang Sức Nữ" ||
                value === "Thể Thao" ||
                value === "Oto & Xe Máy & Xe Đạp" ||
                value === "Bách Hóa Online"
            ) {
                for (let i = 0; i < queryValue.nameCategory.length; i++) {
                    if (queryValue.nameCategory[i] === value)
                        queryValue.nameCategory.splice(i, 1);
                }
                setQueryValue({
                    addressShop: [...queryValue.addressShop],
                    nameCategory: queryValue.nameCategory,
                    minPrice: [...queryValue.minPrice],
                    maxPrice: [...queryValue.maxPrice],
                    keyword: [...keyword],
                });
            }
        }
    }

   const handleSubmit = async (values) => {
      if (values.maxPrice !== "" || values.minPrice !== "") {
         queryValue.maxPrice[0] = values.maxPrice;
         queryValue.minPrice[0] = values.minPrice;
         setQueryValue({
            addressShop: [...queryValue.addressShop],
            nameCategory: [...queryValue.nameCategory],
            minPrice: queryValue.minPrice,
            maxPrice: queryValue.maxPrice,
            keyword: [...keyword],
         });
      }
      if (values.maxPrice === "" || values.minPrice !== "") {
         queryValue.minPrice[0] = values.minPrice;
         setQueryValue({
            addressShop: [...queryValue.addressShop],
            nameCategory: [...queryValue.nameCategory],
            minPrice: queryValue.minPrice,
            maxPrice: [...queryValue.maxPrice],
            keyword: [...keyword],
         });
      }
      if (values.maxPrice !== "" || values.minPrice === "") {
         queryValue.maxPrice[0] = values.maxPrice;
         setQueryValue({
            addressShop: [...queryValue.addressShop],
            nameCategory: [...queryValue.nameCategory],
            minPrice: [...queryValue.minPrice],
            maxPrice: queryValue.maxPrice,
            keyword: [...keyword],
         });
      }
   };
   const searchParams = new URLSearchParams();
   useEffect(() => {
      if (
         keyword[0] !== "undefined" &&
         queryValue.keyword.length > 0 &&
         keyword[0] !== "null" &&
         keyword[0] !== null
      ) {
         searchParams.append("keyword", queryValue.keyword[0]);
      }
      if (queryValue.addressShop.length > 0) {
         for (let i = 0; i < queryValue.addressShop.length; i++) {
            searchParams.append("addressShop", queryValue.addressShop[i]);
         }
      }
      if (queryValue.nameCategory.length > 0) {
         for (let i = 0; i < queryValue.nameCategory.length; i++) {
            searchParams.append("nameCategory", queryValue.nameCategory[i]);
         }
      }
      if (queryValue.minPrice[0] !== "" && queryValue.maxPrice[0] !== "") {
         searchParams.append("minPrice", queryValue.minPrice[0]);
         searchParams.append("maxPrice", queryValue.maxPrice[0]);
      }
      if (queryValue.minPrice[0] === "" && queryValue.maxPrice[0] !== "") {
         searchParams.append("maxPrice", queryValue.maxPrice[0]);
      }
      if (queryValue.minPrice[0] !== "" && queryValue.maxPrice[0] === "") {
         searchParams.append("minPrice", queryValue.minPrice[0]);
      }

        const queryString = searchParams.toString();
        if (queryString) {
            setQueryStringAPI(queryString);
            // navigate('?' + queryString)
            navigate("?" + queryString);
        }
        if (!queryString && location.state) {
            setQueryStringAPI(queryString);
            navigate("?" + location.state);
        }
        if (!queryString && !location.state) {
            setQueryStringAPI(queryString);
            navigate("");
        }

    }, [queryValue]);
    useEffect(() => {
        if (location.state) {
            dispatch(search([location.state, 1]));
        } else {
            dispatch(search([queryStringAPI, 1]));
        }
    }, [queryStringAPI]);
    useEffect(() => {
        dispatch(getProducts(1))
    }, []);
    let initialValues = {
        minPrice: '',
        maxPrice: '',
    };
    return (
        <>
            {loading === true ? (
                <>
                    <div className="row">
                        <div
                            className="offset-5 col-2"
                            style={{textAlign: "center", marginTop: "300px"}}>
                            <div className="loader"></div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="row mt-3">
                        <div className="col-2"></div>
                        <div className="col-8">
                            <div className="row">
                                <div className="col-3 bg-light">
                                    <div className="contact-form">
                                        <h5
                                            style={{
                                                marginBottom: "15px",
                                                marginTop: "15px",
                                            }}>
                                            Địa điểm
                                        </h5>
                                        {uniqueProvince && uniqueProvince.map((item, key) => (
                                            <>
                                                <div>
                                                    <label>
                                                        <input
                                                            type="checkbox"
                                                            style={{
                                                                height: "20px",
                                                                width: "20px",
                                                            }}
                                                            onChange={handleChange}
                                                            value={item}
                                                        />{" "}
                                                        {item}
                                                    </label>
                                                </div>
                                            </>
                                        ))}

                                        <br/>
                                        <hr/>
                                        <h5 style={{marginBottom: "15px"}}>
                                            Khoảng giá{" "}
                                        </h5>

                                        <Formik
                                            initialValues={initialValues}
                                            onSubmit={handleSubmit}>
                                            <Form>
                                                <div className="form-group">
                                                    <Field
                                                       type="text"
                                                       name="minPrice"
                                                       style={{
                                                          width: "80px",
                                                          borderRadius: "2px",
                                                       }}
                                                    />
                                                    <a> - </a>
                                                    <Field
                                                       type="text"
                                                       name="maxPrice"
                                                       style={{
                                                          width: "80px",
                                                          borderRadius: "2px",
                                                       }}
                                                    />
                                                </div>

                                                <div className="form-group">
                                                    <button
                                                        type="submit"
                                                        style={{
                                                            height: "40px",
                                                            width: "176px",
                                                            backgroundColor: "rgb(238,77,45)",
                                                            color: "white",
                                                            border: "none",
                                                            borderRadius: "5px",
                                                        }}>
                                                        Áp Dụng
                                                    </button>
                                                </div>
                                            </Form>
                                        </Formik>

                                        <br/>
                                        <hr/>
                                        <h5 style={{marginBottom: "15px"}}>Danh mục</h5>

                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Thời Trang"
                                                />{" "}
                                                Thời Trang
                                            </label>
                                        </div>

                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Mẹ & Bé"
                                                />{" "}
                                                Mẹ & Bé
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Thiết Bị Điện Tử"
                                                />{" "}
                                                Thiết Bị Điện Tử
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Máy Tính & Laptop"
                                                />{" "}
                                                Máy Tính & Laptop
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Đồng Hồ"
                                                />{" "}
                                                Đồng Hồ
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Giày Dép"
                                                />{" "}
                                                Giày Dép
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Nhà Cửa & Đời Sống"
                                                />{" "}
                                                Nhà Cửa & Đời Sống
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Sức Khỏe"
                                                />{" "}
                                                Sức Khỏe
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Phụ Kiện & Trang Sức Nữ"
                                                />{" "}
                                                Phụ Kiện & Trang Sức Nữ
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Thể Thao"
                                                />{" "}
                                                Thể Thao
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Oto & Xe Máy & Xe Đạp"
                                                />{" "}
                                                Oto & Xe Máy & Xe Đạp
                                            </label>
                                        </div>
                                        <div>
                                            <label>
                                                <input
                                                    type="checkbox"
                                                    style={{
                                                        height: "20px",
                                                        width: "20px",
                                                    }}
                                                    onChange={handleChange}
                                                    value="Bách Hóa Online"
                                                />{" "}
                                                Bách Hóa Online
                                            </label>
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                                <div className="col-9" style={{marginLeft: "-1px"}}>
                                    <div
                                        className="col-12 bg-light pt-3 text-center"
                                        style={{
                                            border: "1px solid rgb(231, 229, 229)",
                                            height: "60px",
                                            fontSize: "20px",
                                        }}>
                                        <strong className="text-danger">Sản Phẩm</strong>
                                    </div>
                                    <div className="row col-12 m-0 p-0">
                                        {products !== undefined &&
                                            products.map((item, key) => (
                                                <>
                                                    <div
                                                        key={key}
                                                        className="col-lg-3 col-md-3 p-1 card-product"
                                                        style={{
                                                            height: "316px",
                                                        }}>
                                                        <div>
                                                            <div
                                                                className="bg-light shadow-sm"
                                                                style={{
                                                                    height: "300px",
                                                                }}>
                                                                <Link
                                                                    to={`/product-detail/${item.idProduct}`}
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
                                                                    <div
                                                                        style={{
                                                                            height: "50px",
                                                                        }}>
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
                                                                 textDecoration:
                                                                     "underline",
                                                             }}>
                                                            đ
                                                         </span>{" "}
                                                                            {item.price &&
                                                                                formatCurrency(
                                                                                    item.price
                                                                                )}
                                                                        </div>
                                                                        <div
                                                                            className="text-secondary mr-1 mt-1"
                                                                            style={{
                                                                                float: "right",
                                                                                fontSize: "13px",
                                                                            }}>
                                                                            {item.sold < 1000 && (
                                                                                <>
                                                                                    Đã bán:{" "}
                                                                                    {item.sold}
                                                                                </>
                                                                            )}
                                                                            {item.sold >= 1000 && (
                                                                                <>
                                                                                    Đã bán:{" "}
                                                                                    {(
                                                                                        item.sold /
                                                                                        1000
                                                                                    ).toFixed(1)}
                                                                                    k
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
                                    </div>
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
                                                      search([
                                                         existUrl,
                                                         page1 - 1,
                                                      ])
                                                   );
                                                   navigate(
                                                      `/search?${existUrl}&page=` +
                                                         (page1 - 1)
                                                   );
                                                   window.scrollTo({
                                                      top: 350,
                                                      behavior: "smooth",
                                                   });
                                                }}>
                                                {" "}
                                                <span aria-hidden="true">
                                                   &laquo;
                                                </span>
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
                                                      search([
                                                         existUrl,
                                                         Number(page1) + 1,
                                                      ])
                                                   );
                                                   navigate(
                                                      `/search?${existUrl}&page=` +
                                                         (Number(page1) + 1)
                                                   );
                                                   window.scrollTo({
                                                      top: 350,
                                                      behavior: "smooth",
                                                   });
                                                }}>
                                                {" "}
                                                <span aria-hidden="true">
                                                   &raquo;
                                                </span>
                                             </button>
                                          </>
                                       )}
                                    </li>
                                 </ul>
                              </nav>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-2"></div>
               </div>
            </>
         )}
      </>
   );
}
