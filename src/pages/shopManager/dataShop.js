import React, {Component, useState} from 'react';
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    PieChart,
    Pie, Cell
} from 'recharts';

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
    let demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
    const [data, setData] = useState([
        {name: 'Group A', value: 400},
        {name: 'Group B', value: 300},
        {name: 'Group C', value: 300},
        {name: 'Group D', value: 200},

    ])
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent, index}) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const loading = useSelector((state) => {
        return state.stats.loading
    });
    const stats = useSelector((state) => {
        return state.stats.sales
    });
    console.log(stats)
    let sale = 0
    if(stats.length !==0){
        for (let i = 0; i < stats.length; i++) {
            sale += stats[i].priceInCart * stats[i].quantityCart
        }
        console.log(sale)
    }
    let outp = [...stats];
    if(stats.length > 0){
        outp.sort(function(a, b) {
            return b.quantityCart- a.quantityCart
        })
        outp.slice(0,3)
    }
    console.log(outp)

    const [queryStringAPI, setQueryStringAPI] = useState("");

    function handleSubmit(values) {
        // let queryString =`${values.name}=${values.value}`
        // setQueryStringAPI(queryString)
        // console.log(queryStringAPI)
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
            <div className="col-10" style={{width: '100%', height: '1000px'}}>
                <div className="row">
                    <div className="col-12  bg-light">
                        <div className="row">
                            <div className="col-2" style={{paddingTop: '30px'}}><p><b>Khung thời gian</b></p></div>
                            <div className="col-2" style={{paddingTop: '30px', marginLeft: '-100px'}}>Năm</div>
                            <div className="col-2" style={{paddingTop: '18px', marginLeft: '-220px'}}>
                                <div className="selectdiv3">
                                    <label>
                                        <select>
                                            <option selected> Select Box</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Last long option</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="col-2" style={{paddingTop: '30px', marginLeft: '-50px'}}>Qúy</div>
                            <div className="col-2" style={{paddingTop: '18px', marginLeft: '-220px'}}>
                                <div className="selectdiv3">
                                    <label>
                                        <select>
                                            <option selected> Select Box</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Last long option</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="col-2" style={{paddingTop: '30px', marginLeft: '-50px'}}>Tháng</div>
                            <div className="col-2" style={{paddingTop: '18px', marginLeft: '-200px'}}>
                                <div className="selectdiv3">
                                    <label>
                                        <select>
                                            <option selected> Select Box</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Last long option</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="col-2" style={{paddingTop: '30px', marginLeft: '-50px'}}>Tuần</div>
                            <div className="col-2" style={{paddingTop: '18px', marginLeft: '-200px'}}>
                                <div className="selectdiv3">
                                    <label>
                                        <select>
                                            <option selected> Select Box</option>
                                            <option>Option 1</option>
                                            <option>Option 2</option>
                                            <option>Last long option</option>
                                        </select>
                                    </label>
                                </div>
                            </div>
                            <div className="col-2" style={{paddingTop: '30px', marginLeft: '-50px'}}></div>
                            <div className="col-2" style={{paddingTop: '22px', marginLeft: '-220px'}}>
                                <button type={'summit'} style={{
                                    width: '165px',
                                    height: '40px',
                                    backgroundColor: 'rgb(238, 77, 45)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px'
                                }}>
                                    <span className="row">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                             fill="currentColor"
                                             className="bi bi-search" viewBox="0 0 16 16"
                                             style={{marginLeft: '50px', marginRight: '5px', marginTop: '-5px'}}>
                                            <path
                                                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                                        </svg>
                                    </div>
                                    <div>
                                        Tìm kiếm
                                    </div>
                                        </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12"
                         style={{background: 'none', width: '100%', height: '20px'}}>
                    </div>
                    <div className="col-12 bg-light"
                         style={{width: '100%', height: '500px'}}>
                    </div>
                    <div className="col-12"
                         style={{background: 'none', width: '100%', height: '20px'}}>
                    </div>
                    <div className="col-12  bg-light" style={{width: '100%'}}>
                        <div className="row">
                            <div style={{width: '60%', height: '400px'}}></div>
                            <div style={{background: 'rgb(231, 229, 229)', width: '1%', height: '400px'}}></div>
                            <div style={{width: '39%', height: '400px'}}>
                                <div className="row">
                                    <div style={{width: '60%'}}>
                                        <h4 style={{textAlign: 'center'}}>Doanh số theo các ngành</h4>
                                        <ResponsiveContainer width="100%" height="90%">
                                            <PieChart width={800} height={800}>
                                                <Pie
                                                    data={data}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={renderCustomizedLabel}
                                                    outerRadius={150}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {data.map((entry, index) => (
                                                        <Cell key={`cell-${index}`}
                                                              fill={COLORS[index % COLORS.length]}/>
                                                    ))}
                                                </Pie>
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                    <div style={{width: '40%', paddingLeft: '50px'}}>
                                        <div className="row">
                                            <div className="col-10" style={{marginTop: '50px'}}><p><b>Chú thích</b></p>
                                            </div>
                                            <div className="row">
                                                <div className="col-2">
                                                    <div className="row">
                                                        {COLORS.map(item => (
                                                            <>

                                                                <div className="col-2" style={{
                                                                    width: '20px',
                                                                    height: '20px',
                                                                    marginTop: '10px',
                                                                    backgroundColor: `${item}`
                                                                }}></div>

                                                            </>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="col-10">
                                                    <div className="row">
                                                        {data.map(item => (
                                                            <>
                                                                <div className="col-12" style={{marginTop:'6px'}}>{item.name}</div>
                                                            </>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
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
                                            outp !== undefined && outp.map((item,index)=>(

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
                        </div>
                    </div>
                </>
            )}
        </>
    );
}



