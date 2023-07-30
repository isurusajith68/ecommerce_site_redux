const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const stripe = require("stripe");
app.use(cors());
dotenv.config();
app.use(express.json({ limit: "10mb" }));

const port = 5000;
// console.log(process.env.Stripe_Secret_key);
//mongo Db
mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/shop")
  .then(() => console.log("connected database"))
  .catch((err) => console.log(err));

const userSchema = mongoose.Schema({
  fristName: String,
  lastName: String,
  email: {
    type: String,
  },
  password: String,
  cpassword: String,
  image: String,
});

const userModel = mongoose.model("user", userSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/signup", async (req, res) => {
  const { email } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email }).exec();
    if (existingUser) {
      res.send({ message: "Email already exists", alert: false });
    } else {
      const newUser = new userModel(req.body);
      const savedUser = await newUser.save();
      res.send({ message: "Successfully signed up", alert: true });
    }
  } catch (error) {
    console.error("Error finding/saving user:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const finduser = await userModel.findOne({ email: email }).exec();
  if (finduser) {
    const data = {
      _id: finduser._id,
      fristName: finduser.fristName,
      lastName: finduser.lastName,
      email: finduser.email,
      image: finduser.image,
    };
    if (finduser.password === password) {
      res.send({ message: "login is sucesfully", alert: true, res: data });
    } else {
      res.send({ message: "Invalid Password", alert: false });
    }
  } else {
    res.send({ message: "Email Id not available", alert: false });
  }
});

//product section

const schemaProduct = mongoose.Schema({
  name: String,
  category: String,
  image: String,
  price: String,
  description: String,
});
const productModel = mongoose.model("product", schemaProduct);

app.post("/product", async (req, res) => {
  const newProduct = new productModel(req.body);
  const saveProduct = await newProduct.save();
  res.send({ message: "Product Added", alert: true, data: saveProduct });
});

app.get("/product", async (req, res) => {
  const findProduct = await productModel.find().exec();
  res.send(findProduct);
});

//payment section

app.post("/payment", async (req, res) => {
  const data = req.body;

  try {
    const parms = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [
        {
          shipping_rate: "shr_1NZObVC05RrpHY1ztkspXq27",
        },
      ],
      line_items: data.cartSelector.map((el) => {
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: el.name,
              //images: [el.image],
            },
            unit_amount: el.price * 100,
          },
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
          },
          quantity: el.qty,
        };
      }),
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    };
    const session = await stripe(
      process.env.Stripe_Secret_key
    ).checkout.sessions.create(parms);
    res.status(200).json({ id: session.id });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }

  // console.log(data);
});

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
