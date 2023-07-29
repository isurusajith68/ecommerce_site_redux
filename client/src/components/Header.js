import React, { useState } from "react";
import Logo from "../assest/logo.png";
import { Link } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { BsCartDashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/userSclice";
import { toast } from "react-hot-toast";
const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handelLogout = () => {
    dispatch(logOut());
    toast.success("Log out succesfuly");
  };
 const ADMIN_EMAIL = "ecom@site.com"
 
 const cartLength = useSelector((state) => state.product.cart.length);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-12">
            <img src={Logo} className="h-full" alt="" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7 ">
          <nav className=" md:flex gap-4 md:gap-6 text-base md:text-lg hidden">
            <Link to={""}>Home</Link>
            {/* <Link to={"menu"}>Menu</Link> */}
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl relative">
            <Link to={"cart"}>
              <BsCartDashFill />
              <div className="-top-2 -right-2 absolute flex items-center justify-center bg-red-500 h-4 w-4 rounded-full">
                <span className="text-[10px] text-white">{cartLength}</span>
              </div>
            </Link>
          </div>
          <div
            className="cursor-pointer "
            onClick={() => {
              setShowMenu((pre) => !pre);
            }}
          >
            <div className="text-3xl ">
              {userData.image ? (
                <img
                  src={userData.image}
                  alt=""
                  className="w-10 h-10 border-2 border-black border-opacity-50 drop-shadow-md  rounded-full"
                />
              ) : (
                <FaRegUserCircle />
              )}
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-white overflow-hidden drop-shadow-md p-1">
                {userData.email === ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    New Product
                  </Link>
                )}

                <br></br>
                {userData.name ? (
                  <Link
                    onClick={handelLogout}
                    className="whitespace-nowrap cursor-pointer"
                  >
                    Log Out
                  </Link>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer p-1"
                  >
                    Login
                  </Link>
                )}
                <nav className="   text-base md:text-lg flex flex-col gap-1 mt-1 px-1 md:hidden">
                  <Link to={""}>Home</Link>
                  {/* <Link to={"menu"}>Menu</Link> */}
                  <Link to={"about"}>About</Link>
                  <Link to={"contact"}>Contact</Link>
                </nav>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
