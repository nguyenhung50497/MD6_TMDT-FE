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
    return (
        <>
            <div className="col-10 bg-light" style={{width: '100%', height: '1000px'}}>
                <div className="row">
                    <div className="col-12">
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
                         style={{backgroundColor: 'rgb(231, 229, 229)', width: '100%', height: '20px'}}>
                    </div>
                    <div className="col-12 bg-light"
                         style={{width: '100%', height: '500px'}}>
                    </div>
                    <div className="col-12"
                         style={{backgroundColor: 'rgb(231, 229, 229)', width: '100%', height: '20px'}}>
                    </div>
                    <div className="col-12" style={{width: '100%'}}>
                        <div className="row">
                            <div style={{backgroundColor: 'red', width: '60%', height: '400px'}}></div>
                            <div style={{backgroundColor: 'rgb(231, 229, 229)', width: '1%', height: '400px'}}></div>
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
}