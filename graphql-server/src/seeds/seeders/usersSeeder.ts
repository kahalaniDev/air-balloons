import User from "../../models/user";
import users from "../mock/users";

export async function usersSeeder() {
  await User.deleteMany({});
  for (const user of users) {
    const newUser = new User(user);
    await newUser.save();
  }
}
