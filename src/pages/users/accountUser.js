import Navbar from "../../components/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {Link, Outlet, useNavigate} from "react-router-dom";
import {showProfile} from "../../service/userService";
import {useEffect} from "react";

export default function AccountUser() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const idUser = useSelector(state => {
        if (state !== undefined) {
            return state.users.users.idUser
        }
    })
    const profile = useSelector(state => {
        if (state !== undefined) {
            return state.users.user.user
        }
    })
    useEffect(() => {
        dispatch(showProfile(idUser))
    }, [])
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <Navbar/>
                </div>
                <div className="col-12" style={{backgroundColor: "rgb(237,237,237)", height: '600px'}}>
                    <div className="row">
                        <div className="col-2"  style={{height: '600px'}}></div>
                        <div className="col-8"  style={{height: '600px'}}>
                            <div className="row">
                                <div className="col-2" style={{height: '550px', marginTop: '20px'}}>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <img src={profile!== undefined && profile.avatar} alt="" width={'48px'} height={'48px'} style={{borderRadius: '100%', marginTop: '20px'}}/>
                                                </div>
                                                <div className="col-6">
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <p style={{marginTop: '30px', marginLeft: '-50px'}}><b>{profile!== undefined && profile.fullName}</b></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12" style={{marginTop: '30px'}}>
                                            <div className="row">
                                                <div className="col-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                         fill="currentColor" className="bi bi-person" style={{color: 'blue'}}
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"/>
                                                    </svg></div>
                                                <div className="col-10" style={{marginTop: '5px'}}>Tài khoản của tôi</div>
                                            </div>
                                        </div>

                                           <div className="col-12" style={{marginTop: '10px'}}>
                                               <div className="row">
                                                   <div className="col-2"></div>
                                                   <div className="col-10" style={{marginTop: '5px'}}><Link to={'/account'}  style={{color: 'black', textDecoration: 'none'}}>Hồ sơ</Link></div>
                                               </div>
                                           </div>

                                           <div className="col-12" style={{marginTop: '10px'}}>
                                               <div className="row">
                                                   <div className="col-2"></div>
                                                   <div className="col-10" style={{marginTop: '5px'}}><Link to={'address/'+idUser}  style={{color: 'black', textDecoration: 'none'}}>Địa chỉ</Link></div>
                                               </div>
                                           </div>

                                           <div className="col-12" style={{marginTop: '10px'}}>
                                               <div className="row">
                                                   <div className="col-2"></div>
                                                   <div className="col-10" style={{marginTop: '5px'}}><Link to={'password/'+idUser}  style={{color: 'black', textDecoration: 'none'}}>Đổi mật khẩu</Link></div>
                                               </div>
                                           </div>
                                        <div className="col-12" style={{marginTop: '20px'}}>
                                            {profile !== undefined && profile.role === 'user' ?
                                            <>
                                                <Link to={'/shopInterface'} style={{color: 'black', textDecoration: 'none'}}>
                                                    <div className="row">
                                                        <div className="col-2">
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                                 fill="currentColor" className="bi bi-shop-window" color={'blue'}
                                                                 viewBox="0 0 16 16">
                                                                <path
                                                                    d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                                                            </svg></div>
                                                        <div className="col-10" style={{marginTop: '5px'}}>Cửa hàng của bạn</div>
                                                    </div>
                                                </Link>
                                            </>
                                                :
                                                <>
                                                    <Link to={'shop/'+ idUser} style={{color: 'black', textDecoration: 'none'}}>
                                                        <div className="row">
                                                            <div className="col-2">
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                                     fill="currentColor" className="bi bi-shop-window" color={'blue'}
                                                                     viewBox="0 0 16 16">
                                                                    <path
                                                                        d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                                                                </svg></div>
                                                            <div className="col-10" style={{marginTop: '5px'}}>Trở thành nhà bán hàng</div>
                                                        </div>
                                                    </Link>
                                                </>
                                            }
                                        </div>
                                        <div className="col-12" style={{marginTop: '20px'}}>
                                            <div className="row">
                                                <div className="col-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                         fill="currentColor" className="bi bi-coin" viewBox="0 0 16 16" style={{color: 'yellow'}}
                                                    >
                                                        <path
                                                            d="M5.5 9.511c.076.954.83 1.697 2.182 1.785V12h.6v-.709c1.4-.098 2.218-.846 2.218-1.932 0-.987-.626-1.496-1.745-1.76l-.473-.112V5.57c.6.068.982.396 1.074.85h1.052c-.076-.919-.864-1.638-2.126-1.716V4h-.6v.719c-1.195.117-2.01.836-2.01 1.853 0 .9.606 1.472 1.613 1.707l.397.098v2.034c-.615-.093-1.022-.43-1.114-.9H5.5zm2.177-2.166c-.59-.137-.91-.416-.91-.836 0-.47.345-.822.915-.925v1.76h-.005zm.692 1.193c.717.166 1.048.435 1.048.91 0 .542-.412.914-1.135.982V8.518l.087.02z"/>
                                                        <path
                                                            d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                                        <path
                                                            d="M8 13.5a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11zm0 .5A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"/>
                                                    </svg></div>
                                                <div className="col-10" style={{marginTop: '4px'}}>Xu HNH</div>
                                            </div>
                                        </div>
                                        <div className="col-12" style={{marginTop: '20px'}}>
                                            <div className="row">
                                                <div className="col-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                         fill="currentColor" className="bi bi-journal" color={'blue'}
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                                                        <path
                                                            d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                                                    </svg></div>
                                                <div className="col-10" style={{marginTop: '4px'}}>Đơn mua</div>
                                            </div>
                                        </div>
                                        <div className="col-12" style={{marginTop: '20px'}}>
                                            <div className="row">
                                                <div className="col-2">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                         fill="currentColor" className="bi bi-ticket-perforated" style={{color: 'rgb(238,77,45)'}}
                                                         viewBox="0 0 16 16">
                                                        <path
                                                            d="M4 4.85v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Zm-7 1.8v.9h1v-.9H4Zm7 0v.9h1v-.9h-1Z"/>
                                                        <path
                                                            d="M1.5 3A1.5 1.5 0 0 0 0 4.5V6a.5.5 0 0 0 .5.5 1.5 1.5 0 1 1 0 3 .5.5 0 0 0-.5.5v1.5A1.5 1.5 0 0 0 1.5 13h13a1.5 1.5 0 0 0 1.5-1.5V10a.5.5 0 0 0-.5-.5 1.5 1.5 0 0 1 0-3A.5.5 0 0 0 16 6V4.5A1.5 1.5 0 0 0 14.5 3h-13ZM1 4.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 .5.5v1.05a2.5 2.5 0 0 0 0 4.9v1.05a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-1.05a2.5 2.5 0 0 0 0-4.9V4.5Z"/>
                                                    </svg></div>
                                                <div className="col-10" style={{marginTop: '4px'}}>Kho Voucher</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-9" style={{backgroundColor: "white", height: '550px', marginTop: '20px', borderRadius: '10px'}}>
                                    <Outlet></Outlet>
                                </div>
                            </div>
                        </div>
                        <div className="col-2"  style={{height: '600px'}}></div>
                    </div>
                </div>
            </div>
        </>
    )
}