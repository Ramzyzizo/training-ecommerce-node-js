const asyncHandler = require("express-async-handler");
const ApiError = require("../utiles/ApiError");
const ApiFeatures = require("../utiles/apiFeatures");

exports.deleteOne= (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const doc = await Model.findByIdAndDelete(id);
    if (!doc) {
      return next(new ApiError(`Document not found for ${id}`, 404));
    }
    res.status(204).json({ status: "Deleted successfully", data: doc });
  });

exports.updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!doc) {
        return next(new ApiError(`Document not found for ${req.params.id}`, 404));
      }
      res.status(200).json({ status: "Updated successfully", data: doc });
    })

exports.createOne = (Model) =>
  asyncHandler(async (req, res) => {
    const doc = await Model.create(req.body);
    res.status(201).json({ status: "Created successfully", data: doc });
  });

exports.getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const query = Model.findById(id);
    const doc = await query;
    if (!doc) {
      return next(new ApiError(`Document not found for ${id}`, 404));
    }
    res.status(200).json({ status: "success", data: doc });
  });

exports.getAll = (Model, populateOptions) =>
  asyncHandler(async (req, res) => {
    const apiFeatures = new ApiFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .search(Model.modelName);
    const countDocuments = await apiFeatures.query.clone().countDocuments();
    apiFeatures.paginate(countDocuments);

    const{ paginationResult } = apiFeatures;
    let{ query } = apiFeatures;

     if (populateOptions) {
       query = query.populate(populateOptions);
     }
    const doc = await query;

    res.status(200).json({
      paginationResult,
      data: doc,
    });
  });
