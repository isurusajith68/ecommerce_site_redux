import React, { useState } from "react";
import LogoAnim from "../assest/login-animation.gif";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import ImagetoBase64 from "../components/imageBase64";
import { toast } from "react-hot-toast";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const [data, setData] = useState({
    fristName: "",
    lastName: "",
    email: "",
    password: "",
    cpassword: "",
    image: "",
  });
  const navigate = useNavigate();

  const handelShowPassword = () => {
    setShowPassword((pre) => !pre);
  };
  const handelShowCPassword = () => {
    setShowCPassword((pre) => !pre);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const { fristName, email, password, cpassword } = data;
    if (fristName && email && password && cpassword) {
      if (password === cpassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER}/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const datares = await fetchData.json();
        if (datares.alert === true) {
          toast.success(datares.message);
          navigate("/login");
        } else {
          toast.error(datares.message);
        }
      } else {
        toast.error("password not match");
      }
    } else {
      toast.error("please enter requed fields");
    }
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleImage = async (file) => {
    // setImage(file.target.files[0]);
    const Imagedata = await ImagetoBase64(file.target.files[0]);
    setData((pre) => {
      return {
        ...pre,
        image: Imagedata,
      };
    });
  };

  return (
    <div className="p-4 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex flex-col p-4">
        <h1 className="text-center text-2xl font-bold mb-2"> Sign Up</h1>
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative">
          <img
            src={data.image ? data.image : LogoAnim}
            className="w-full"
            alt=""
          />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 text-center w-full bg-opacity-40 bg-slate-400 cursor-pointer">
              <p className="text-sm p-1 text-white">Upload</p>
            </div>
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="hidden"
            onChange={handleImage}
          />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handelSubmit}>
          <label htmlFor="fristname">Frist Name</label>
          <input
            type="text"
            id="fristName"
            name="fristName"
            className="w-full mb-2 bg-slate-200 px-2 py-1 mt-1 rounded focus-within:outline-blue-500"
            value={data.fristName}
            onChange={handelChange}
          />
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="w-full mb-2 bg-slate-200 px-2 py-1 mt-1 rounded focus-within:outline-blue-500"
            value={data.lastName}
            onChange={handelChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full mb-2 bg-slate-200 px-2 py-1 mt-1 rounded focus-within:outline-blue-500"
            value={data.email}
            onChange={handelChange}
          />
          <label htmlFor="password">Password</label>
          <div className="flex px-2 py-1 rounded bg-slate-200 mb-2  mt-1 outline-none  outline focus-within:outline-blue-500">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className="w-full  bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handelChange}
            />
            <span
              className="flex items-center text-xl cursor-pointer"
              onClick={handelShowPassword}
            >
              {showPassword ? <BiSolidShow /> : <BiSolidHide />}
            </span>
          </div>

          <label htmlFor="cpassword">Confirm Password</label>
          <div className="flex px-2 py-1 rounded bg-slate-200 mb-2  mt-1 outline-none  outline focus-within:outline-blue-500">
            <input
              type={showCPassword ? "text" : "password"}
              id="cpassword"
              name="cpassword"
              className="w-full  bg-slate-200 border-none outline-none"
              value={data.cpassword}
              onChange={handelChange}
            />
            <span
              className="flex items-center text-xl cursor-pointer"
              onClick={handelShowCPassword}
            >
              {showCPassword ? <BiSolidShow /> : <BiSolidHide />}
            </span>
          </div>
          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-lg font-semibold text-white mt-2 rounded-full p-1"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm ">
          Already have account ?{" "}
          <Link className="font-semibold" to="/login">
            Login{" "}
          </Link>
        </p>
      </div>
      {/* <img src={image} className="w-100" alt="" /> */}
    </div>
  );
};

export default SignUp;
