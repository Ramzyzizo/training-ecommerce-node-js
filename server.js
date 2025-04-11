const express = require("express");
const dotenv = require("dotenv");
const multer = require("multer");

dotenv.config({ path: "config.env" });
const dbConnection = require("./config/database");
const catgeoryRoute = require("./routes/categoriesRoute");
const subCatgeoryRoute = require("./routes/subCategoriesRoute");
const brandRoute = require("./routes/brandsRoute");
const ProductRoute = require("./routes/productsRoute");
const UserRoute = require("./routes/userRoute");
const uploadRoute = require("./routes/uploadRoute");

const AuthRoute = require("./routes/authRoute");
const ApiError = require("./utiles/ApiError");
const globalError = require("./middlewares/errorMiddleware");
const {requireAuth} = require("./middlewares/authMiddleware");

dbConnection();
const app = express();
// handle json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount routes
app.use("/api/v1/", AuthRoute);
app.use("/api/v1/categories", catgeoryRoute); 
app.use("/api/v1/subCategories", subCatgeoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", ProductRoute);
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/uploads", uploadRoute);

// handle routes not found
app.use("*", (req, res, next) => {
  next(new ApiError(`Can't find this route. ${req.originalUrl}`, 400));
});

// handle global erros of express as json
app.use(globalError);

const {PORT} = process.env;
const server = app.listen(PORT, () => {
  console.log(`App is running envvv.${PORT} `);
});

// events to handle errors out of express
process.on("unhandledRejection", (err) => {
  console.error(`unhandled Error. ${err}`);
  server.close(()=>{
    console.log(`Shutting down....`);
    process.exit(1);
  });
});
