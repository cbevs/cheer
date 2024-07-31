import prisma from "../../models/PrismaConnection.js";
import UserSerializer from "../../serializers/UserSerializer.js";

const getUserInfo = async (id) => {
  
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(id)
    }
  })

  if (user) {
    const serializedUser = UserSerializer.getUserDetails(user)
    return serializedUser
  } else {
    return new Error("User not found!")
  }
}

export default getUserInfo