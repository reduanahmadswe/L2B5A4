class APIFunctionality {
  query: any;
  queryStr: any;

  constructor(query: any, queryStr: any) {
    this.query = query;
    this.queryStr = queryStr;
  }
  

  filter() {
    const queryCopy = { ...this.queryStr };


    const removeFields = ["keyword", "page", "limit", "sort", "sortBy"];
    removeFields.forEach((key) => delete queryCopy[key]);


    if (queryCopy.filter) {
      queryCopy.genre = {
        $regex: queryCopy.filter,
        $options: "i",
      };
      delete queryCopy.filter;
    }

    this.query = this.query.find(queryCopy);
    return this;
  }


  pagination(resultPerPage: number) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage * (currentPage - 1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this;
  }
}

export default APIFunctionality;
