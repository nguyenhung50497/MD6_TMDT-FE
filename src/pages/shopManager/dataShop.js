import React, {Component} from 'react';
import {ResponsiveContainer, BarChart, Bar, XAxis, PieChart, Pie, Cell, YAxis} from 'recharts';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Field, Form, Formik} from "formik";
import {sales} from "../../service/statsService";


export default function DataShop() {
    let {id} = useParams()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [queryStringAPI, setQueryStringAPI] = useState("");
    const [check, setCheck] = useState(false)
    const cartDetail = useSelector((state) => {
        if (state.stats.sales !== undefined) {
            return state.stats.sales
        }
    });
    let stats = []
    for (let i = 0; i < cartDetail.length; i++) {
        if (cartDetail[i].idShop === +id) {
            stats.push(cartDetail[i])
        }
    }
    let demoUrl = 'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj';
    const formatCurrency = (price) => {
        var DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
        let priceWithCommas = price.toLocaleString();
        let arParts = String(priceWithCommas).split(DecimalSeparator);
        let intPart = arParts[0];
        var decPart = arParts.length > 1 ? arParts[1] : "";
        return intPart;
    };
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
//////////////////////////////////////////////////////////////////////////////////
    let sale = 0 // lấy tổng doanh số
    if (stats.length !== 0) {
        for (let i = 0; i < stats.length; i++) {
            sale += stats[i].priceInCart * stats[i].quantityCart
        }
    }
    let outp = [...stats]; // tốp sản phẩm bán chạy
    if (stats.length > 0) {
        outp.sort(function (a, b) {
            return b.quantityCart - a.quantityCart
        })
        outp.splice(5)
    }
/////////////////////////////////////////////////////////////////////////////
    let allProductQuantity = 0 //lấy tổng số sản phầm
    if (stats.length !== 0) {
        for (let i = 0; i < stats.length; i++) {
            allProductQuantity += stats[i].quantityCart
        }
    }
///////////////////////////////////////////////////
    let category = []
    let valueCategory = []
    let quantityCategory = []
    for (let i = 0; i < stats.length; i++) {
        category.push(stats[i].nameCategory)
        valueCategory.push(stats[i].priceInCart * stats[i].quantityCart)
        quantityCategory.push(stats[i].quantityCart)
    }

    let indicesCategory = [...new Set(category)];
    let indicesValueCategory = []
    let indicesQuantityCategory = []
    let temp1 = 0
    let temp2 = 0
    for (let i = 0; i < indicesCategory.length; i++) {
        temp1 = 0
        temp2 = 0
        for (let j = 0; j < category.length; j++) {
            if (category[j] === indicesCategory[i]) {
                temp1 += valueCategory[j]
                temp2 += quantityCategory[j]
            }
        }
        indicesValueCategory.push(temp1)
        indicesQuantityCategory.push(temp2)
    }

    let categoryStat = []; //thống kế doanh số theo danh mục
    for (let i = 0; i < indicesCategory.length; i++) {
        categoryStat.push({
                name: indicesCategory[i],
                value: indicesValueCategory[i],
                quantity: indicesQuantityCategory[i]
            }
        );
    }
    const COLORS = [];
    const getRandomIntInclusive = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    const getRandomHEX = () => {
        const r = getRandomIntInclusive(0, 255);
        const g = getRandomIntInclusive(0, 255);
        const b = getRandomIntInclusive(0, 255);

        const toHexa = (v) => v.toString(16).padStart(2, "0");
        return `#${toHexa(r)}${toHexa(g)}${toHexa(b)}`;
    };


    for (let i = 0; i < categoryStat.length; i += 1) {
        COLORS.push(` ${getRandomHEX()}`)
    }

///////////////////////////////////////////////////////////////////////////////

    let product = []
    let valueProduct = []
    let quantityProduct = []
    for (let i = 0; i < stats.length; i++) {
        product.push(stats[i].nameProduct)
        valueProduct.push(stats[i].priceInCart * stats[i].quantityCart)
        quantityProduct.push(stats[i].quantityCart)
    }

    let indicesProduct = [...new Set(product)];
    let indicesValueProduct = []
    let indicesQuantityProduct = []
    let x = 0
    let y = 0
    for (let i = 0; i < indicesProduct.length; i++) {
        x = 0
        y = 0
        for (let j = 0; j < product.length; j++) {
            if (product[j] === indicesProduct[i]) {
                x += valueProduct[j]
                y += quantityProduct[j]
            }
        }
        indicesValueProduct.push(x)
        indicesQuantityProduct.push(y)
    }
    let productStat = []; //thống kê doanh số theo sản phẩm
    for (let i = 0; i < indicesProduct.length; i++) {
        productStat.push({
                product: indicesProduct[i],
                total: indicesValueProduct[i],
                quantity: indicesQuantityProduct[i]
            }
        );
    }

////////////////////////////////////////////////////////////////////////////////////////
    function handleSubmit(values) {
        if (values.week !== '' && values.month !== '' && values.quarter !== '' && values.year !== '') {
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
                        <Formik
                            initialValues={initialValues}
                            onSubmit={handleSubmit}>
                            <Form>
                                <div className="row">
                                    <div className="col-2" style={{paddingTop: '30px'}}><p><b>Khung thời gian</b></p>
                                    </div>
                                    <div className="col-2" style={{paddingTop: '30px', marginLeft: '-100px'}}>Năm</div>
                                    <div className="col-2" style={{paddingTop: '18px', marginLeft: '-220px'}}>
                                        <div className="selectdiv3">
                                            <label>
                                                <Field as="select" name="year">
                                                    <option value=""></option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                    <option value="2025">2025</option>
                                                </Field>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-2" style={{paddingTop: '30px', marginLeft: '-50px'}}>Qúy</div>
                                    <div className="col-2" style={{paddingTop: '18px', marginLeft: '-220px'}}>
                                        <div className="selectdiv3">
                                            <label>
                                                <Field as="select" name="quarter">
                                                    <option value=""></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                </Field>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-2" style={{paddingTop: '30px', marginLeft: '-50px'}}>Tháng</div>
                                    <div className="col-2" style={{paddingTop: '18px', marginLeft: '-200px'}}>
                                        <div className="selectdiv3">
                                            <label>
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
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-2" style={{paddingTop: '30px', marginLeft: '-50px'}}>Tuần</div>
                                    <div className="col-2" style={{paddingTop: '18px', marginLeft: '-200px'}}>
                                        <div className="selectdiv3">
                                            <label>
                                                <Field as="select" name="week">
                                                    <option value=""></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                </Field>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-2" style={{paddingTop: '30px', marginLeft: '-50px'}}></div>
                                    <div className="col-2" style={{paddingTop: '22px', marginLeft: '-220px'}}>
                                        <button type={'submit'} style={{
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
                            </Form>
                        </Formik>
                    </div>

                    <div className="col-12"
                         style={{background: 'none', width: '100%', height: '20px'}}>
                    </div>
                    <div className="col-12">
                        <div className="row">
                            <div className="bg-light" style={{width: '69%', height: '500px'}}>
                                <div className="row">
                                    <div className="col-12" style={{width: '100%', height: '100px'}}>
                                        <div className="row">
                                            <div className="col-12" style={{marginTop: '14px', marginLeft: '14px'}}>
                                                <div className="row">
                                                    <div className="col-2"
                                                         style={{marginLeft: '24px'}}>
                                                        <button type={'submit'} style={{
                                                            width: '300px',
                                                            height: '50px',
                                                            background: 'none',
                                                            border: '1px gray solid',
                                                            borderRadius: '5px'
                                                        }} onClick={() => setCheck(false)}>
                                                    <p className="col-12"
                                                       style={{marginTop: '10px', marginLeft: '-60px'}}>
                                                       Tổng doanh thu
                                                    </p>
                                                     <p style={{
                                                         marginTop: '-42px',
                                                         marginLeft: '150px',
                                                         fontSize: '20px',
                                                         color: 'rgb(238, 77, 45)'
                                                     }}>
                                                        đ {sale && formatCurrency(sale)}
                                                    </p>
                                                        </button>
                                                    </div>
                                                    <div className="col-3"
                                                         style={{marginLeft: '200px'}}>
                                                        <button type={'submit'} style={{
                                                            width: '300px',
                                                            height: '50px',
                                                            background: 'none',
                                                            border: '1px gray solid',
                                                            borderRadius: '5px'
                                                        }} onClick={() => setCheck(true)}><span className="row">
                                                    <p className="col-12"
                                                          style={{marginTop: '10px', marginLeft: '-50px'}}>
                                                       Tổng sản phẩm bán
                                                    </p>
                                                     <p style={{
                                                         marginTop: '8px',
                                                         marginLeft: '-20px',
                                                         fontSize: '20px',
                                                         color: 'rgb(238, 77, 45)'
                                                     }}>
                                                       {allProductQuantity && formatCurrency(allProductQuantity)}
                                                    </p>
                                                </span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12"></div>
                                        </div>
                                    </div>
                                    <div className="col-12" style={{height: '300px', marginTop: '-10px'}}>
                                        {check === false ?
                                            <>
                                                <p style={{fontSize: '20px',textAlign: 'center'}}>Biểu đồ doanh thu tổng của sản phẩm<b style={{color: 'rgb(238, 77, 45)'}}>(đơn vị VNĐ)</b></p>
                                                <ResponsiveContainer width='100%' aspect={3} >
                                                    <BarChart data={productStat} width={600} height={600} style={{fontSize: '15px'}}>
                                                        <XAxis dataKey='product'/>
                                                        <YAxis/>
                                                        <Bar dataKey='total' fill='#8883d8' />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </>
                                            :
                                            <>
                                                <p style={{fontSize: '20px',textAlign: 'center'}}>Biểu đồ tổng đã bán của sản phẩm</p>
                                                <ResponsiveContainer width='100%' aspect={3}>
                                                    <BarChart data={productStat} width={600} height={600}>
                                                        <XAxis dataKey='product'/>
                                                        <YAxis/>
                                                        <Bar dataKey='quantity' fill='#8883d8'/>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div style={{width: '1%', height: '500px', background: 'none'}}></div>
                            <div className="bg-light" style={{width: '29%', height: '500px'}}>
                                <div className="col-12" style={{padding: '10px'}}>
                                    <div className="row">
                                        <div className="col-12" style={{
                                            textAlign: 'center',
                                            marginBottom: '10px',
                                            color: 'rgb(238, 77, 45)'
                                        }}>
                                            <h2>Top sản phẩm bán chạy</h2>
                                        </div>
                                        <div className="col-12">
                                            <table className="table table" style={{width: '100%', height: '400px'}}>
                                                <thead>
                                                <tr style={{
                                                    backgroundColor: 'rgb(238, 77, 45)',
                                                    color: 'white',
                                                    fontSize: '20px'
                                                }}>
                                                    <th scope="col">Tên sản phẩm</th>
                                                    <th scope="col">Số lượt</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {outp && outp.map(item => (
                                                    <>

                                                        <tr style={{fontSize: '18px'}}>
                                                            <td>{item.nameProduct}</td>
                                                            <td>{item.quantityCart}</td>
                                                        </tr>
                                                    </>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12" style={{background: 'none', width: '100%', height: '20px'}}>
                    </div>
                    <div className="col-12  bg-light" style={{width: '100%'}}>
                        <div className="row">
                            <div style={{width: '60%', height: '400px'}}>
                                {/*<div className="col-12" style={{padding: '10px'}}>*/}
                                {/*    <div className="row">*/}
                                {/*        <div className="col-12" style={{*/}
                                {/*            textAlign: 'center',*/}
                                {/*            marginBottom: '10px',*/}
                                {/*            color: 'rgb(238, 77, 45)'*/}
                                {/*        }}>*/}
                                {/*            <h2>Thứ hạng người dùng</h2>*/}
                                {/*        </div>*/}
                                {/*        <div className="col-12">*/}
                                {/*            <table className="table table" style={{width: '100%'}}>*/}
                                {/*                <thead>*/}
                                {/*                <tr style={{*/}
                                {/*                    backgroundColor: 'rgb(238, 77, 45)',*/}
                                {/*                    color: 'white',*/}
                                {/*                    fontSize: '20px'*/}
                                {/*                }}>*/}
                                {/*                    <th scope="col">Tên sản phẩm</th>*/}
                                {/*                    <th scope="col">Số lượt</th>*/}
                                {/*                </tr>*/}
                                {/*                </thead>*/}
                                {/*                <tbody>*/}
                                {/*                {outp && outp.map(item => (*/}
                                {/*                    <>*/}

                                {/*                        <tr style={{fontSize: '18px'}}>*/}
                                {/*                            <td>{item.nameProduct}</td>*/}
                                {/*                            <td>{item.quantityCart}</td>*/}
                                {/*                        </tr>*/}
                                {/*                    </>*/}
                                {/*                ))}*/}
                                {/*                </tbody>*/}
                                {/*            </table>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div style={{background: 'rgb(231, 229, 229)', width: '1%', height: '400px'}}></div>
                            <div style={{width: '39%', height: '400px'}}>
                                <div className="row">
                                    <div style={{width: '60%'}}>
                                        <h4 style={{textAlign: 'center'}}>Doanh số theo các ngành</h4>
                                        <ResponsiveContainer width="100%" height="90%">
                                            <PieChart width={800} height={800}>
                                                <Pie
                                                    data={categoryStat}
                                                    cx="50%"
                                                    cy="50%"
                                                    labelLine={false}
                                                    label={renderCustomizedLabel}
                                                    outerRadius={150}
                                                    fill="#8884d8"
                                                    dataKey="value"
                                                >
                                                    {categoryStat && categoryStat.map((entry, index) => (
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
                                                        {categoryStat.map(item => (
                                                            <>
                                                                <div className="col-12"
                                                                     style={{marginTop: '6px'}}>{item.name}</div>
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
    );
}



