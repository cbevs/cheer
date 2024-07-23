import express from "express";
import createUser from "../../../db/userActions/createUser.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const persistedUser = await createUser(email, password, username)
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(422).json({ errors: {
        code: error.code,
        target: error.meta.target
      } });
    }
    return res.status(500).json({ error: error.message });
  }
});

export default usersRouter;
