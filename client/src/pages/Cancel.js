import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Cancel = () => {
  const navigate = useNavigate();
  useEffect(() => {
    toast.error("Payment Cancelled");
    setTimeout(() => {
      navigate("/");
    }, 1000);
  });

  return <div></div>;
};

export default Cancel;
