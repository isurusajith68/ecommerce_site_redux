import React from "react";
import { useDispatch } from "react-redux";
import {
  addCart,
  decrement,
  deleteCart,
  increment,
} from "../redux/productSlice";

import { toast } from "react-hot-toast";
import { AiFillDelete } from "react-icons/ai";
const CartCard = ({ id, name, image, price, quantity, total, category }) => {
  const dispathch = useDispatch();

  return (
    <div className="w-full bg-slate-300 p-2 md:p-2 md:m-auto">
      <div className="bg-white p-2 rounded-lg hover:shadow-lg">
        <div className="flex gap-4 h-32">
          <img
            src={image}
            alt=""
            className="w-36 h-28 object-cover border-2  m-auto hover:opacity-80 "
          />
          <div className="w-1/4 m-auto h-1.5/2 ml-5">
            <p className="font-semibold capitalize">{name}</p>
            <p className="font-semibold capitalize">{category}</p>
            <p className="font-semibold capitalize text-red-600">
              Rs : <span className="text-black">{price}</span>
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => dispathch(increment(id))}
                className="px-1 w-6 h-6 bg-red-500 text-white rounded-full "
              >
                +
              </button>
              <p className="font-semibold capitalize">{quantity}</p>
              <button
                onClick={() => dispathch(decrement(id))}
                className="px-1 h-6 w-6 text-white bg-red-500 rounded-full"
              >
                -
              </button>
            </div>
          </div>
          <div className="w-1/4  h-1/3  m-auto">
            <p className="font-semibold capitalize text-red-500">
              Total Rs : <span className="text-black">{total}</span>
            </p>
          </div>
          <div className="w-2/8 bg-red-500 h-2/8 p-1 rounded-full text-white m-auto ">
            <span className="flex justify-center m-auto items-center hover:bg-red-600 cursor-pointer">
              <AiFillDelete
                onClick={() => {
                  dispathch(deleteCart(id));
                  toast.success("Product Deleted Successfully");
                }}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
