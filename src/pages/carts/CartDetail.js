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


export default function CartDetail() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector((state) => {
        return state.cartDetail.loading
    });
    const cartDetail = useSelector((state) => {
        return state.cartDetail.searchCartDetail
    })

    const [queryStringAPI, setQueryStringAPI] = useState("");

    function handleSubmit(values) {
        let queryString =`${values.name}=${values.value}`
        setQueryStringAPI(queryString)
        console.log(queryStringAPI)
    }
    useEffect(() => {
       if (queryStringAPI){
           navigate('?'+queryStringAPI)
       }
    }, [queryStringAPI]);
    useEffect(() => {
        dispatch(searchCartDetail(queryStringAPI))
    }, [queryStringAPI]);
    let initialValues = {
        name: 'username',
        value: '',
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
                                    <Field as="select" name="name">
                                        <option value="username">Username</option>
                                        <option value="phoneUser">Phone User</option>
                                        <option value="idCartDetail">Id Cart Detail</option>
                                    </Field>
                                    <Field
                                        type="text"
                                        name="value"
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
                                    cartDetail !== undefined && cartDetail.map((item,index)=>(

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
