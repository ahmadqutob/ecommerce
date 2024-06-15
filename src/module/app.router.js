import connectDB from "../../DB/connectDB.js";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import catRouter from "./category/category.router.js";
import couponRouter from "./coupon/coupon.router.js";
import brandRouter from "./brand/brand.router.js";
import productRouter from "./product/product.router.js";
import cartRouter from "./cart/cart.router.js";
import orderRouter from "./order/order.router.js";
import wishRouter from "./wishlist/wishlist.router.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors'
const myLocation = path.dirname(fileURLToPath(import.meta.url));

const initapp = (app, express, next) => {

  // web how can access project data
  // var whitelist = ['http://example1.com', 'http://example2.com']
  // var corsOptions = {
  //   origin: function (origin, callback) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true)
  //     } else {
  //       callback(new Error('Not allowed by CORS'))
  //     }
  //   }
  // }


  connectDB();
  // app.use(cors(corsOptions)); // to allow front-end to use project and fetch data
  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/categorys", catRouter);
  app.use("/coupon", couponRouter);
  app.use("/brand", brandRouter);
  app.use("/product", productRouter);
  app.use("/cart", cartRouter);
  app.use("/order", orderRouter);
  app.use("/wishlist", wishRouter);

  //  let nodejs go to static folder  not like a function , and get the image
  app.use("/upload", express.static("uploads"));

  //  if i change folder direction i must to use path
  //     const fullpath=path.join(myLocation,'../uploads');
  //  app.use('/upload',express.static(fullpath))

  app.use("/*", (req, res) => {
    return res.json({ message: "page not found" });
  });
  // global error handlers

  app.use((err, req, res, next) => {
    if (err) {
      //  return res.json({message:'global error handler',err:err.stack})
      return res.json({ message: err.message});
    }
  });
};

export default initapp;
