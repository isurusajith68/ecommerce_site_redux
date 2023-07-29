import React, { useRef } from "react";
import pngegg from "../assest/pngegg.png";
import { useSelector } from "react-redux";
import HomeCart from "../components/HomeCart";
import CardReature from "../components/CardReature";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

import AllProduct from "../components/AllProduct";
const Home = () => {
  const productData = useSelector((state) => state.product.product);

  const homeProductCart = productData.slice(0, 4);
  const homeProductCartFreshVegitable = productData.filter(
    (el, index) => el.category === "Vegitable"
  );
  const loardingArray = new Array(4).fill(0);
  const loardingArrayVegi = new Array(10).fill(0);

  //scroll products card
  const scrollLeftRef = useRef();
  const NavigateBefore = () => {
    scrollLeftRef.current.scrollLeft += 200;
  };
  const NavigateNext = () => {
    scrollLeftRef.current.scrollLeft -= 100;
  };

  return (
    <div className="p-2 md:p-4 ">
      <div className="md:flex ">
        <div className="md:w-1/2 flex flex-col">
          <div className="flex gap-2 animate-pulse bg-red-500 w-[130px] rounded-full p-1 shadow drop-shadow mt-1 border-2 border-white">
            <p className="font-medium text-[12px] text-white">Bike Delivery</p>
            <img src={pngegg} alt="" className="h-5 w-8" />
          </div>
          <h2 className="text-4xl   md:text-8xl font-bold pt-3">
            The Fastesd Delivery in{" "}
            <span className="text-red-500 ">Your Home</span>
          </h2>
          <p className="text-gray-500 py-3 text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <button className="m-auto mt-2 p-2 bg-red-500 text-white rounded-full px-6 hover:bg-red-600 border-white border-2">
            Oder Now
          </button>
        </div>
        <div className="md:w-1/2 flex flex-wrap gap-2 p-4 justify-center ">
          {homeProductCart[0]
            ? homeProductCart.map((el) => {
                return (
                  <HomeCart
                    key={el._id}
                    image={el.image}
                    name={el.name}
                    price={el.price}
                    category={el.category}
                  />
                );
              })
            : loardingArray.map((el, index) => {
                return <HomeCart key={index} />;
              })}
        </div>
      </div>
      <div className="flex w-full items-center ">
        <h2 className="font-bold text-2xl mb-1 mt-2 text-slate-800">
          Fress Vegitable
        </h2>
        <div className="ml-auto flex gap-4 ">
          <button
            onClick={NavigateNext}
            className="bg-red-500 text-white hover:bg-red-600 border-2 border-white text-lg rounded-full "
          >
            <MdNavigateBefore />
          </button>
          <button
            onClick={NavigateBefore}
            className="bg-red-500 text-white hover:bg-red-600 border-2 border-white text-lg rounded-full "
          >
            <MdNavigateNext />
          </button>
        </div>
      </div>
      <div
        ref={scrollLeftRef}
        className="flex gap-4 p-4 md:p-6 overflow-scroll scrollbar-none scroll-smooth transition-all"
      >
        {homeProductCartFreshVegitable[0]
          ? homeProductCartFreshVegitable.map((el) => {
              return (
                <CardReature
                  key={el._id}
                  _id={el._id}
                  image={el.image}
                  name={el.name}
                  price={el.price}
                  category={el.category}
                />
              );
            })
          : loardingArrayVegi.map((el, index) => {
              return <CardReature key={index} />;
            })}
      </div>
      <div>
        <AllProduct heading={"All Product"} />
      </div>
    </div>
  );
};

export default Home;
