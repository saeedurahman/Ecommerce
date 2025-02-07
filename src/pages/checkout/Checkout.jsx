import { useAtom } from "jotai";
import React from "react";
import { cartAtom } from "../../lib/store";
import LoadingButton from "../../components/buttons/LoadingButton";
import { CrossIcon, DeleteIcon, Trash2 } from "lucide-react";

const Checkout = () => {
  const [cart, setCart] = useAtom(cartAtom);

  const handleRemoveFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
  };

  const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = cart?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalDiscountedPrice = cart?.reduce((acc, item) => {
    return (
      acc + item.price * item.quantity * (1 - item.discountPercentage / 100)
    );
  }, 0);

  const handleIncrease = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.min(item.quantity + 1, item.stock),
          }
        : item
    );
    setCart(updatedCart);
  };

  const handleDecrease = (id) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Math.max(item.quantity - 1, 1),
        };
      } else {
        return item;
      }
    });

    setCart(updatedCart);
  };

  return (
    <>
      <div className="flex  gap-5">
        <div className="bg-customDarkBlue p-5 border flex-1 rounded flex flex-col gap-3">
          {cart.map((product) => {
            return (
              <div
                key={product.id}
                className="border-b pb-3 flex items-center justify-between"
              >
                <div className="flex items-center gap-5">
                  <img
                    src={product?.images?.[0]}
                    alt={product?.title}
                    className="w-20 h-20 border border-customGray rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-bold">{product?.title}</h3>
                    <p className="text-sm mt-2">Price: ${product?.price}</p>
                    <p className="text-sm mt-2">
                      Discount: {product?.discountPercentage}%
                    </p>
                    <p className="text-sm mt-2">
                      Actual Price for all items: $
                      {(product?.price * product.quantity).toFixed(2)}
                    </p>
                    <p className="text-sm mt-2">
                      Discounted Price for all items: $
                      {(
                        product?.price *
                          product?.quantity *
                          (1 - product?.discountPercentage / 100) || 0
                      ).toFixed(2)}
                    </p>
                    <p className="text-sm mt-2">Stock: {product?.stock}</p>
                    <div className="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-2 rounded dark:bg-blue-900 dark:text-blue-300 capitalize max-w-fit mt-2">
                      {product?.category}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-3">
                    <p>Quantity</p>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-customGray block min-w-7 min-h-7 font-bold rounded items-center justify-center"
                        onClick={() => handleDecrease(product.id)}
                        disabled={product?.quantity === 1}
                      >
                        -
                      </button>
                      <span>{product?.quantity}</span>
                      <button
                        className="bg-customGray block min-w-7 min-h-7 font-bold rounded  items-center justify-center "
                        onClick={() => handleIncrease(product.id)}
                        disabled={product?.quantity === product?.stock}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="bg-red-500 rounded-full p-1 text-white"
                    onClick={() => handleRemoveFromCart(product.id)}
                  >
                    <Trash2 />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="bg-customDarkBlue  p-3 border rounded min-w-80 h-fit ">
          <div className="flex flex-col gap-5">
            <h6 className="font-bold">Subtotal {`(${totalItems})`} Items</h6>

            <div className="flex items-center justify-between border-b pb-3">
              <p className="font-bold">Actual total</p>

              <p className="font-bold">${totalPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between border-b pb-3">
              <p className="font-bold">Dicounted Subtotal</p>

              <p className="font-bold">${totalDiscountedPrice.toFixed(2)}</p>
            </div>
            <LoadingButton>Place Order</LoadingButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
