import { Link } from "react-router-dom";
import useCart from "@/hooks/useCart";
import { Product } from "@/types/Product";

const ProductCard = ({ product }: { product: Product }) => {
  // const { cartItems, addToCart, removeFromCart } = useCart();
  // const isInCart = cartItems.some((item: Product) => item?.id === product.id);
  // console.log(product.name, product.title);
  // const handleCartAction = () => {
  //   if (isInCart) {
  //     removeFromCart(product.id);
  //   } else {
  //     addToCart(product);
  //   }
  // };

  return (
    <div className="h-100 border p-4 rounded-lg cursor-pointer">
      <img
        src={product.image}
        alt={product.title}
        className="mb-4 rounded"
        height="100"
        width="100"
      />
      <Link to={`/product/${product.id}`}>
        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
      </Link>
      <div className="flex justify-between items-center w-full">
        <span className="text-xl font-bold text-blue-600">
          {product.price.toFixed(2)} zł
        </span>
      </div>
      <span>{product.category}</span>
      {/* <button
        onClick={handleCartAction}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white"
      >
        {isInCart ? "Usuń z koszyka" : "Dodaj do koszyka"}
      </button> */}
    </div>
  );
};

export default ProductCard;
