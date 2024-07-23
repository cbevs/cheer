import { compareSync } from "bcrypt";

const authenticate = (user, password) => {
  return compareSync(password, user.cryptedPassword);
}

export default authenticate