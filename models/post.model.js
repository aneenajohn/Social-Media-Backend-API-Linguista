const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title:{
      type:String,
      required:true,
    },
    description: {
      type: String,
      max: 500,
    },
    image: {
      type: String,
    },
    reactions:{
      likes: {
        type: Array,
        default: [],
      },
      hooray:{
        type: Array,
        default: [],
      },
      heart:{
        type: Array,
        default: [],
      },
      rocket:{
        type: Array,
        default: [],
      },
      eyes:{
        type: Array,
        default: [],
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema)