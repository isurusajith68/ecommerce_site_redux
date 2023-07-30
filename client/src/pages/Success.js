import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.success("Payment Successfull");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  });

  return <div></div>;
};

export default Success;
