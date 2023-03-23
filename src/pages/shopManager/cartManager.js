import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {
    getAllCartShop,
    getCartByStatus,
    getDetailCart, orderStatusRefunds, orderStatusSending, searchByCategory,
    searchByIdCart,
    searchByName,
    searchByPhone
} from "../../service/cartService";
import swal from "sweetalert";

export default function CartManager() {
    const [type, setType] = useState('Mã đơn hàng')
    const [statusCart, setStatusCart] = useState('')
    let {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carts = useSelector((state) => {
        if (state !== undefined) {
            return state.carts.carts
        }
    });
    const detailCart = useSelector((state) => {
        if (state !== undefined) {
            return state.carts.detailCart
        }
    });
    let total = 0
    for (let i = 0; i < detailCart.length; i++) {
        total += Number(detailCart[i].priceInCart) * Number(detailCart[i].quantityCart)
    }
    const handleDetailCart = (values) => {
        let data = {
            idCart: values,
            idShop: id
        }
        dispatch(getDetailCart(data))
    }
    const handleSearch = (values) => {
        let data = {...values}
        data.idShop = id
        if (type === 'Tên khách hàng') {
            dispatch(searchByName(data))
        } else if (type === 'Số điện thoại') {
            dispatch(searchByPhone(data))
        } else if (type === "Mã đơn hàng") {
            dispatch(searchByIdCart(data))
        } else if (type === 'Loại hàng') {
            dispatch(searchByCategory(data))
        }
    }
    const formatCurrency = (price) => {
        let DecimalSeparator = Number("1.2").toLocaleString().substr(1, 1);
        let priceWithCommas = price.toLocaleString();
        let arParts = String(priceWithCommas).split(DecimalSeparator);
        let intPart = arParts[0];
        var decPart = arParts.length > 1 ? arParts[1] : "";
        return intPart;
    };
    const handleOrderStatusSending = (idCart) => {
        dispatch(orderStatusSending(idCart)).then(check => {
            if (check.payload === 'đang xử lý') {
                swal('Chuyển trạng thái thành công')
                window.location.reload()
            }
        })
    }
    const handleOrderStatusRefunds = (idCart) => {
        dispatch(orderStatusRefunds(idCart)).then(check => {
            if (check.payload === 'hủy đơn') {
                swal('Đã hủy đơn hàng thành công')
                window.location.reload()
            }
        })
    }
    useEffect(() => {
        if (statusCart !== '') {
            let data = {id, statusCart}
            dispatch(getCartByStatus(data))
        } else {
            dispatch(getAllCartShop(id))
        }
    }, [statusCart])
    return (
        <>
            <div className="col-10 bg-light" style={{width: '100%', height: '700px'}}>
                <div className="row">
                    <div className="col-12" style={{
                        marginTop: '20px',
                        marginLeft: '25px',
                        marginBottom: '20px',
                        color: "rgb(238, 77, 45)"
                    }}><h4>Quản lý đơn hàng</h4></div>
                    <div className="col-12"
                         style={{backgroundColor: 'rgb(231, 229, 229)', height: '1px', width: '100%'}}></div>
                    <div className="col-12" style={{paddingTop: '31px', height: '100px'}}>
                        <Formik initialValues={{idShop: '', valueInput: ''}} onSubmit={values => {
                            handleSearch(values)
                        }}>
                            <Form>
                                <div className="row">
                                    <div className="col-10" style={{marginLeft: '250px', marginRight: '-200px'}}>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <Field as={'select'} onChange={e => setType(e.target.value)}
                                                       className="custom-select" id="inputGroupSelect01" name={'select'}
                                                       style={{border: '1px black solid', width: '200px'}}>
                                                    <option value="Mã đơn hàng">Mã đơn hàng</option>
                                                    <option value="Số điện thoại">Số điện thoại</option>
                                                    <option value="Tên khách hàng">Tên khách hàng</option>
                                                    <option value="Loại hàng">Loại sản phẩm</option>
                                                </Field>
                                            </div>
                                            <Field type="text" style={{width: '600px'}} name={'valueInput'}
                                                   placeholder={type}/>
                                        </div>
                                    </div>
                                    <div className="col-2" style={{marginLeft: '-300px'}}>
                                        <button type={'submit'} style={{
                                            backgroundColor: 'rgb(238, 77, 45)',
                                            color: 'white',
                                            width: '100px',
                                            height: '38px',
                                            border: 'none'
                                        }}>Tìm kiếm
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                    <div className="col-12"
                         style={{backgroundColor: 'rgb(231, 229, 229)', height: '1px', width: '100%'}}></div>
                    <div className="col-12" style={{width: '100%', height: '80px'}}>
                        <div className="row">
                            <div className="col-2" style={{marginTop: '24px', marginLeft: '20px'}}>
                                {statusCart === "" ?
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('')}
                                                style={{border: 'none', background: 'none', color: 'rgb(238, 77, 45)', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '80%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Tất cả</p></span>
                                                <span style={{width: '20%',marginLeft: '-25px', fontSize: '20px'}}><p style={{color: "rgb(238, 77, 45)"}}><b>{carts && carts.length}</b></p></span>
                                            </span>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('')}
                                                style={{border: 'none', background: 'none', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '80%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Tất cả</p></span>
                                                <span style={{width: '20%',marginLeft: '-25px', fontSize: '20px'}}></span>
                                            </span>
                                        </button>
                                    </>
                                }
                            </div>
                            <div className="col-2" style={{marginTop: '24px', marginLeft: '-100px'}}>
                                {statusCart === "chờ xác nhận" ?
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('chờ xác nhận')}
                                                style={{border: 'none', background: 'none', color: 'rgb(238, 77, 45)', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '80%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Chờ xác nhận</p></span>
                                                <span style={{width: '20%',marginLeft: '10px', fontSize: '20px'}}><p style={{color: "rgb(238, 77, 45)"}}><b>{carts && carts.length}</b></p></span>
                                            </span>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('chờ xác nhận')}
                                                style={{border: 'none', background: 'none', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '80%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Chờ xác nhận</p></span>
                                                <span style={{width: '20%',marginLeft: '-25px', fontSize: '20px'}}></span>
                                            </span>
                                        </button>
                                    </>
                                }
                            </div>
                            <div className="col-2" style={{marginTop: '24px', marginLeft: '-40px'}}>
                                {statusCart === "đang xử lý" ?
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('đang xử lý')}
                                                style={{border: 'none', background: 'none', color: 'rgb(238, 77, 45)', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '90%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Đang giao hàng</p></span>
                                                <span style={{width: '10%',marginLeft: '20px', fontSize: '20px'}}><p style={{color: "rgb(238, 77, 45)"}}><b>{carts && carts.length}</b></p></span>
                                            </span>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('đang xử lý')}
                                                style={{border: 'none', background: 'none', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '90%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Đang giao hàng</p></span>
                                                <span style={{width: '10%',marginLeft: '-25px', fontSize: '20px'}}></span>
                                            </span>
                                        </button>
                                    </>
                                }
                            </div>
                            <div className="col-2" style={{marginTop: '24px', marginLeft: '-20px'}}>
                                {statusCart === "hoàn thành" ?
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('hoàn thành')}
                                                style={{border: 'none', background: 'none', color: 'rgb(238, 77, 45)', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '80%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Đã giao</p></span>
                                                <span style={{width: '20%',marginLeft: '-10px', fontSize: '20px'}}><p style={{color: "rgb(238, 77, 45)"}}><b>{carts && carts.length}</b></p></span>
                                            </span>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('hoàn thành')}
                                                style={{border: 'none', background: 'none', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '80%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Đã giao</p></span>
                                                <span style={{width: '20%',marginLeft: '-10px', fontSize: '20px'}}></span>
                                            </span>
                                        </button>
                                    </>
                                }
                            </div>
                            <div className="col-2" style={{marginTop: '24px', marginLeft: '-70px'}}>
                                {statusCart === "hủy đơn" ?
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('hủy đơn')}
                                                style={{border: 'none', background: 'none', color: 'rgb(238, 77, 45)', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '80%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Đã hủy</p></span>
                                                <span style={{width: '20%',marginLeft: '-10px', fontSize: '20px'}}><p style={{color: "rgb(238, 77, 45)"}}><b>{carts && carts.length}</b></p></span>
                                            </span>
                                        </button>
                                    </>
                                    :
                                    <>
                                        <button type={'submit'} onClick={() => setStatusCart('hủy đơn')}
                                                style={{border: 'none', background: 'none', width: '150px'}}>
                                            <span className="row">
                                                <span style={{width: '80%',marginLeft: '-25px'}}><p style={{fontSize: '20px'}}>Đã hủy</p></span>
                                                <span style={{width: '20%',marginLeft: '-10px', fontSize: '20px'}}></span>
                                            </span>
                                        </button>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-12"
                         style={{backgroundColor: 'rgb(231, 229, 229)', height: '1px', width: '100%'}}></div>
                    <div className="col-12" style={{marginLeft: '-5px'}}>
                        <table className="table table-borderless">
                            <thead>
                            <tr>
                                <th scope="col">Mã Đơn hàng</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Thời gian đặt</th>
                                <th scope="col">Người đặt</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {carts !== undefined && carts.map(item => (
                                <>
                                    <tr>
                                        <th scope="row">{item.idCart}</th>
                                        {item.statusCart === 'chờ xác nhận' ?
                                            <>
                                                <td style={{color: '#FF8C00'}}>{item.statusCart}</td>
                                            </>
                                            : item.statusCart === 'đang xử lý' ?
                                                <>
                                                    <td style={{color: 'black'}}>{item.statusCart}</td>
                                                </>
                                                : item.statusCart === 'hoàn thành' ?
                                                    <>
                                                        <td style={{color: 'blue'}}>{item.statusCart}</td>
                                                    </>
                                                    :
                                                    <>
                                                        <td style={{color: 'red'}}>{item.statusCart}</td>
                                                    </>
                                        }
                                        <td>{item.timePayCart}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.phoneAddress}</td>
                                        <td>{item.descriptionAddress}-{item.district}-{item.province}</td>
                                        <td>{item.statusCart === 'chờ xác nhận' ?
                                            <>
                                                <button type={'submit'}
                                                        onClick={() => handleOrderStatusSending(item.idCart)} style={{
                                                    background: 'none',
                                                    color: 'green',
                                                    width: '100px',
                                                    height: '20px',
                                                    border: 'none',
                                                    textAlign: 'center'
                                                }}>Xác nhận
                                                </button>
                                            </>
                                            :
                                            <></>
                                        }</td>
                                        <td>{item.statusCart === 'chờ xác nhận' ?
                                            <>
                                                <button style={{
                                                    background: 'none',
                                                    color: 'red',
                                                    width: '100px',
                                                    height: '20px',
                                                    border: 'none',
                                                    textAlign: 'center'
                                                }} type="button" data-toggle="modal"
                                                        data-target={"#exampleModal" + item.idCart}
                                                        onClick={() => handleOrderStatusRefunds(item.idCart)}>
                                                    Hủy đơn
                                                </button>
                                            </>
                                            : item.statusCart === 'đang xử lý' ?
                                                <>
                                                    <button style={{
                                                        background: 'none',
                                                        color: 'red',
                                                        width: '100px',
                                                        height: '20px',
                                                        border: 'none',
                                                        textAlign: 'center'
                                                    }} type="button" data-toggle="modal"
                                                            data-target={"#exampleModal" + item.idCart}
                                                            onClick={() => handleOrderStatusRefunds(item.idCart)}>
                                                        Hủy đơn
                                                    </button>
                                                </>
                                                :
                                                <></>
                                        }
                                        </td>
                                        <td>
                                            <button style={{
                                                background: 'none',
                                                color: 'blue',
                                                width: '100px',
                                                height: '20px',
                                                border: 'none',
                                                textAlign: 'center'
                                            }} type="button" data-toggle="modal"
                                                    data-target={"#exampleModal" + item.idCart}
                                                    onClick={() => handleDetailCart(item.idCart)}>
                                                Chi tiết
                                            </button>
                                        </td>
                                    </tr>
                                    <div className="modal fade" id={"exampleModal" + item.idCart} tabindex="-1"
                                         aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div
                                            className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalLabel">
                                                        Chi tiết đơn hàng mã<p
                                                        style={{color: 'rgb(238, 77, 45)'}}>{item.idCart}</p>
                                                    </h5>
                                                    <h5 style={{marginLeft: '150px'}} className="modal-title"
                                                        id="exampleModalLabel">
                                                        Tổng giá trị đơn hàng
                                                        <p style={{color: 'rgb(238, 77, 45)'}}>{total && formatCurrency(total)} Đ</p>
                                                    </h5>
                                                    <h5 style={{marginLeft: '150px'}} className="modal-title"
                                                        id="exampleModalLabel">
                                                        Ngày đặt đơn đặt
                                                        <p style={{color: 'rgb(238, 77, 45)'}}>{item.timePayCart}</p>
                                                    </h5>
                                                    <button type="button" className="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <table className="table table-hover">
                                                        <thead>
                                                        <tr>
                                                            <th scope="col">Mã sản phẩm</th>
                                                            <th scope="col">Tên sản phẩm</th>
                                                            <th scope="col">Giá</th>
                                                            <th scope="col">Số lượng mua</th>
                                                            <th scope="col">Tổng</th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        {detailCart !== undefined && detailCart.map(item => (
                                                            <>
                                                                <tr>
                                                                    <th scope="row">{item.idProduct}</th>
                                                                    <td>{item.nameProduct}</td>
                                                                    <td>{item.priceInCart && formatCurrency(item.priceInCart)} Đ</td>
                                                                    <td>{item.quantityCart}</td>
                                                                    <td style={{color: 'rgb(238, 77, 45)'}}>{Number(item.priceInCart) * Number(item.quantityCart) && formatCurrency(Number(item.priceInCart) * Number(item.quantityCart))} Đ</td>
                                                                </tr>
                                                            </>
                                                        ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn"
                                                            data-dismiss="modal">Close
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}