import {Route, Routes} from "react-router-dom";
import DefaultLayout from "./components/containers/default/DefaultLayout.tsx";
import CategoryListPage from "./components/category/list/CategoryListPage.tsx";
import CategoryCreatePage from "./components/category/create/CategoryCreatePage.tsx";
import CategoryEditPage from "./components/category/edit/CategoryEditPage.tsx";

const App = () => (
    <>
        <Routes>
            <Route path="/" element={<DefaultLayout/>}>
                <Route index element={<CategoryListPage/>}/>
                <Route path={"category"}>
                    <Route path={"create"} element={<CategoryCreatePage/>} />
                    <Route path={"edit/:id"} element={<CategoryEditPage/>} />
                </Route>
            </Route>
        </Routes>
    </>
);

export default App;