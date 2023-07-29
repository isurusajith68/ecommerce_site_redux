import React, { useEffect,  useState } from "react";
import { useSelector } from "react-redux";
import FilterProduct from "./FilterProduct";
import CardReature from "./CardReature";

const AllProduct = ({ heading }) => {
  const productData = useSelector((state) => state.product.product);

  const productCategory = [
    ...new Set(productData.map((el, index) => el.category)),
  ];


  const [filterby, setFilterby] = useState("");
  const [dataFilter, setDataFilter] = useState([]);

  useEffect(() => {
    if (filterby) {
      const filterData = productData.filter(
        (el) => el.category.toLowerCase() === filterby.toLowerCase()
      );
      setDataFilter(filterData);
    } else {
      setDataFilter(productData);
    }
  }, [filterby, productData]);
  return (
    <div>
      <div className="flex w-full items-center ">
        <h2 className="font-bold text-center w-full mt-5 text-2xl mb-5 text-slate-800">
          {heading}
        </h2>
        
      </div>
      <div>
        <div className="flex gap-4  justify-center overflow-scroll scrollbar-none">
          {productCategory.map((el) => {
            return (
              <div
              className="mb-5"
                onClick={() => {
                  setFilterby(filterby === "" ? el : "");
                }}
              >
                <FilterProduct category={el} />
              </div>
            );
          })}
        </div>
        <div
          
          className="flex flex-wrap justify-center gap-4 my-4"
        >
          {dataFilter[0] &&
            dataFilter.map((el) => {
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
            })}
        </div>
      </div>
    </div>
  );
};

export default AllProduct;
