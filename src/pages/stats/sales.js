import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
    Link,
    useLocation,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {searchCartDetail} from "../../service/cartDetailService";
import {sales} from "../../service/statsService";


export default function Sales() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector((state) => {
        return state.stats.loading
    });
    const stats = useSelector((state) => {
        console.log(state)
        return state.stats.sales
    });
    console.log(stats)


    const [queryStringAPI, setQueryStringAPI] = useState("");

    function handleSubmit(values) {
        // let queryString =`${values.name}=${values.value}`
        // setQueryStringAPI(queryString)
        // console.log(queryStringAPI)
        if (values.week !== '' && values.month !== '' && values.year !== '') {
            let queryString = `week=${values.week}&month=${values.month}&year=${values.year}`
            setQueryStringAPI(queryString)
        }
        if (values.week === '' && values.month !== '' && values.year !== '') {
            let queryString = `month=${values.month}&year=${values.year}`
            setQueryStringAPI(queryString)
        }
        if (values.week === '' && values.month === '' && values.year !== '') {
            let queryString = `year=${values.year}`
            setQueryStringAPI(queryString)
        }
    }

    useEffect(() => {
        if (queryStringAPI) {
            navigate('?' + queryStringAPI)
        }
    }, [queryStringAPI]);
    useEffect(() => {
        dispatch(sales(queryStringAPI))
    }, [queryStringAPI]);
    let initialValues = {
        week: '',
        month: '',
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
                                    <label>Week</label>
                                    <Field as="select" name="week">
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                    </Field>
                                    <label>Month</label>
                                    <Field as="select" name="month">
                                        <option value=""></option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="5">6</option>
                                        <option value="5">7</option>
                                        <option value="5">8</option>
                                        <option value="5">9</option>
                                        <option value="5">10</option>
                                        <option value="5">11</option>
                                        <option value="5">12</option>

                                    </Field>
                                    <label>Year</label>
                                    <Field as="select" name="year">
                                        <option value=""></option>
                                        <option value="2020">2020</option>
                                        <option value="2021">2021</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                        <option value="2024">2024</option>
                                        <option value="2025">2025</option>
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
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Product Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Shop Name</th>
                                    <th scope="col">Time</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    stats !== undefined && stats.map((item,index)=>(

                                            <tr>
                                                <th scope="col">{index + 1}</th>
                                                <td>{item.username}</td>
                                                <td>{item.nameProduct}</td>
                                                <td>{item.priceInCart}</td>
                                                <td>{item.nameShop}</td>
                                                <td>{item.timeCartDetail}</td>
                                            </tr>
                                        )
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
