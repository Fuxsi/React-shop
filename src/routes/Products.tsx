import ProductList from "../assets/components/product/ProductList";
import { useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";


const ProductsPage = () => {
    const location = useLocation();
    const fromLogin = location?.state?.fromLogin;
    return(
        <>
        {fromLogin && <span>Logowanie się powiodło</span>}
        <ProductList/>
        </>
    );
}

 function Products() {
    const {user} =useAuth();
    if (!user) return <Navigate to="/login" replace/>;
    return<ProductList/>
}
export default ProductsPage;