import useSWR from "swr";
import { fetcher } from "../utils/fetch";

const useProductDetails = (productId) => {
    const { data, error, isLoading } = useSWR(
        `https://fakestoreapi.com/products`, 
        fetcher
    );

    return {
        data,
        error,
        isLoading,
    };
};

export default useProductDetails;