const express = require("express");
const dotenv = require("dotenv");
const Queue = require("bull");
// security
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config({ path: "config.env" });

const catgeoryRoute = require("./routes/categoriesRoute");
const subCatgeoryRoute = require("./routes/subCategoriesRoute");
const brandRoute = require("./routes/brandsRoute");
const ProductRoute = require("./routes/productsRoute");
const UserRoute = require("./routes/userRoute");
const uploadRoute = require("./routes/uploadRoute");

const AuthRoute = require("./routes/authRoute");
const ApiError = require("./utiles/ApiError");
const dbConnection = require("./config/database");
const globalError = require("./middlewares/errorMiddleware");

dbConnection();
const app = express();
// handle json body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set security http headers
app.use(helmet());
// limit requests from same api
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});

app.use('/api/v1/auth', authLimiter);
// Mount routes
app.use("/api/v1/auth", AuthRoute);
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

// craete queue using redid and bull library
const myQueue = new Queue("myQueue");
myQueue.process("myJob2", async (job) => {
  console.log("Done ramzy222");
});
myQueue.process("myJob1", async (job) => {
  console.log("Done ramzy111");
});

const {PORT} = process.env;
const server = app.listen(PORT, async () => {
  console.log(`App is running envvv.${PORT} `);
  // await myQueue.add("myJob1", {}, { delay: 10000 });
  // await myQueue.add("myJob2", {}, { delay: 5000 });
});

// events to handle errors out of express
process.on("unhandledRejection", (err) => {
  console.error(`unhandled Error. ${err}`);
  server.close(()=>{
    console.log(`Shutting down....`);
    process.exit(1); 
  });
});
