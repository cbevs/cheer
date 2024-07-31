import prisma from "../../models/PrismaConnection.js"

const addPost = async (id, notes, mood) => {
  const currentDate = new Date()
  const dayStart = new Date(currentDate.setHours(0, 0, 0, 0))
  const dayEnd = new Date(currentDate.setHours(23, 59, 59, 999))

  const existingPost = await prisma.checkins.findMany({
    where: {
      date: {
        gte: dayStart,
        lte: dayEnd,
      },
      userid: {
        equals: id,
      },
    },
  })

  if (existingPost.length !== 0) {
   return false
  }

  const newPost = await prisma.checkins.create({
    data: {
      notes: notes,
      moods: mood,
      userid: id,
    },
  })
  return newPost
}

export default addPost
