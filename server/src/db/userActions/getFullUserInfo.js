import prisma from "../../models/PrismaConnection.js";
import UserSerializer from "../../serializers/UserSerializer.js";

const getFullUserInfo = async (id) => {
  
  const user = await prisma.users.findUnique({
    where: {
      id: parseInt(id)
    },
    include: {
      checkins: true
    }
  })

  if (user) {
    const serializedUser = UserSerializer.getUserWithCheckins(user)
    return serializedUser
  } else {
    return new Error("User not found!")
  }
}

export default getFullUserInfo