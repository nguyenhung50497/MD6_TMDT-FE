import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {search} from "../service/productsService";


export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [checkedValues, setCheckedValues] = useState([]);
    const [checkedValuesDelete, setCheckedValuesDelete] = useState([]);
    const [queryValue,setQueryValue] = useState({
        keyword: ['']
    })
    const [queryStringAPI, setQueryStringAPI] = useState('');
    const handleSubmit = async (values) => {
        if (values.keyword !== '') {
            queryValue.keyword[0] = values.keyword
            setQueryValue({
                keyword: queryValue.keyword
            })
        }
        if (values.keyword === '') {
            setQueryValue({
                keyword: ['']
            })
        }
        // if (values) {
        //     console.log(values)
        //     setCheckedValues([...checkedValues, values.keyword]);
        //     setCheckedValuesDelete(checkedValuesDelete.filter((val) => val !== values.keyword)
        //     )
        //
        // } else {
        //     setCheckedValues(checkedValues.filter((val) => val !== values.keyword)
        //     );
        //     setCheckedValuesDelete([...checkedValuesDelete, values.keyword])
        // }
    }
    const searchParams = new URLSearchParams();
    useEffect(() => {
        if(queryValue.keyword[0] !== '') {
            searchParams.append('keyword', queryValue.keyword[0])
        }
        // console.log(checkedValues)
        // if (checkedValues[0] !== undefined) {
        //     searchParams.append('keyword', checkedValues[checkedValues.length-1]);
        //     searchParams.delete(checkedValuesDelete[checkedValues.length-1]);
        // }else if (checkedValues[checkedValues.length-1] === ''){
        //     console.log(111111111)
        //     searchParams.delete('keyword');
        // }
        const queryString = searchParams.toString();
        if (queryString) {
            setQueryStringAPI(queryString)
            navigate('/home/search?' + queryString,{state: queryValue.keyword[0]})

        }
        else  {
            setQueryStringAPI(queryString)
            navigate('/home/search')
        }
    }, [queryValue.keyword[0]])
    useEffect(() => {
        dispatch(search(queryStringAPI));
    }, [queryStringAPI]);
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Link className="navbar-brand" to="/home">Logo</Link>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link className="nav-link" to="add-blog">Add Blog <span
                                        className="sr-only">(current)</span></Link>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Pricing</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link disabled">Disabled</a>
                                </li>
                            </ul>

                            <Formik initialValues={{keyword: ''}} onSubmit={handleSubmit}>
                                <Form>
                                    <div className="form-group">
                                        <Field type="text" name="keyword"/>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit">Apply</button>
                                    </div>
                                </Form>
                            </Formik>


                        </div>
                    </nav>
                </div>
            </div>
        </>
    )
}