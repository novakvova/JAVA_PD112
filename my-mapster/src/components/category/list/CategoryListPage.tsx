import {Button} from "antd";
import {Link} from "react-router-dom";

const CategoryListPage = () => {
    return (
        <>
            <h1>Список категорій</h1>
            <Link to={"/category/create"}>
                <Button type="primary" style={{margin: '5px'}}>
                    ADD +
                </Button>
            </Link>
        </>
    );
}

export default CategoryListPage;