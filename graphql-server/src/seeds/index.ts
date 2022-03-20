import "dotenv/config";
import mongoose from "mongoose";
import { usersSeeder } from "./seeders/usersSeeder";
import { balloonsSeeder } from "./seeders/balloonsSeeder";

(async function () {
  try {
    console.log("start seeding");
    await mongoose.connect(process.env.DB_URL as string);
    await usersSeeder();
    await balloonsSeeder();
    mongoose.connection.close();
    console.log("seeding complete");
  } catch (err) {
    console.log("seeding fail: unable to connected to mongoose", err);
  }
})();
