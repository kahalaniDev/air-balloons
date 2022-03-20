import mongoose from "mongoose";
import bcrypt from "bcrypt";

const saltRounds = 12;

const Sechma = mongoose.Schema;

const UserSchema = new Sechma(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

UserSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, saltRounds);
    } catch (err) {
      next(err as Error);
    }
  }
  next();
});

UserSchema.methods.isCorrectPassword = async function (
  enteredPassword: string
) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", UserSchema);
