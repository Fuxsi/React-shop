const ProductCard = ({product, onClick}) => {
    return (
        <div onClick={onClick} className="flex flex-col items-center cursor-pointer">
                <p className="text-2xl text-red-500">{product.title}</p>
                <p>{product.price.toFixed(2)}zł</p>
                <p><img src={product.image} /></p>
        </div>
    );
};

export default ProductCard;