import prisma from "../models/PrismaConnection.js";

export default async (id, done) => {
  const user = await prisma.users.findUnique({
    where: {
      id: id
    }
  });
  done(null, user || false);
};
