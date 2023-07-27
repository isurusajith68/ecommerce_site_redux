const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const port = 5000;

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



app.listen(port, () => {
  console.log(`server is running ${port}`);
});
