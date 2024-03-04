import {useNavigate, useParams} from "react-router-dom";
import {message} from "antd";


const ProductEditPage : React.FC = () => {
    const navigate = useNavigate();

    const [messageApi, contextHolder] = message.useMessage();

    const {id} = useParams();

    

    useEffect(() => {
        dispatch(getProductById(Number(id)));
    },[dispatch, productId]);

    return (
        <>
            <h1>Редагування продукта</h1>
        </>
    )
}

export default ProductEditPage;