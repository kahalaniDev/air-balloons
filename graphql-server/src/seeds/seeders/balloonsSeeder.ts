import Balloon from "../../models/balloon";
import balloons from "../mock/balloons";

export async function balloonsSeeder() {
  await Balloon.deleteMany({});
  for (const balloon of balloons) {
    const newBalloon = new Balloon(balloon);
    await newBalloon.save();
  }
}
