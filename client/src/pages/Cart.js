import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CartCard from "../components/CartCard";
import { toast } from "react-hot-toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51LMEvTC05RrpHY1zUINiBb70Oue9TVmbH9LoKTZKKa0Ra3a8J188Ph3kouCpSeLJUr7qCgndpWlAXwt5GVlZOLIY00SkMj6avh"
);
const Cart = () => {
  const cartSelector = useSelector((state) => state.product.cart);
    const userData = useSelector((state) => state.user);

  console.log(userData);

  const totalprice = cartSelector.reduce(
    (acc, curr) => acc + parseInt(curr.total),
    0
  );
  const totalQuantity = cartSelector.reduce(
    (acc, curr) => acc + parseInt(curr.qty),
    0
  );

  const payment = async () => {


    if (userData.email) {

      const data = await fetch("http://localhost:5000/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartSelector }),
      });
    
      if (data.status === 500) return;
    
      const res = await data.json();
      console.log(res);
    
      toast.success("Redirecting to payment page");
    
      stripePromise.then((stripe) => {
        stripe.redirectToCheckout({
          sessionId: res.id,
        });
      });
    }else{
      toast.error("Please Login First");
      setTimeout(() => {
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      })
    }

  };

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
              <button
                onClick={payment}
                className="px-5 py-2 w-2/6 bg-red-500 rounded-full text-white font-bold border-2  "
              >
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
