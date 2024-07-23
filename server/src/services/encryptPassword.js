import { hashSync } from "bcrypt";

const encryptPassword = (newPassword) => {
  const saltRounds = 10
  return hashSync(newPassword, saltRounds);
}

export default encryptPassword