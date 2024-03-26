import connectDB from "../../DB/connectDB.js";
import authRouter from "./auth/auth.router.js";
import userRouter from "./user/user.router.js";
import catRouter from "./category/category.router.js";
import couponRouter from "./coupon/coupon.router.js";
import brandRouter from "./brand/brand.router.js";
import productRouter from "./product/product.router.js";
import cartRouter from "./cart/cart.router.js";
import orderRouter from "./order/order.router.js";

import path from "path";
import { fileURLToPath } from "url";

const myLocation = path.dirname(fileURLToPath(import.meta.url));

const initapp = (app, express, next) => {
  connectDB();
  app.use(express.json());

  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/categorys", catRouter);
  app.use("/coupon", couponRouter);
  app.use("/brand", brandRouter);
  app.use("/product", productRouter);
  app.use("/cart", cartRouter);
  app.use("/order", orderRouter);

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
