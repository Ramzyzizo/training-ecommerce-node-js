const asyncHandler = require("express-async-handler");
const ApiError = require("../utiles/ApiError");

exports.deleteOne= (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new ApiError(`Document not found for ${id}`, 404));
    }
    res.status(204).json({ status: "Deleted successfully", data: doc });
  });