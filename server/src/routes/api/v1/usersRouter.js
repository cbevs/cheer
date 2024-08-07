import express from "express";
import userCheckinRouter from "./userCheckinRouter.js";
import createUser from "../../../db/userActions/createUser.js";
import getFullUserInfo from "../../../db/userActions/getFullUserInfo.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

const usersRouter = new express.Router();

usersRouter.use("/profile/:id/checkin", userCheckinRouter)

usersRouter.post("/", async (req, res) => {
  const { email, password, username } = req.body;
  try {
    const persistedUser = await createUser(email, password, username)
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    console.log(error)
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(422).json({ errors: {
        code: error.code,
        target: error.meta.target
      } });
    }
    return res.status(500).json({ error: error.message });
  }
});

usersRouter.get("/profile/:id", async (req, res) => {
  const id = req.params.id
  try {
    const user = await getFullUserInfo(id)
    if (user instanceof Error) {
      throw(user)
    } else {
      return res.status(200).json({ user })
    }
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong!" })
  }
})

export default usersRouter;