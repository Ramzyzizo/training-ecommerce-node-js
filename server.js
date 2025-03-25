const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbCOnnection = require("./config/database") 
const catgeoryRoute = require("./routes/categoriesRoute")

dbCOnnection();
const app = express();
app.use(express.json())


// Mount routes
app.use('/api/v1/categories',catgeoryRoute)




const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`App is running envvv.${PORT} `);
});
