import prisma from "../../models/PrismaConnection.js";
import encryptPassword from "../../services/encryptPassword.js";

const createUser = async (email, password, username) => {
  const persistedUser = await prisma.users.create({ 
    data: {
      email: email,
      username: username, 
      cryptedPassword: encryptPassword(password)
    }
  })
  persistedUser.id = persistedUser.id.toString()

  return persistedUser
}

export default createUser