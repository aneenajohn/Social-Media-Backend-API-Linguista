const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
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
      thumbsUp:[Schema.Types.ObjectId],
      hooray:[Schema.Types.ObjectId],
      heart:[Schema.Types.ObjectId],
      rocket:[Schema.Types.ObjectId],
      eyes:[Schema.Types.ObjectId],
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema)