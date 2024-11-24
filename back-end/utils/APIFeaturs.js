class APIFeatures {
  constructor(query, queryString) {
    this.query = query; // MongoDB query object
    this.queryString = queryString; // Query string from the request
  }

  filter() {
    const searchQuery = this.queryString.search || "";

    if (searchQuery) {
      this.query = this.query.find({
        title: { $regex: searchQuery, $options: "i" },
      });
    }

    return this;
  }
}

module.exports = APIFeatures;
