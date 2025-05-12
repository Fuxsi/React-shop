import { useParams } from 'react-router-dom';
import ProductDetails from '../assets/components/product/ProductDetails';

function ProductsDetailsPage() {
    const {id} = useParams();
    console.log(id)
    return (
        <>
            <ProductDetails id={id}/>
        </>
    );
}

export default ProductsDetailsPage;



