import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import CategoryListPage from "./components/category/list/CategoryListPage.tsx";
import CategoryCreatePage from "./components/category/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./components/category/edit/CategoryEditPage.tsx";
import TestPage from "./components/test";
import ProductListPage from "./components/product/list/ProductListPage.tsx";
import ProductCreatePage from "./components/product/create/ProductCreatePage.tsx";
import ProductEditPage from "./components/product/edit/ProdutEditPage.tsx";
import Login from "./views/Login";
import Register from "./views/Register";
import AdminLayout from "./components/containers/admin/AdminLayout.tsx";

const App : React.FC = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout/>}>
                    <Route index element={<CategoryListPage/>}/>
                    <Route path={"category"}>
                        <Route path={"create"} element={<CategoryCreatePage/>}/>
                        <Route path={"edit/:id"} element={<CategoryEditPage/>}/>
                    </Route>


                    <Route path={"login"} element={<Login/>}/>
                    <Route path={"register"} element={<Register/>}/>

                    <Route path={"test"} element={<TestPage/>}/>
                </Route>

                <Route path={"/admin"} element={<AdminLayout/>}>
                    <Route path={"category"}>
                        <Route index element={<CategoryListPage/>}/>
                        <Route path={"create"} element={<CategoryCreatePage/>}/>
                        <Route path={"edit/:id"} element={<CategoryEditPage/>}/>
                    </Route>

                    <Route path={"product"}>
                        <Route index element={<ProductListPage/>}/>
                        <Route path={"create"} element={<ProductCreatePage/>}/>
                        <Route path={"edit/:id"} element={<ProductEditPage/>}/>
                    </Route>
                </Route>
            </Routes>
        </>
    );
}

export default App;