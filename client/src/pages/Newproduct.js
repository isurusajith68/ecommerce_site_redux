import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import ImagetoBase64 from "../components/imageBase64";
import { toast } from "react-hot-toast";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    category: "",
    image: "",
    price: "",
    description: "",
  });

  const handelChange = (e) => {
    const { name, value } = e.target;

    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const uploadImage = async (file) => {
    // setImage(file.target.files[0]);
    const Imagedata = await ImagetoBase64(file.target.files[0]);
    setData((pre) => {
      return {
        ...pre,
        image: Imagedata,
      };
    });
  };

  const handelSubmit = async (e) => {
    e.preventDefault();

    const { name, image, category, price } = data;

    if (name && image && category && price) {
      const product = await fetch(`${process.env.REACT_APP_SERVER}/product`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(product)
      toast.success("Saved Product");

      setData(() => {
        return {
          name: "",
          category: "",
          image: "",
          price: "",
          description: "",
        };
      });
    } else {
      toast.error("Enter required field");
    }
  };

  
  return (
    <div className="p-4">
      {" "}
      <form
        onSubmit={handelSubmit}
        className="m-auto w-full max-w-md shadow p-3 flex flex-col bg-white"
      >
        <label htmlFor="nname">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          onChange={handelChange}
          className="bg-slate-300 rounded-md outline-red-400 p-1"
        />
        <label htmlFor="Categoty" className="mt-2">
          Category
        </label>
        <select
          id="category"
          onChange={handelChange}
          name="category"
          value={data.category}
          className={
            data.category
              ? "bg-slate-300 outline-blue-400 p-1 rounded-md "
              : "bg-slate-300 outline-red-400 p-1 rounded-md "
          }
          // "`bg-slate-300 outline-red-400 p-1 rounded-md` "
        >
          <option>Selecr Caterory</option>
          <option value={"Fruits"}>Fruits</option>
          <option value={"Vegitable"}>Vegitable</option>
          <option value={"Ice Creame"}>Ice Creame</option>
          <option value={"Dosa"}>Dosa</option>
          <option value={"Pizza"}>Pizza</option>
        </select>
        <label htmlFor="image" className="mt-2">
          Image
          <div className="h-40 bg-slate-300  cursor-pointer  rounded-md  flex items-center justify-center w-full ">
            {data.image ? (
              <img src={data.image} alt=" " className="h-full " />
            ) : (
              <span className="text-5xl">
                <AiOutlineCloudUpload />
              </span>
            )}

            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={uploadImage}
            />
          </div>
        </label>
        <label className="mt-2">Price</label>
        <input
          id="price"
          type="text"
          name="price"
          value={data.price}
          onChange={handelChange}
          className={
            data.price.length > 1
              ? "bg-slate-300 outline-blue-400 p-1 rounded-md "
              : "bg-slate-300 outline-red-400 p-1 rounded-md "
          }
        />
        <label htmlFor="Description" className="mt-2">
          Description
        </label>
        <textarea
          rows={3}
          value={data.description}
          onChange={handelChange}
          name="description"
          className="bg-slate-300 outline-red-400 p-1 rounded-md"
        ></textarea>
        <button
          type="submit"
          className="bg-red-500 p-2 rounded-full mt-3  font-bold text-white hover:bg-red-600  drop-shadow"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
