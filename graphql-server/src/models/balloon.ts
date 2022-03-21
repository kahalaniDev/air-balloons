import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PositionSchema = new Schema(
  {
    longitude: { required: true, type: Number },
    latitude: { required: true, type: Number },
    altitude: { required: true, type: Number },
  },
  { versionKey: false, _id: false }
);

const BalloonSchema = new Schema(
  {
    name: { required: true, unique: true, type: String },
    description: { required: true, type: String },
    type: {
      required: true,
      type: String,
      enum: ["small", "medium", "big", "double"],
    },
    color: {
      required: true,
      type: String,
      enum: ["red", "blue", "black", "white"],
    },
    position: { type: PositionSchema, required: true },
  },
  { versionKey: false }
);

export default mongoose.model("Balloon", BalloonSchema);
