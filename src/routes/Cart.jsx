import useCart from "../hooks/useCart";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return <p>Koszyk jest pusty.</p>;
  }

  return (
    <div>
      <h2>Koszyk</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - {item.price} zł
            <button onClick={() => removeFromCart(item.id)}>Usuń</button>
          </li>
        ))}
      </ul>
      <button onClick={clearCart}>Wyczyść koszyk</button>
    </div>
  );
}