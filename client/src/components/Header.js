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
  const selector = useSelector((state) => state);
  console.log(selector.user.email);
  console.log(ADMIN_EMAIL);
  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white">
      <div className="flex items-center h-full justify-between">
        <Link to="/">
          <div className="h-12">
            <img src={Logo} className="h-full" alt="" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7 ">
          <nav className="flex gap-4 md:gap-6 text-base md:text-lg">
            <Link to={""}>Home</Link>
            <Link to={"menu"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl relative">
            <BsCartDashFill />
            <div className="absolute -top-2 -right-1 text-white bg-red-500 h-5 w-4 rounded-full m-0 p-0 text-sm text-center items-center ">
              0
            </div>
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
                {
                  userData.email === ADMIN_EMAIL &&  <Link
                    to={"newproduct"}
                    className=
                    "whitespace-nowrap cursor-pointer"
                  >
                    New Product
                  </Link> 
                }
                 
              

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
                    className="whitespace-nowrap cursor-pointer"
                  >
                    Login
                  </Link>
                )}
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    </header>
  );
};

export default Header;
