import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Field, Form, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {getAllCartShop} from "../../service/cartService";

export default function CartManager() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [type, setType] = useState('')
    let {id} = useParams()
    const carts = useSelector((state) => {
    });
    const handleSearch = (values) => {
    }
    useEffect(() => {
        dispatch(getAllCartShop(id))
    })
    return (
        <>
            <div className="col-8 bg-light" style={{width: '100%'}}>
                <div className="row">
                    <div className="col-12">
                        <div className="row">
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '20px'}}>
                                <p>Tất cả</p>
                            </div>
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '-100px'}}>
                                <p>Chờ xác nhận</p>
                            </div>
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '-40px'}}>
                                <p>Đang giao hàng</p>
                            </div>
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '-20px'}}>
                                <p>Đã giao</p>
                            </div>
                            <div className="col-2" style={{marginTop: '20px', marginLeft: '-70px'}}>
                                <p>Đã hủy</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-12" style={{backgroundColor: 'rgb(231, 229, 229)',height: '1px', width: '100%'}}></div>
                    <div className="col-12" style={{marginTop: '20px'}}>
                      <Formik initialValues={{valueInput: ''}}  onSubmit={values => {
                          handleSearch(values)
                      }}>
                          <Form>
                              <div className="row">
                                  <div className="col-10" style={{marginLeft: '150px',marginRight: '-200px'}}>
                                      <div className="input-group mb-3">
                                          <div className="input-group-prepend">
                                              <Field as={'select'} onChange={e => setType(e.target.value)} className="custom-select" id="inputGroupSelect01" name={'select'} style={{border: '1px black solid', width: '200px'}}>
                                                  <option value="Mã đơn hàng">Mã đơn hàng</option>
                                                  <option value="Số điện thoại">Số điện thoại</option>
                                                  <option value="Tên khách hàng">Tên khách hàng</option>
                                              </Field>
                                          </div>
                                          <Field type="text" style={{width: '600px'}} name={'valueInput'} placeholder={type}/>
                                      </div>
                                  </div>
                                  <div className="col-2">
                                      <button type={'submit'} style={{backgroundColor: 'rgb(238, 77, 45)', color: 'white', width: '100px', height: '38px',border:'none'}}>Tìm kiếm</button>
                                  </div>
                              </div>
                          </Form>
                      </Formik>
                    </div>
                    <div className="col-12" style={{backgroundColor: 'rgb(231, 229, 229)',height: '1px', width: '100%'}}></div>
                </div>
            </div>
        </>
    )
}