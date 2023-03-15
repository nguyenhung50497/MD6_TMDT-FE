import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {search} from "../service/productsService";


export default function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [queryValue,setQueryValue] = useState({
        keyword: ['']
    })
    const existUrl = useSelector(state => {
        return state.products.existUrl
    })
    const [queryStringAPI, setQueryStringAPI] = useState('');
    const handleSubmit = async (values) => {
        console.log(values)
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
        console.log(queryValue.keyword)
    }
    const existSearchParams = new URLSearchParams(existUrl)
    let key =[]
    let value =[]
    for (const [key1, value1] of existSearchParams.entries()) {
        key.push(key1)
        value.push(value1)
    }
    const searchParams = new URLSearchParams();
    useEffect(() => {
        // if(queryValue.keyword[0] !== '') {
        //     searchParams.append('keyword', queryValue.keyword[0])
        // }
        // const queryString = searchParams.toString();
        let queryString = ''
        if(existUrl === ''){
            if(queryValue.keyword[0] !== '') {
                searchParams.append('keyword', queryValue.keyword[0])
            }
            queryString += searchParams.toString();
        }
        if(existUrl !== ''){
            console.log(queryValue.keyword)
            if(key.length === 1){
                if(queryValue.keyword[0] !== '') {
                    searchParams.append('keyword', queryValue.keyword[0])
                }
                queryString += searchParams.toString();
            }
            else {
                if(queryValue.keyword[0] !== '') {
                    searchParams.append('keyword', queryValue.keyword[0])
                }

                for (let i = 1; i < key.length; i++) {
                    searchParams.append(key[i], value[i])
                }
                queryString += searchParams.toString();
            }

        }
        if (queryString ) {
            setQueryStringAPI(queryString)
            navigate('/home/search?' + queryString,{state: queryString})
        }
        // if (queryString && existUrl !== '') {
        //     setQueryStringAPI(existUrl)
        //     navigate('/home/search?' + existUrl,{state: queryString})
        // }
        if (!queryString && existUrl !== '')  {
            setQueryStringAPI(queryString)
            navigate('/home/search')
        }
        if (!queryString && existUrl === '')  {
            setQueryStringAPI(queryString)
            navigate('/home')
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

                            <Formik initialValues={{keyword: ['']}} onSubmit={handleSubmit}>
                                <Form>
                                    <div className="form-group">
                                        <Field type="text" name="keyword"/>
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