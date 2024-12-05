const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
    maxLength: [100, "product name cannot be exceed 100"],
  },
  price: {
    type: Number,
    required: true,
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, "please enter product description"],
  },
  images: [
    {
      image: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter product category"],
    enum: {
      values: [
        "Export oriented quality sparkles",
        "Sound crackers",
        "Twinkling star",
        "Flower pot",
        "Ground chakkara",
        "Bijli crackers",
        "Bomb",
        "Rockets",
        "Continue crackers",
        "Special wala",
        "Fancy show",
        "Sky shot rider",
        "Multi colour shot",
        "Branded sky shot",
        "Flying crackers",
        "Standard fountain",
        "Mega fountain",
        "Flash novalties",
        "Varities",
        "Colour matches",
        "Gift box",
      ],
      message: "please select correct category",
    },
  },
  stock: {
    type: Number,
    required: [true, "please enter product stock "],
    maxLength: [30, "product stock cannot exceed 30"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

let schema = mongoose.model("product", productSchema);
module.exports = schema;
