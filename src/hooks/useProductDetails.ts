import useSWR from "swr";
import { fetcher } from "../utils/fetch";
import {ApiResponse} from "@/types/Api";
import {Product} from "@/types/Product";
 

const useProductDetails = (productId : number) => {
    const { data, error, isLoading } : ApiResponse<Product> = useSWR(
        `https://fakestoreapi.com/products/${productId}`, 
        fetcher
    );

    return {
        data,
        error,
        isLoading,
    };
};

export default useProductDetails;