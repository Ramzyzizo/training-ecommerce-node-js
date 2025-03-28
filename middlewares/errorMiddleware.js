const globalError = (err,req,res,next)=>{
  statusCode=err.statusCode || 500;
  err.status = err.status || 'error';
  if(process.env.Node_ENV=="development"){
    sendErrorForDev(err, res);
  }else{
    sendErrorForProd(err,res);
  }
}

const sendErrorForDev = (err, res)=>{
    return res.status(statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
}
const sendErrorForProd = (err, res)=>{
    return res.status(statusCode).json({
      status: err.status,
      message: err.message,
    });
}
module.exports = globalError