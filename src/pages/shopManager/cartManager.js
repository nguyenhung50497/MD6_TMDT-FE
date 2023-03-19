import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getAllCartShop, getCartByStatus, searchByIdCart, searchByName, searchByPhone} from "../../service/cartService";

export default function CartManager() {
    const [type, setType] = useState('')
    const [statusCart, setStatusCart] = useState('')
    let {id} = useParams()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carts = useSelector((state) => {
        if (state !== undefined) {
            return state.carts.carts
        }
    });
    useEffect(() => {
        if (statusCart !== '') {
            let data = {id, statusCart}
            dispatch(getCartByStatus(data))
        } else {
            dispatch(getAllCartShop(id))
        }
    }, [statusCart])
    const handleSearch = (values) => {
        let data = {...values}
        data.idShop = id
        if (type === 'Tên khách hàng') {
            dispatch(searchByName(data))
        } else if (type === 'Số điện thoại') {
            dispatch(searchByPhone(data))
        } else if (type === "Mã đơn hàng") {
            dispatch(searchByIdCart(data))
        }
    }

    return (
        <>
            <div className="col-10 bg-light" style={{width: '100%'}}>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '20px'}}>
                                <button type={'submit'} onClick={() => setStatusCart('')} style={{border: 'none', background: 'none'}}>Tất cả</button>
                            </div>
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '-100px'}}>
                                <button type={'submit'} onClick={() => setStatusCart('chờ xác nhận')} style={{border: 'none', background: 'none'}}>Chờ xác nhận</button>
                            </div>
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '-40px'}}>
                                <button type={'submit'} onClick={() => setStatusCart('đang xử lý')} style={{border: 'none', background: 'none'}}>Đang giao hàng</button>
                            </div>
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '-20px'}}>
                                <button type={'submit'} onClick={() => setStatusCart('hoàn thành')} style={{border: 'none', background: 'none'}}>Đã giao</button>
                            </div>
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '-70px'}}>
                                <button type={'submit'} onClick={() => setStatusCart('hủy đơn')} style={{border: 'none', background: 'none'}}>Đã hủy</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-12"
                         style={{backgroundColor: 'rgb(231, 229, 229)', height: '1px', width: '100%'}}></div>
                    <div className="col-12" style={{marginTop: '20px'}}>
                        <Formik initialValues={{idShop: '',valueInput: ''}} onSubmit={values => {
                            handleSearch(values)
                        }}>
                            <Form>
                                <div className="row">
                                    <div className="col-10" style={{marginLeft: '150px', marginRight: '-200px'}}>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <Field as={'select'} onChange={e => setType(e.target.value)}
                                                       className="custom-select" id="inputGroupSelect01" name={'select'}
                                                       style={{border: '1px black solid', width: '200px'}}>
                                                    <option value="Mã đơn hàng">Mã đơn hàng</option>
                                                    <option value="Số điện thoại">Số điện thoại</option>
                                                    <option value="Tên khách hàng">Tên khách hàng</option>
                                                </Field>
                                            </div>
                                            <Field type="text" style={{width: '600px'}} name={'valueInput'}
                                                   placeholder={type}/>
                                        </div>
                                    </div>
                                    <div className="col-2">
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
                    <div className="col-12">
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
                                            <><td style={{color: '#FF8C00'}}>{item.statusCart}</td></>
                                            : item.statusCart === 'đang xử lý' ?
                                                <><td style={{color: 'black'}}>{item.statusCart}</td></>
                                                : item.statusCart === 'hoàn thành' ?
                                                    <><td style={{color: 'blue'}}>{item.statusCart}</td></>
                                                    :
                                                    <><td style={{color: 'red'}}>{item.statusCart}</td></>
                                        }
                                        <td>{item.timePayCart}</td>
                                        <td>{item.fullName}</td>
                                        <td>{item.phoneAddress}</td>
                                        <td>{item.descriptionAddress}-{item.district}-{item.province}</td>
                                        <td>{item.statusCart === 'chờ xác nhận' ?
                                            <>
                                                <button type={'submit'} style={{
                                                    background: 'none',
                                                    color: 'blue',
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
                                    </tr>
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