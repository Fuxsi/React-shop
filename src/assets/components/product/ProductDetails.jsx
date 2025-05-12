import useSWR from "swr";
// import { fetcher } from "../../../utils/fetch";
// import useCart from "../../hooks/useCart";
import useProductDetails from "../../../hooks/useProductDetails";

const ProductDetails = ({ id }) => {
  const { data: productData, error, isLoading } = useProductDetails(id);
  const { cartItems, addToCart, removeFromCart } = useCart();

  const isInCart = cartItems.some((item) => item.id === productData?.id);

  const handleCartAction = () => {
    if (isInCart) {
      removeFromCart(data.id);
    } else {
      addToCart(data);
    }
  };

  if (isLoading) return <span>Trwa pobieranie danych produktu</span>;
  if (error) return <span>Wystąpił błąd</span>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">{data.title}</h2>
      <img src={data.image} alt={data.title} className="w-64 h-auto" />
      <p className="text-gray-600">{data.category}</p>
      <p>{data.description}</p>
      <button
        onClick={handleCartAction}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
      >
        {isInCart ? "Usuń z koszyka" : "Dodaj do koszyka"}
      </button>
    </div>
  );
};

export default ProductDetails;