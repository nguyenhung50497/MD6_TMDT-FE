import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {getProducts, search} from "../../../service/productsService";


export default function ListProduct(){
    const dispatch= useDispatch();
    const products = useSelector(state => {
        return state.products.products;
    })

    const navigate = useNavigate()
    useEffect(()=>{
        dispatch(getProducts())
    },[])

    const loading = useSelector(state => {
        return state.products.loading
    })

    return(
        <>

            {loading === true ?
                <>
                    <div className="row">
                        <div className="offset-5 col-2" style={{textAlign: 'center', marginTop: '300px'}}>
                            <div className="loader"></div>
                        </div>
                    </div>
                </>
                :<>
                    <div className="row">
                        <div className="col-12">
                            <table className="table table-striped">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Product</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">Category</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    products !== undefined && products.map((item,index)=>(

                                            <tr>
                                                <th scope="col">{index + 1}</th>
                                                <td>{item.nameProduct}</td>
                                                <td><img src={item.image} style={{width:'100px', height:'100px'}}></img></td>
                                                <td>{item.price}</td>
                                                <td>{item.addressShop}</td>
                                                <td>{item.nameCategory}</td>
                                            </tr>
                                        )
                                    )
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            }
        </>
    )
}