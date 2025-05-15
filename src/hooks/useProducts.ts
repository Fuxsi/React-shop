import useSWR from "swr";
import { fetcher } from "../utils/fetch";
import { ApiResponse } from "@/types/Api";
import { Product, SortUnion} from "@/types/Product";
import { useMemo } from "react";

const useProducts = (
    priceMax : number | undefined = undefined,
    priceMin : number | undefined = undefined,
    selectedCategory : string = "all",
    searchTerm : string = "",
    sortState : SortUnion = "none"
) => {
    const {data, error, isLoading}: ApiResponse<Product[]> = useSWR(
        `https://fakestoreapi.com/products`, 
        fetcher
    );


    const filteredAndSortedProducts : Product[] = useMemo(() => {
        if (!data) return [];

        const filteredProducts = data.filter((product) => {
            return (
                ((priceMin && product.price >= priceMin) || !priceMin) &&
                ((priceMax && product.price <= priceMax) || !priceMax) &&
                (selectedCategory === "all" || product.category === selectedCategory) &&
                (!searchTerm ||
                    product?.title
                    ?.toLowerCase().includes(searchTerm?.toLowerCase())) || 
                    product?.description?.toLowerCase().includes(searchTerm?.toLowerCase())
                    
            );
        });

        const listCopy = [...filteredProducts];
        
        switch (sortState) {
            case "price_asc":
                return listCopy.sort((a, b) => a.price - b.price);
            case "price_desc":
                return listCopy.sort((a, b) => b.price - a.price);
            default:
                return listCopy;        
        }
    }, [data, sortState, priceMin, priceMax, selectedCategory, searchTerm]);

    console.log(filteredAndSortedProducts, data)

    return {
        sortedAndFilteredData: filteredAndSortedProducts,
        data,
        error,
        isLoading,
    }

 };
 


export default useProducts;