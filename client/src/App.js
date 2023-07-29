import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "./redux/productSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/product`);
      const data = await res.json();
      dispatch(addProduct(data));
    })();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <div>
        <Header />
        <main className="pt-16 bg-slate-200 min-h-[calc(100vh)]">
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default App;
