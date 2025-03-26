const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbCOnnection = require("./config/database") 
const catgeoryRoute = require("./routes/categoriesRoute");
const ApiError = require("./utiles/ApiError");
const globalError = require("./middlewares/errorMiddleware");

dbCOnnection();
const app = express();
app.use(express.json())


// Mount routes
app.use('/api/v1/categories',catgeoryRoute)


// handle routes not found
app.use('*',(req,res,next)=>{
  next(new ApiError(`Can't find this route. ${req.originalUrl}`, 400));
})

// handle global erros as json
app.use(globalError);


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running envvv.${PORT} `);
});
