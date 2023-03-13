import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {search} from "../../../service/productsService";
import {Field, Form, Formik} from "formik";

export default function Search() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation();
    console.log(location.state)
    let products = useSelector((state) => {

        return state.products.search
    })
    const [checkedValues, setCheckedValues] = useState([]);
    const [checkedValuesDelete, setCheckedValuesDelete] = useState([]);
    const [queryStringAPI, setQueryStringAPI] = useState('');
    const loading = useSelector(state => {
        return state.products.loading
    })
    let a = {
        addressShop: [],
        nameCategory: [],
        minPrice: null,
        maxPrice: null
    }

    function handleChange(event) {
        const isChecked = event.target.checked;
        const value = event.target.value;

        if (isChecked === true) {
            setCheckedValues([...checkedValues, value]);
            setCheckedValuesDelete(checkedValuesDelete.filter((val) => val !== value))
        } else if (isChecked === false) {
            setCheckedValues(checkedValues.filter((val) => val !== value)
            );
            setCheckedValuesDelete([...checkedValuesDelete, value])
        }
    }

    const handleSubmit = async (values) => {
        if (values.maxPrice !== '' || values.minPrice !== '') {
            setCheckedValues([...checkedValues, values]);
            setCheckedValuesDelete(checkedValuesDelete.filter((val) => val.maxPrice !== values.maxPrice && val.minPrice !== values.minPrice)
            )
        } else {
            setCheckedValues(checkedValues.filter((val) => val !== values)
            );
            setCheckedValuesDelete([...checkedValuesDelete, values])
        }
    }

    const searchParams = new URLSearchParams();
    useEffect(() => {
        for (let i = 0; i < checkedValues.length; i++) {
            if (checkedValues[i] === 'Hà Nội' || checkedValues[i] === 'TP Hồ Chí Minh' || checkedValues[i] === 'Hải Phòng') {
                searchParams.append('addressShop', checkedValues[i])
                searchParams.delete(checkedValuesDelete[i]);
                console.log(checkedValuesDelete[i])
            }
            if (typeof checkedValues[i] === "object") {
                if (checkedValues[i].minPrice === '' && checkedValues[i].maxPrice !== '') {
                    searchParams.set('maxPrice', checkedValues[i].maxPrice)
                    searchParams.set('minPrice', '')
                    searchParams.delete('minPrice');
                } else if (checkedValues[i].minPrice !== '' && checkedValues[i].maxPrice === '') {
                    searchParams.set('minPrice', checkedValues[i].minPrice)
                    searchParams.set('maxPrice', '')
                    searchParams.delete('maxPrice');
                } else if (checkedValues[i].minPrice !== '' && checkedValues[i].maxPrice !== '') {
                    searchParams.set('minPrice', checkedValues[i].minPrice)
                    searchParams.set('maxPrice', checkedValues[i].maxPrice)
                    searchParams.delete(checkedValuesDelete[i]);
                } else if (checkedValues[i].minPrice === '' && checkedValues[i].maxPrice === '') {
                    searchParams.set('minPrice', checkedValues[i].minPrice)
                    searchParams.set('maxPrice', checkedValues[i].maxPrice)
                    searchParams.delete('minPrice');
                    searchParams.delete('maxPrice');
                }

            }
            if (checkedValues[i] === 'Quần áo' || checkedValues[i] === 'Điện tử' || checkedValues[i] === 'Thực phẩm') {
                searchParams.append('nameCategory', checkedValues[i])
                searchParams.delete(checkedValuesDelete[i]);
            }
            // searchParams.append(name, checkedValues[i]);
            // searchParams.delete(checkedValuesDelete[i]);
        }
        const queryString = searchParams.toString();
        if (queryString) {
            setQueryStringAPI(queryString)
            navigate('?' + location.state + '&' + queryString)
        }
    }, [checkedValues])
    useEffect(() => {
        console.log(queryStringAPI)
        dispatch(search(queryStringAPI));
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
                        <div className="col-3">
                            <div className="contact-form">

                                <div>
                                    <label>
                                        <input type="checkbox" style={{height: "20px", width: "20px"}}
                                               onChange={handleChange} value=''/> All

                                    </label>
                                </div>
                                <h5 style={{marginBottom: '15px'}}>Địa điểm</h5>

                                <div>
                                    <label>
                                        <input type="checkbox" style={{height: "20px", width: "20px"}}
                                               onChange={handleChange} value="Hà Nội"/> Hà Nội
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
                                               style={{height: "20px", width: "20px"}}/> Hải Phòng
                                    </label>
                                </div>

                                <br/>
                                <h5 style={{marginBottom: '15px'}}>Khoảng giá </h5>
                                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                    <Form>
                                        <div className="form-group">
                                            <Field type="text" name="minPrice"/>
                                        </div>
                                        <div className="form-group">
                                            <Field type="text" name="maxPrice"/>
                                        </div>
                                        <div className="form-group">
                                            <button type="submit">Apply</button>
                                        </div>
                                    </Form>
                                </Formik>

                                <br/>

                                <h5 style={{marginBottom: '15px'}}>Danh mục</h5>

                                <div>
                                    <label>
                                        <input type="checkbox" style={{height: "20px", width: "20px"}}


                                               onChange={handleChange} value="Quần áo"/>Quần áo


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
                        <div className="col-9">
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
                    </div>
                </>
            }
        </>
    )
}