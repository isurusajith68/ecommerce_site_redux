import React from "react";

const CardReature = ({ name, image, price, category }) => {
  return (
    <div className=" min-w-[220px] bg-white hover:shadow-lg drop-shadow-lg cursor-pointer overflow-hidden">
      {name ? (
        <div className=" p-2">
          <div className="h-36">
            <img src={image} alt="" className="h-full" />
          </div>
          <h3 className="overflow-hidden mt-2 font-semibold text-slate-600 capitalize text-lg whitespace-nowrap">
            {name}
          </h3>
          <p className=" ">{category}</p>
          <p className=" text-red-400">
            Rs: <span className="text-black">{price}</span>
          </p>
          <button className="bg-red-500 text-white rounded-full px-6 py-1 mt-2 hover:bg-red-600">
            Add to Cart
          </button>
        </div>
      ) : (
        <div
          role="status"
          class="min-w-[200px] p-4 border rounded shadow animate-pulse md:p-6 "
        >
          <div class="flex items-center justify-center h-[110px] mb-4 bg-gray-400 rounded ">
            <svg
              class="w-10 h-10 text-gray-200"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" />
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" />
            </svg>
          </div>
          <div class="h-2.5 bg-gray-200 rounded-full "></div>
          <div class="h-2 bg-gray-200 rounded-full mt-2"></div>
        </div>
      )}
    </div>
  );
};

export default CardReature;
