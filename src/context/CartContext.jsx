import { createContext, useState, useEffect, useMemo, useCallback } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

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


  const addToCart = useCallback((product) => {
    setCartItems(prev => [...prev, product]);
  }, []); 

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevcartItems => prevcartItems.filter((item) => item.id !== productId));
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, 
        addToCart, 
        removeFromCart, 
        clearCart,
        cartSum,
      }}>

      {children}
    </CartContext.Provider>
  );
};