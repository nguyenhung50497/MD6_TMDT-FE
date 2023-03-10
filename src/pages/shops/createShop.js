import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {storage} from "../../upload/firebaseConfig";
import {useDispatch, useSelector} from "react-redux";
import {getAllTransport} from "../../service/transportService";
import {date} from "yup";
import {createShop} from "../../service/shopService";
import swal from "sweetalert";

export default function CreateShop() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [file1, setFile] = useState("");
    const [url1, setUrl] = useState("");
    const [percent, setPercent] = useState(0);
    const [check, setCheck] = useState(1)
    const [shop, setShop] = useState()
    const [transportShop, setTransportShop] = useState(2)
    const handleUpload = (event) => {
        setFile(event.target.files[0]);
        const storageRef = ref(storage, `/files/${file1.name}`);
        const uploadTask1 = uploadBytesResumable(storageRef, file1);
        uploadTask1.on("state_changed", (snapshot) => {
            const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setPercent(percent);
        }, (err) => console.log(err), () => {
            getDownloadURL(uploadTask1.snapshot.ref).then((url) => {
                setUrl(url)
            });
        });
    };
    const profile = useSelector(state => {
        if (state !== undefined) {
            return state.users.user.user
        }
    })
    const transport = useSelector(state => {
        if (state !== undefined) {
            return state.transports.transports
        }
    })
    const informationShop = (values) => {
        let data = {...values}
        data.imageShop = url1
        if (profile !== undefined) {
            data.phoneShop = profile.phoneUser
            data.emailShop = profile.emailUser
        }
        setShop(data)
        setCheck(3)
    }
    const addTransport = (values) => {
        setTransportShop(values)
    }

    const handleShop = () => {
        let data = {...shop}
        if (profile!== undefined) {
            data.idUser = profile.idUser
        }
        data.idTransport = transportShop
        dispatch(createShop(data)).then(check => {
            if (check.payload === 'success') {
                swal('T???o c???a h??ng th??nh c??ng')
            }
        })

    }
    useEffect(() => {
        dispatch(getAllTransport())
    },[])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="row">
                        {check === 1 ?
                            <>
                                <div className="col-12" style={{marginTop: '20px', marginLeft: '20px'}}>
                                    <h5>T???o c???a h??ng c???a b???n</h5>
                                </div>
                                <div className="col-12" style={{marginLeft: '20px'}}>
                                    <small>????ng k?? tr??? th??nh Ng?????i b??n Shopee</small>
                                </div>
                                <div className="col-12">
                                    <hr/>
                                </div>
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col"></div>
                                        <div className="col-10">
                                            <div className="row">
                                                <div className="col-12" style={{paddingLeft: '302px'}}>
                                                    <img
                                                        src="https://deo.shopeesz.com/shopee/pap-admin-live-sg/upload/upload_9dab85081088531ee6d1aa958a90f55e.png"
                                                        alt="" width={'200px'} height={'200px'}
                                                        style={{borderRadius: '100%'}}/>
                                                </div>
                                                <div className="col-12" style={{paddingLeft: '302px'}}><h5>Ch??o m???ng ?????n
                                                    HNH!</h5></div>
                                                <div className="col-12" style={{paddingLeft: '230px'}}><p>????? ????ng k?? b??n
                                                    h??ng tr??n HNH, b???n c???n cung c???p</p></div>
                                                <div className="col-12" style={{paddingLeft: '315px'}}><p>m???t s??? th??ng
                                                    tin c?? b???n.</p></div>
                                                <div className="col-12" style={{paddingLeft: '365px'}}>
                                                    <button type={"submit"} onClick={() => setCheck(2)} style={{
                                                        width: '70px',
                                                        height: '40px',
                                                        backgroundColor: "rgb(238,77,45)",
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '5px'
                                                    }}>????ng k??
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col"></div>
                                    </div>
                                </div>
                            </>
                            : check === 2 ?
                                <>
                                    <div className="col-12" style={{marginTop: '20px', marginLeft: '20px'}}>
                                        <h5>T???o c???a h??ng c???a b???n</h5>
                                    </div>
                                    <div className="col-12" style={{marginLeft: '20px'}}>
                                        <small>C??i ?????t th??ng tin c???a h??ng</small>
                                    </div>
                                    <div className="col-12">
                                        <hr/>
                                    </div>
                                   <Formik initialValues={{nameShop: '', emailShop: profile!== undefined && profile.emailUser, phoneShop: profile!== undefined && profile.phoneUser , addressShop: '', imageShop: '',idTransport: '',idUser: ''}} enableReinitialize={true} onSubmit={(values) => {
                                   informationShop(values)
                                   }}>
                                       <Form>
                                           <div className="col-12">
                                               <div className="row">
                                                   <div className="col-2" style={{height: '420px', textAlign: 'right'}}>
                                                       <div className="row">
                                                           <div className="col-12" style={{marginTop: '35px'}}><p>T??n shop</p>
                                                           </div>
                                                           <div className="col-12" style={{marginTop: '35px'}}><p>?????a ch??? l???y
                                                               h??ng :</p></div>
                                                           <div className="col-12" style={{marginTop: '30px'}}><p>Email</p>
                                                           </div>
                                                           <div className="col-12" style={{marginTop: '30px'}}><p>S??? ??i???n
                                                               tho???i</p>
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="col-7" style={{height: '420px', textAlign: 'left'}}>
                                                       <div className="row">
                                                           <div className="col-12" style={{marginTop: '30px'}}><Field
                                                               type="text"
                                                               name={'nameShop'}
                                                               style={{
                                                                   width: '100%',
                                                                   height: '40px',
                                                                   borderRadius: '10px'
                                                               }}/></div>
                                                           <div className="col-12" style={{marginTop: '30px'}}><Field
                                                               type="text"
                                                               name={'addressShop'}
                                                               style={{
                                                                   width: '100%',
                                                                   height: '40px',
                                                                   borderRadius: '10px'
                                                               }}/></div>
                                                           <div className="col-12" style={{marginTop: '35px'}}><Field
                                                               type="gmail"
                                                               name={'emailShop'}
                                                               style={{
                                                                   width: '100%',
                                                                   height: '40px',
                                                                   borderRadius: '10px'
                                                               }} readOnly={true} /></div>
                                                           <div className="col-12" style={{marginTop: '30px'}}><Field
                                                               type="text"
                                                               name={'phoneShop'}
                                                               style={{
                                                                   width: '100%',
                                                                   height: '40px',
                                                                   borderRadius: '10px'
                                                               }} readOnly={true}/>
                                                               <small>N???u mu???n ?????i s??? ??i???n tho???i v?? email, b???n vui l??ng ch???nh
                                                                   s???a t???i <Link to={'/account'}
                                                                                 style={{textDecoration: 'none'}}>"H??? s?? c???a
                                                                       t??i"</Link> ??? trang ch??? HNH sau khi ho??n t???t qu?? tr??nh
                                                                   ????ng k??</small>
                                                           </div>
                                                           <div className="col-12" style={{marginTop: '30px'}}>
                                                               <button type={"submit"} style={{
                                                                   width: '70px',
                                                                   height: '40px',
                                                                   backgroundColor: "rgb(238,77,45)",
                                                                   color: 'white',
                                                                   border: 'none',
                                                                   borderRadius: '5px'
                                                               }}>L??u
                                                               </button>
                                                           </div>
                                                       </div>
                                                   </div>
                                                   <div className="col-3">
                                                       <div className="col-12" style={{marginLeft: '20px', marginTop: '50px'}}>
                                                           <img src={url1} alt=""
                                                                width={'100px'} height={'100px'}
                                                                style={{borderRadius: '100%'}}/>
                                                       </div>
                                                       <div className="col-12">
                                        <span className="btn btn btn-file" style={{
                                            backgroundColor: 'white',
                                            border: '1px darkgray solid',
                                            marginLeft: '20px',
                                            marginTop: '10px'
                                        }}>
                                           Ch???n ???nh<input type="file" onMouseOut={handleUpload}/>
                                        </span>
                                                       </div>
                                                       <div className="col-12"
                                                            style={{marginLeft: '-10px', marginTop: '10px'}}>
                                                           <small>D???ng l?????ng file t???i ??a 1 MB
                                                               ?????nh d???ng:.JPEG, .PNG</small>
                                                       </div>
                                                   </div>
                                               </div>
                                           </div>
                                       </Form>
                                   </Formik>
                                </>
                                : check === 3 ?
                                <>
                                    <div className="col-12" style={{marginTop: '20px', marginLeft: '20px'}}>
                                        <h5>????n v??? v???n chuy???n</h5>
                                    </div>
                                    <div className="col-12" style={{marginLeft: '20px'}}>
                                        <small>Ch???n ????n v??? v???n chuy???n ph?? h???p cho shop c???a b???n</small>
                                    </div>
                                    <div className="col-12">
                                        <hr/>
                                    </div>
                                    <div className="col-12" style={{marginTop: '10px'}}>
                                        <div className="row">
                                            <div className="col-6" style={{paddingLeft: '200px', color:"rgb(238,77,45)"}}><h2>????n v??? v???n chuy???n</h2></div>

                                        </div>
                                    </div>
                                    {transport!== undefined &&transport.map(item => (
                                        <>
                                            <div className="col-12" style={{marginTop: '10px'}}>
                                                <div className="row">
                                                    <div className="col-6" style={{paddingLeft: '200px'}}><h4>{item.nameTransport}</h4></div>
                                                    <div className="col-6" style={{textAlign: 'center'}}><div className="check-box">
                                                        <input type="checkbox" onClick={() => addTransport(item.idTransport)}/>
                                                    </div></div>
                                                </div>
                                            </div>
                                        </>
                                    ))}
                                    <div className="col-12" style={{marginTop: '30px', paddingLeft: '450px'}}>
                                        <button type={"submit"} onClick={handleShop} style={{
                                            width: '100px',
                                            height: '60px',
                                            backgroundColor: "rgb(238,77,45)",
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '5px',
                                        }}>Ho??n th??nh
                                        </button>
                                    </div>
                                </>
                                    :
                                    <>
                                    </>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}