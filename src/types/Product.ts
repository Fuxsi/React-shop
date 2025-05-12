export interface Product {
    id: number,
    title: string,
    description: string,
    image: string,
    price: number,
    category: string,
}

const ProductCard = ({ product }: { product: Product }) => {
    const { cartItems, addToCart, removeFromCart } = useCart();
    
    const isInCart = cartItems.some((item: Product) => item?.id === product?.id);
}

