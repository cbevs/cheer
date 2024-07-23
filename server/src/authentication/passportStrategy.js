import local from "passport-local";
import prisma from "../models/PrismaConnection.js"
import authenticate from "./authenticate.js";

const authHandler = (email, password, done) => {
  prisma.users
    .findUnique({
      where: {
        email: email
      }
    })
    .then((user) => {
      if (user) {
        if (authenticate(user, password)) {
          return done(null, user);
        }

        return done({ invalid: "password credentials" }, false);
      }
      return done({ invalid: "email credentials" }, false);
    });
};

export default new local.Strategy({ usernameField: "email" }, authHandler);
