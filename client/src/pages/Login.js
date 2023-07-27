import React, { useState } from "react";
import LogoAnim from "../assest/login-animation.gif";
import { BiSolidHide } from "react-icons/bi";
import { BiSolidShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { loginRedux } from "../redux/userSclice";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handelShowPassword = () => {
    setShowPassword((pre) => !pre);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = data;

    if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const datares = await fetchData.json();

      if (datares.alert === true) {
        setTimeout(() => {
          navigate("/");
        }, 1000);
        dispatch(loginRedux(datares.res));
        toast.success( datares.message);

      } else {
        toast.error(datares.message);
      }
    } else {
      alert("please enter requed fields");
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

  return (
    <div className="p-10 md:p-4 ">
      <div className="w-full max-w-sm bg-white m-auto flex items-center flex-col p-4">
        <h1 className="text-center text-2xl font-bold mb-2">Login</h1>
        <div className="">
          <img
            src={LogoAnim}
            className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md"
            alt=""
          />
        </div>
        <form className="w-full py-3 flex flex-col" onSubmit={handelSubmit}>
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

          <button
            type="submit"
            className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-lg font-semibold text-white mt-2 rounded-full p-1"
          >
            Login
          </button>
        </form>
        <p className="text-sm ">
          Don't have account ?{" "}
          <Link className="font-semibold" to="/signup">
            Sign Up{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
