import React from "react";

const CardReature = ({ name, image, price, category }) => {
  return (
    <div className="">
      <div className="w-80">
        <img src={image} alt="w-full h-full" />
      </div>
    </div>
  );
};

export default CardReature;
