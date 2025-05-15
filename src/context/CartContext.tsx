import { createContext, useState, useEffect, useMemo, useCallback, ReactElement } from "react";
import { CartContextType } from "@/types/CartContextType";
import { Product } from "@/types/Product";


export const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: (_: Product) => {},
  removeFromCart: (_: number) => {},
  clearCart: () => {},
  cartSum: 0,
});

export const CartProvider = ({ children } : {children : ReactElement}) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Ładowanie koszyka z localStorage przy inicjalizacji
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Zapisywanie koszyka do localStorage przy zmianach
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);


  const cartSum = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  }, [cartItems]);


  const addToCart = useCallback((product : Product) => {
    setCartItems(prev => [...prev, product]);
  }, []); 

  const removeFromCart = useCallback((productId : number) => {
    setCartItems(prevcartItems => prevcartItems.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{ 
        cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart,
        cartSum,
      }}>

      {children}
    </CartContext.Provider>
  );
};

