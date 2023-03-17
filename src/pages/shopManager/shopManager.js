import NavbarShop from "../../components/NavbarShop";
import {Link, Outlet, useParams} from "react-router-dom";
import Footer from "../../components/Footer";

export default function ShopManager() {
    let {id} = useParams()
    return (
        <>
            <NavbarShop/>
            <>
                <div className="row mt-2">
                    <div className="col-2 ">
                        <div className="col-10 bg-light" style={{height: '100%'}}>
                            <div className="row">
                                <div className="col-12" style={{marginTop: '20px'}}>
                                    <Link to={'cart/' + id} style={{textDecoration: "none"}}>
                                       <div className={'shopManager'}>
                                           <div className="row">
                                               <div className="col-1" style={{textAlign: 'right'}}>
                                                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                        fill="currentColor"
                                                        className="bi bi-clipboard" viewBox="0 0 16 16">
                                                       <path
                                                           d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                                                       <path
                                                           d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                                                   </svg>
                                               </div>
                                               <div className="col-10" style={{
                                                   fontWeight: '600',
                                                   marginTop: '2px',
                                                   marginLeft: '-10px'
                                               }}><p>Quản Lý Đơn Hàng</p></div>
                                           </div>
                                       </div>
                                    </Link>
                                </div>
                                <div className="col-12" style={{marginTop: '15px'}}>
                                    <Link to={'product/' + id} style={{textDecoration: "none"}}>
                                        <div className="row">
                                            <div className="col-1" style={{textAlign: 'right', color: "black"}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                     fill="currentColor"
                                                     className="bi bi-handbag" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2zm3 4V3a3 3 0 1 0-6 0v2H3.36a1.5 1.5 0 0 0-1.483 1.277L.85 13.13A2.5 2.5 0 0 0 3.322 16h9.355a2.5 2.5 0 0 0 2.473-2.87l-1.028-6.853A1.5 1.5 0 0 0 12.64 5H11zm-1 1v1.5a.5.5 0 0 0 1 0V6h1.639a.5.5 0 0 1 .494.426l1.028 6.851A1.5 1.5 0 0 1 12.678 15H3.322a1.5 1.5 0 0 1-1.483-1.723l1.028-6.851A.5.5 0 0 1 3.36 6H5v1.5a.5.5 0 1 0 1 0V6h4z"/>
                                                </svg>
                                            </div>
                                            <div className="col-10" style={{
                                                fontWeight: '600',
                                                color: 'gray',
                                                marginTop: '2px',
                                                marginLeft: '-10px'
                                            }}><p>Quản Lý Sản Phẩm</p></div>
                                        </div>
                                    </Link>
                                </div>
                                <div className="col-12" style={{marginTop: '15px'}}>
                                    <div className="row">
                                        <div className="col-1" style={{textAlign: 'right'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor"
                                                 className="bi bi-graph-up" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                      d="M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z"/>
                                            </svg>
                                        </div>
                                        <div className="col-10" style={{
                                            fontWeight: '600',
                                            color: 'gray',
                                            marginTop: '2px',
                                            marginLeft: '-10px'
                                        }}><p>Dữ Liệu</p></div>
                                    </div>
                                </div>
                                <div className="col-12" style={{marginTop: '15px'}}>
                                    <div className="row">
                                        <div className="col-1" style={{textAlign: 'right'}}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                 fill="currentColor"
                                                 className="bi bi-shop-window" viewBox="0 0 16 16">
                                                <path
                                                    d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                                            </svg>
                                        </div>
                                        <div className="col-10" style={{
                                            fontWeight: '600',
                                            color: 'gray',
                                            marginTop: '2px',
                                            marginLeft: '-10px'
                                        }}><p>Quản Lý Shop</p></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Outlet></Outlet>
                    <div className="col-2"></div>
                </div>
            </>
            <Footer/>
        </>
    )
}