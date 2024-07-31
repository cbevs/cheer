import express from 'express'
import getUserInfo from "../../../db/userActions/getUserInfo.js"

const userCheckinRouter = new express.Router({ mergeParams: true })

userCheckinRouter.get("/", async (req, res) => {
  try {
    const user = await getUserInfo(req.params.id)
    if (user instanceof Error) {
      throw(user)
    } else {
      return res.status(200).json({ user })
    }
  } catch (err) {
    return res.status(500).json({ errors: "User not found" })
  }
})

export default userCheckinRouter