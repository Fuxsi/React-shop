import ProductCard from "./ProductCard";
import styles from "../../styles/ProductList.module.css"
import { useState, useMemo } from "react";
import useProducts from "../../../hooks/useProducts";
import useCategories from "../../../hooks/useCategories";
import useDebounce from "../../../hooks/useDebounce";
import { Product } from "@/types/Product";

type SortUnion = "none" | "price_asc" |"price_desc";


const ProductList = () => {
    const [sortState, setSortState] = useState<SortUnion>("none");
    const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
    const [priceMax, setPriceMax] = useState<number | undefined>(undefined);
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm);
    const {sortedAndFilteredData ,data, error, isLoading} = useProducts(
        priceMin,
        priceMax,
        selectedCategory,
        debouncedSearchTerm,
        sortState
    );
    const categoryOptions = useCategories(data);
    console.log("...")
    
    const filteredAndSortedProducts = useMemo(() => {
        if (!data) return [];

        const filteredProducts = data.filter((product : Product) => {
            return (
                ((priceMin && product.price >= priceMin) || !priceMin) &&
                ((priceMax && product.price <= priceMax) || !priceMax) &&
                (selectedCategory === "all" || product.category === selectedCategory) &&
                (!searchTerm ||
                    product?.title?.toLowerCase().includes(searchTerm.toLowerCase())) || product?.description.toLowerCase().includes(searchTerm.toLowerCase())
                    
            );
        });

        const listCopy = [...filteredProducts];
        
        switch (sortState) {
            case "price_asc":
                return listCopy.sort((a, b) => a.price - b.price);
            case "price_desc":
                return listCopy.sort((a, b) => b.prive - a.price);
            default:
                return listCopy;        
        }
    }, [data, sortState, priceMin, priceMax, selectedCategory]);

   

    console.log(categoryOptions);

    if (isLoading) {
        return <p>Trwa ładowanie</p>
    }

    if (error) {
        return <p>Wystąpił błąd</p>
    }

    console.log(filteredAndSortedProducts, data)

    return(

       <div className="flex flex-wrap flex-row space-beetween">
        <div className="flex dlex-row items-center justify-between mt-10">
            <div>
                <label className="mr-2">Cena od:</label>
                <input
                type="number"
                value={priceMin}
                onChange={(e) => setPriceMin(+e.target.value)} // jeden znak wstawić
                className="mb-4 p-2 border-rounded"
                ></input>
            </div>
            <div>
                <label className="mr-2">Cena do:</label>
                <input
                type="number"
                value={priceMax}
                onChange={(e) => setPriceMax(+e.target.value)}
                className="mb-4 p-2 border-rounded"
                ></input>
            </div>
            <select 
                value={selectedCategory}
                onChange={(e) => {
                    setSelectedCategory(e.target.value);
                }}>
                {categoryOptions.map((category :string) => (
                    <option key={category} value={category}>
                        {category === "all" ? "Wszystkie kategorie" : category}
                    </option>
                ))}
            </select>
            <select
                value={sortState}
                onChange={(e) => {
                    setSortState(e.target.value  as SortUnion);
                }}
                className= "mb-4 p-2 border rounded"
            >
                <option value="none">Brak sortowania</option>
                <option value="price_asc">Rosnąco</option>
                <option value="price_desc">Malejąco</option>
            </select>
        </div>
        <div className="flex flew-row space-between">
        <div className={styles.container}>
            {filteredAndSortedProducts?.map((product) => (
            <ProductCard
            key={product.id}
            product={product}
            />
        ))};
        </div>
        </div>

       </div>



    );
};    

export default ProductList;
