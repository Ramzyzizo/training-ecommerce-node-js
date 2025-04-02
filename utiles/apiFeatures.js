class ApiFeatures{
    constructor(mongoesquery, queryString){
        this.query = mongoesquery;
        this.queryString = queryString;
    }

    filter(){
        const queryObj = {...this.queryString};
        const excludedFields = ["page", "sort", "limit", "fields", "keyword"];
        excludedFields.forEach((el) => delete queryObj[el]);
        // 1b) Advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    } 

    sort(){
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }

    limitFields(){
        if(this.queryString.fields){
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select(fields);
        }else{
            this.query = this.query.select("-__v");
        }
        return this;
    }

    search(modelName){
        if(this.queryString.keyword){
            const {keyword} = this.queryString;
            if(modelName === "Product"){
                this.query = this.query.find({
                    $or: [
                        { title: { $regex: keyword, $options: "i" } },
                        { description: { $regex: keyword, $options: "i" } }
                    ]
                });
            }else{
                this.query = this.query.find({
                    name: { $regex: keyword, $options: "i" }
                });
            }
        }
        return this;
    }

    paginate(countDocuments){
        const page = Number(this.queryString.page) || 1;
        const limit = Number(this.queryString.limit) || 2;
        const skip = (page - 1) * limit;

        this.paginationResult = {
          totalDocuments: countDocuments,
          currentPage: page,
          limit: limit,
          numberOfPages: Math.ceil(countDocuments / limit),
          next: page < Math.ceil(countDocuments / limit) ? page + 1 : null,
          prev: page > 1 ? page - 1 : null,
        };
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }
}

module.exports = ApiFeatures;