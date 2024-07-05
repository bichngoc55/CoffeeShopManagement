import mongoose from "mongoose";
const { Schema } = mongoose;

const homeContentSchema = new Schema({
  Welcome: {
    type: String,
    required: true
  },
  RegulationsAndTerms: {
    type: String,
    required: true
  },
});

const HomeContent = mongoose.model("HomeContent", homeContentSchema);

export default HomeContent;