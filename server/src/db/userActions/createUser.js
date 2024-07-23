import getRandomProfileImage from "../../services/getRandomProfileImage.js";
import prisma from "../../models/PrismaConnection.js";
import encryptPassword from "../../services/encryptPassword.js";

const createUser = async (email, password, username) => {
  const profileImageUrl = getRandomProfileImage()
  const persistedUser = await prisma.users.create({ 
    data: {
      email: email,
      username: username, 
      cryptedPassword: encryptPassword(password),
      profileImageUrl: profileImageUrl 
    }
  })
  persistedUser.id = persistedUser.id.toString()

  return persistedUser
}

export default createUser