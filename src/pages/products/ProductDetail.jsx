import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PRODUCTS_URL } from "../../lib/utils/constants/apiRoutes";
import { useAtom } from "jotai";
import { cartAtom } from "../../lib/store";
import LoadingButton from "../../components/buttons/LoadingButton";
import { routes } from "../../lib/utils/constants";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [cart, setCart] = useAtom(cartAtom);

  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const fetchSingleProduct = async () => {
    try {
      const response = await axios.get(`${PRODUCTS_URL}/${id}`);

      setProduct(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchSingleProduct();
    }
  }, [id]);

  console.log("id", typeof id);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };
  const handleDecrease = () => {
    setQuantity((prev) => prev - 1);
  };

  console.log("product", product);

  const handleAddToCart = () => {
    const existingProduct = cart.find((item) => item.id === Number(id));

    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item.id === Number(id)
          ? {
              ...item,
              quantity: Math.min(item.quantity + quantity, product.stock),
            }
          : item
      );
      setCart(updatedCart);
    } else {
      // Add new product to cart
      setCart([...cart, { ...product, quantity }]);
    }
    navigate(routes.CHECKOUT);
  };
  console.log("cart", cart);

  return (
    <>
      <>
        <h1>Product Detail</h1>
        <div className="flex gap-5 mt-5">
          <div
            className="bg-customDarkBlue  p-5 border rounded h-fit flex-1
        "
          >
            <div className="flex">
              <img
                src={product?.images?.[0]}
                alt={product?.title}
                className="w-96 items-center flex justify-center m-auto rounded-lg"
              />
              <div>
                <h3 className="font-bold mt-5">{product?.title}</h3>
                <p className="text-sm  mt-2">{product?.description}</p>
                <p className="text-sm  mt-2">${product?.price}</p>
                <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-2 rounded dark:bg-blue-900 dark:text-blue-300 capitalize max-w-fit mt-2">
                  {product?.category}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-customDarkBlue  p-3 border rounded min-w-80 h-fit ">
            <div className="flex flex-col gap-5">
              <div className="flex items-center justify-between border-b pb-3">
                <p>Price</p>
                <p>${product?.price}</p>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <p>Stock</p>
                <p>{product?.stock}</p>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <p>Discount</p>
                <p>{product?.discountPercentage}%</p>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <p>Quantity</p>
                <div className="flex items-center gap-2">
                  <button
                    className="bg-customGray block min-w-7 min-h-7 font-bold rounded items-center justify-center"
                    onClick={handleDecrease}
                    disabled={quantity === 1}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    className="bg-customGray block min-w-7 min-h-7 font-bold rounded  items-center justify-center "
                    onClick={handleIncrease}
                    disabled={quantity === product?.stock}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <p className="font-bold">Actual total</p>
                {/* The formula for calculating the discounted price is:
              Discounted Price = Price × ( 1 − Discount Percentage 100 )
              Discounted Price=Price×(1− 100 Discount Percentage ​ ) */}
                <p className="font-bold">
                  ${(product?.price * quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between border-b pb-3">
                <p className="font-bold">Subtotal</p>
                {/* The formula for calculating the discounted price is:
              Discounted Price = Price × ( 1 − Discount Percentage 100 )
              Discounted Price=Price×(1− 100 Discount Percentage ​ ) */}
                <p className="font-bold">
                  $
                  {(
                    product?.price *
                      quantity *
                      (1 - product?.discountPercentage / 100) || 0
                  ).toFixed(2)}
                </p>
              </div>
              <LoadingButton handleClick={handleAddToCart}>
                Add to Cart
              </LoadingButton>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default ProductDetail;
