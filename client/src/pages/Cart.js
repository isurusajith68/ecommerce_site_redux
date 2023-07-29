import React from "react";
import { useSelector } from "react-redux";
import CartCard from "../components/CartCard";

const Cart = () => {
  const cartSelector = useSelector((state) => state.product.cart);
  console.log(cartSelector);

  const totalprice = cartSelector.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQuantity = cartSelector.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  console.log();
  return (
    <div>
      {cartSelector.length === 0 ? (
        <div>
          <div className="flex justify-center items-center h-screen">
            cart is empty
          </div>
        </div>
      ) : (
        <div className="md:flex md:p-4 md:gap-4 p-2 ">
          <div className=" md:w-2/3 min-w-[427px] my-2">
            {cartSelector[0] &&
              cartSelector.map((el) => {
                return (
                  <div key={el._id}>
                    <CartCard
                      id={el._id}
                      name={el.name}
                      image={el.image}
                      price={el.price}
                      category={el.category}
                      quantity={el.qty}
                      total={el.total}
                    />
                  </div>
                );
              })}
          </div>
          <div className="md:w-1/3 p-4 bg-slate-300 rounded w-full h-full">
            <div className=" font-bold text-2xl text-center text-red-500">
              Summary
            </div>
            <div className="flex justify-between px-4 py-2">
              <h1 className="font-bold ">Quntity</h1>
              <h1 className="font-bold ">{totalQuantity}</h1>
            </div>
            <div className="flex justify-between px-4 py-2">
              <h1 className="font-bold ">Total Price</h1>
              <h1 className="font-bold text-red-500">
                Rs : <span className="text-black">{totalprice}</span>
              </h1>
            </div>
            <div className="items-center justify-center  m-auto flex ">
              <button className="px-5 py-2 w-2/6 bg-red-500 rounded-full text-white font-bold border-2  ">
                Payment
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <h1 className="text-2xl font-bold text-center text-red-500">Cart</h1> */}
    </div>
  );
};

export default Cart;
