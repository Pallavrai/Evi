import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Provide the title"],
  },
  description: {
    type: String,
    required: false,
  },
  imageUrl: {
    type: String,
    required: false,
  },
});

const eventModel = mongoose.models.events || mongoose.model("events", eventSchema);

export default eventModel;