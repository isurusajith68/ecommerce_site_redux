import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AllProduct from "../components/AllProduct";
import { addCart } from "../redux/productSlice";

const Menu = () => {
  const { filterProduct } = useParams();

  const data = useSelector((state) => state.product.product);

  const [filterData, setFilterData] = useState([]);
  const selectedData = filterData[0];
 
  const dispatch = useDispatch();

  const cartAdd = () => {
   dispatch(addCart(selectedData));
  }

  useEffect(() => {
    if (filterProduct) {
      const filterData = data.filter((el) => el._id === filterProduct);
      setFilterData(filterData);
    } else {
      console.log("no data found");
    }
  }, [filterProduct, data]);
  return (
    <div className="md:p-2 p-8 ">
      <div className="md:p-2 p-4 rounded-lg gap-4 overflow-hidden bg-white md:flex w-full   max-w-3xl m-auto">
        <div className="md:w-1/2  items-center justify-center m-auto ">
          <img src={selectedData?.image} alt="" className="w-2/3  m-auto" />
        </div>

        <div className="md:w-1/2 w-[400px] min-w-[400px] m-auto flex my-2 flex-col gap-2 overflow-hidden">
          <h1 className="font-bold text-xl ml-5 justify-center ">
            Product name :
            <span className="text-blue-500 "> {selectedData?.name}</span>
          </h1>
          <h1 className="font-bold text-xl ml-5 justify-center">
            Price :{" "}
            <span className="text-blue-500 "> {selectedData?.price}</span>
          </h1>
          <h1 className="font-bold text-xl ml-5 justify-center">
            Category :{" "}
            <span className="text-blue-500 "> {selectedData?.category}</span>
          </h1>

          <h1 className="font-bold text-xl ml-5 justify-center">
            Description :{" "}
            <span className="text-blue-500 "> {selectedData?.description}</span>
          </h1>
          <div className="flex w-full items-center justify-center gap-4 mt-2">
            <button
              onClick={cartAdd}
              className="p-2  bg-red-500 rounded-full text-white border-2 hover:bg-red-600 px-4 min-w-[150px]"
            >
              Add to Cart
            </button>
            <button className="p-2  bg-red-500 rounded-full text-white border-2 hover:bg-red-600 px-4 min-w-[150px]">
              Buy
            </button>
          </div>
        </div>
      </div>
      <AllProduct heading={"Featured products"} />
    </div>
  );
};

export default Menu;
