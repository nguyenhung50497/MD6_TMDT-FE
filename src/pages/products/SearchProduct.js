import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {search} from "../../service/productService";
import {Field, Form, Formik} from "formik";

export default function SearchProduct() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();

    let products = useSelector((state) => {

        return state.products.search
    })
    const keyword = useSelector(state => {
        return state.products.keyword
    })

    const [queryValue, setQueryValue] = useState({
        addressShop: [],
        nameCategory: [],
        minPrice: [''],
        maxPrice: [''],
        keyword: [...keyword]
    })
    const [queryStringAPI, setQueryStringAPI] = useState('');
    const loading = useSelector(state => {
        return state.products.loading
    })

    function handleChange(event) {
        const isChecked = event.target.checked;
        const value = event.target.value;
        if (isChecked === true) {
            if (value === 'Hà Nội' || value === 'TP Hồ Chí Minh' || value === 'Hải Phòng') {
                queryValue.addressShop.push(value)
                setQueryValue({
                    addressShop: queryValue.addressShop,
                    nameCategory: [...queryValue.nameCategory],
                    minPrice: [...queryValue.minPrice],
                    maxPrice: [...queryValue.maxPrice],
                    keyword: [...keyword]
                })

            }
            if (value === 'Quần áo' || value === 'Điện tử' || value === 'Thực phẩm') {
                queryValue.nameCategory.push(value)
                setQueryValue({
                    addressShop: [...queryValue.addressShop],
                    nameCategory: queryValue.nameCategory,
                    minPrice: [...queryValue.minPrice],
                    maxPrice: [...queryValue.maxPrice],
                    keyword: [...keyword]
                })
            }
        } else if (isChecked === false) {
            if (value === 'Hà Nội' || value === 'TP Hồ Chí Minh' || value === 'Hải Phòng') {
                for (let i = 0; i < queryValue.addressShop.length; i++) {
                    if (queryValue.addressShop[i] === value) queryValue.addressShop.splice(i, 1)
                }
                setQueryValue({
                    addressShop: queryValue.addressShop,
                    nameCategory: [...queryValue.nameCategory],
                    minPrice: [...queryValue.minPrice],
                    maxPrice: [...queryValue.maxPrice],
                    keyword: [...keyword]
                })
            }
            if (value === 'Quần áo' || value === 'Điện tử' || value === 'Thực phẩm') {
                for (let i = 0; i < queryValue.nameCategory.length; i++) {
                    if (queryValue.nameCategory[i] === value) queryValue.nameCategory.splice(i, 1)

                }
                setQueryValue({
                    addressShop: [...queryValue.addressShop],
                    nameCategory: queryValue.nameCategory,
                    minPrice: [...queryValue.minPrice],
                    maxPrice: [...queryValue.maxPrice],
                    keyword: [...keyword]
                })
            }
        }
    }

    const handleSubmit = async (values) => {

        if (values.maxPrice !== '' || values.minPrice !== '') {
            queryValue.maxPrice[0] = values.maxPrice
            queryValue.minPrice[0] = values.minPrice
            setQueryValue({
                addressShop: [...queryValue.addressShop],
                nameCategory: [...queryValue.nameCategory],
                minPrice: queryValue.minPrice,
                maxPrice: queryValue.maxPrice,
                keyword: [...keyword]
            })
        }
        if (values.maxPrice === '' || values.minPrice !== '') {
            queryValue.minPrice[0] = values.minPrice
            setQueryValue({
                addressShop: [...queryValue.addressShop],
                nameCategory: [...queryValue.nameCategory],
                minPrice: queryValue.minPrice,
                maxPrice: [...queryValue.maxPrice],
                keyword: [...keyword]
            })
        }
        if (values.maxPrice !== '' || values.minPrice === '') {
            queryValue.maxPrice[0] = values.maxPrice
            setQueryValue({
                addressShop: [...queryValue.addressShop],
                nameCategory: [...queryValue.nameCategory],
                minPrice: [...queryValue.minPrice],
                maxPrice: queryValue.maxPrice,
                keyword: [...keyword]
            })
        }

    }
    const searchParams = new URLSearchParams();
    useEffect(() => {
        if (keyword[0] !== 'undefined' && queryValue.keyword.length > 0 && keyword[0] !== 'null' && keyword[0] !== null) {
            searchParams.append('keyword', queryValue.keyword[0])
        }
        if (queryValue.addressShop.length > 0) {
            for (let i = 0; i < queryValue.addressShop.length; i++) {
                searchParams.append('addressShop', queryValue.addressShop[i])
            }
        }
        if (queryValue.nameCategory.length > 0) {
            for (let i = 0; i < queryValue.nameCategory.length; i++) {
                searchParams.append('nameCategory', queryValue.nameCategory[i])
            }
        }
        if (queryValue.minPrice[0] !== '' && queryValue.maxPrice[0] !== '') {
            searchParams.append('minPrice', queryValue.minPrice[0])
            searchParams.append('maxPrice', queryValue.maxPrice[0])
        }
        if (queryValue.minPrice[0] === '' && queryValue.maxPrice[0] !== '') {
            searchParams.append('maxPrice', queryValue.maxPrice[0])
        }
        if (queryValue.minPrice[0] !== '' && queryValue.maxPrice[0] === '') {
            searchParams.append('minPrice', queryValue.minPrice[0])
        }

        const queryString = searchParams.toString();

        if (queryString) {
            setQueryStringAPI(queryString)
            // navigate('?' + queryString)
            navigate('?' + queryString)
        }
        if (!queryString && location.state ){
            setQueryStringAPI(queryString)
            navigate('?'+ location.state)
        }
        if (!queryString && !location.state) {
            setQueryStringAPI(queryString)
            navigate('')
        }
    }, [queryValue])
    useEffect(() => {
        if(location.state){
            dispatch(search(location.state))
        }else {
            dispatch(search(queryStringAPI));
        }

    }, [queryStringAPI]);
    let initialValues = {
        minPrice: "",
        maxPrice: "",
    };
    return (
        <>
            {loading === true ?
                <>
                    <div className="row">
                        <div className="offset-5 col-2" style={{textAlign: 'center', marginTop: '300px'}}>
                            <div className="loader"></div>
                        </div>
                    </div>
                </>
                : <>
                    <div className="row">
                        <div className="col-2"></div>
                        <div className="col-2">
                            <div className="contact-form">

                                <h5 style={{marginBottom: '15px',marginTop:'15px'}}>Địa điểm</h5>

                                <div>
                                    <label>
                                        <input type="checkbox" style={{height: "20px", width: "20px"}} onChange={handleChange} value="Hà Nội"/> Hà Nội
                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <input type="checkbox" style={{height: "20px", width: "20px"}}
                                               onChange={handleChange} value="TP Hồ Chí Minh"/> TP Hồ Chí Minh
                                    </label>
                                </div>

                                <div>
                                    <label>

                                        <input type="checkbox" onChange={handleChange} value="Hải Phòng"
                                               style={{height: "20px", width: "20px"}} /> Hải Phòng
                                    </label>
                                </div>

                                <br/>
                                <hr/>
                                <h5 style={{marginBottom: '15px'}}>Khoảng giá </h5>
                                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                    <Form>
                                        <div className="form-group">
                                            <Field type="text" name="minPrice" style={{width:'80px',borderRadius:'2px'}} />
                                            <a> - </a>
                                            <Field type="text" name="maxPrice" style={{width:'80px',borderRadius:'2px'}}/>
                                        </div>

                                        <div className="form-group" >
                                            <button type="submit" style={{height:'40px', width: "176px", backgroundColor:"rgb(238,77,45)", color:"white", border:"none", borderRadius:'5px'}}>Áp Dụng</button>
                                        </div>
                                    </Form>
                                </Formik>

                                <br/>
                                <hr/>
                                <h5 style={{marginBottom: '15px'}}>Danh mục</h5>

                                <div>
                                    <label>
                                        <input type="checkbox" style={{height: "20px", width: "20px"}}


                                               onChange={handleChange} value="Quần áo"/> Quần áo


                                    </label>
                                </div>

                                <div>
                                    <label>
                                        <input type="checkbox" style={{height: "20px", width: "20px"}}
                                               onChange={handleChange} value="Điện tử"/> Điện tử
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        <input type="checkbox" style={{height: "20px", width: "20px"}}
                                               onChange={handleChange} value="Thực phẩm"/> Thực phẩm
                                    </label>
                                </div>
                                <br/>

                            </div>
                        </div>
                        <div className="col-6">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Category</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    products !== undefined && products.map((item, index) => (

                                            <tr>
                                                <th scope="col">{index + 1}</th>
                                                <td>{item.nameProduct}</td>
                                                <td><img src={item.image} style={{width: '100px', height: '100px'}}></img></td>
                                                <td>{item.price}</td>
                                                <td>{item.addressShop}</td>
                                                <td>{item.nameCategory}</td>
                                            </tr>
                                        )
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </>
            }
        </>
    )
}