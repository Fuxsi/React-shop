import ProductCard from "./ProductCard";
import styles from "../../styles/ProductList.module.css"
import { useState } from "react";
import { useEffect } from "react";
import useSWR from "swr";
import {fetcher} from "../../../utils/fetch"
import ProductDetails from "./ProductDetails";



const ProductList = () => {
    const [selectedProduct, setSelectedProduct] = useState(null)
    console.log(selectedProduct?.title)
    const {data: products, error, isLoading} = useSWR(`https://fakestoreapi.com/products`, fetcher);
    console.log(products, error, isLoading)

    // const [products, setProducts] = useState([])

    // useEffect(()=>{
    //     fetch("https://fakestoreapi.com/products")
    //     .then((res)=>res.json())
    //     .then((productsRes) => setProducts(productsRes))
    //     .catch((error) => console.log(error))

    // },[])

    if (isLoading) {
        return <p>Trwa ładowanie</p>
    }

    if (error) {
        return <p>Wystąpił błąd</p>
    }

    return(
        <div className="flex flew-row space-between">
        <div className={styles.container}>
            {products.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            onClick={() => setSelectedProduct(product)}
            />
        ))}
        </div>
        <ProductDetails selectedProduct={selectedProduct}/>
        </div>
        
       
    );
};    

export default ProductList;