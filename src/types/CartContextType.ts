import { Product } from "./Product";

export interface CartContextType {
    cartItems: Product[];
    removeFromCart: (productId: number) => void;
    addToCart: (product: Product) => void;
    clearCart: () => void;
    cartSum: number;
}