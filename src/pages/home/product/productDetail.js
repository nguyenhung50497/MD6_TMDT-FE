import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {searchProductById} from "../../../service/productsService";


export default function ProductDetail() {
    let {id} = useParams()
    console.log(id)
    let product = useSelector(state => {
        return state.products.currentProduct
    })
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(searchProductById(id));
    }, []);

    return (
        <>
            <p>{product.nameProduct}</p>
        </>
    )
}