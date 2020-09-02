module.exports = mongoose => {
    var schema = mongoose.Schema(
      {
        name: String,
        description: String,
        price: Number
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
  
    const product = mongoose.model("product", schema);
    return Product;
  };
  