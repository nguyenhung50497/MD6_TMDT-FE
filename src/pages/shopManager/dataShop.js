import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {sales} from "../../service/statsService";

export default function DataShop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector((state) => {
        return state.stats.loading
    });
    const stats = useSelector((state) => {
        return state.stats.sales
    });
    const [queryStringAPI, setQueryStringAPI] = useState("");

    let sale = 0
    if(stats.length !==0){
        for (let i = 0; i < stats.length; i++) {
            sale += stats[i].priceInCart * stats[i].quantityCart
        }

    }

    let topSeller = [...stats];
    if(stats.length !== 0){
        topSeller.sort(function(a, b) {
            return b.quantityCart*b.priceInCart - a.quantityCart*a.priceInCart
        })
        topSeller.slice(0,3)
    }

    let productQuantity = 0
    if(stats.length !==0){
        for (let i = 0; i < stats.length; i++) {
            productQuantity += stats[i].quantityCart
        }
    }

    let totalPriceByCategoty = []
    if(stats.length !== 0){
        for (let i = 0; i < stats.length; i++) {
            totalPriceByCategoty.push(stats[i].quantityCart)
        }
    }


    function handleSubmit(values) {
        if (values.week !== '' && values.month !== '' &&  values.quarter !== '' && values.year !== '') {
            let queryString = `week=${values.week}&month=${values.month}&quarter=${values.quarter}&year=${values.year}`
            setQueryStringAPI(queryString)
        }
        if (values.week === '' && values.month !== '' && values.quarter !== '' && values.year !== '') {
            let queryString = `month=${values.month}&quarter=${values.quarter}&year=${values.year}`
            setQueryStringAPI(queryString)
        }
        if (values.week === '' && values.month === '' && values.quarter !== '' && values.year !== '') {
            let queryString = `quarter=${values.quarter}&year=${values.year}`
            setQueryStringAPI(queryString)
        }
        if (values.week === '' && values.month === '' && values.quarter === '' && values.year !== '') {
            let queryString = `year=${values.year}`
            setQueryStringAPI(queryString)
        }
        if (values.week === '' && values.month === '' && values.quarter === '' && values.year === '') {
            let queryString = undefined
            setQueryStringAPI(queryString)
        }
    }

    console.log(queryStringAPI)
    useEffect(() => {
        if (queryStringAPI) {
            navigate('?' + queryStringAPI)
        }
        if (!queryStringAPI) {
            navigate('')
        }
    }, [queryStringAPI]);
    useEffect(() => {
        dispatch(sales(queryStringAPI))
    }, [queryStringAPI]);
    let initialValues = {
        week: '',
        month: '',
        quarter: '',
        year: ''
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
                    <div className="col-2 "></div>
                    <div className="col-8">

                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}>
                            <Form>
                                <div className="form-group">
                                    <label>Năm</label>
                                    <Field as="select" name="year">
                                        <option value=""></option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
                                    </Field>
                                    <label>Quý</label>
                                    <Field as="select" name="quarter">
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </Field>
                                    <label>Tháng</label>
                                    <Field as="select" name="month">
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </Field>
                                    <label>Tuần</label>
                                    <Field as="select" name="week">
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Field>

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
                    </div>
                    <div className="col-2 "></div>
                    <div className="row">
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12">
                                    <h1>{sale}</h1>
                                    <h1>{productQuantity}</h1>
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Username</th>
                                            <th scope="col">Product Name</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Shop Name</th>
                                            <th scope="col">Time</th>
                                            <th scope="col">Total Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            topSeller !== undefined && topSeller.map((item,index)=>(
                                                    <tr>
                                                        <th scope="col">{index + 1}</th>
                                                        <td>{item.username}</td>
                                                        <td>{item.nameProduct}</td>
                                                        <td>{item.priceInCart}</td>
                                                        <td>{item.nameShop}</td>
                                                        <td>{item.timePayCart}</td>
                                                        <td>{item.priceInCart*item.quantityCart}</td>
                                                    </tr>
                                                )
                                            )
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}



