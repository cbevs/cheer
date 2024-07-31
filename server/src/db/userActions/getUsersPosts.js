import prisma from "../../models/PrismaConnection.js"

const getUsersPosts = async (id) => {

  const posts = await prisma.checkins.findMany({
    where: {
      userid: {
        equals: id
      },
    },
  })

  return posts
}

export default getUsersPosts