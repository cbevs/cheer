import express from "express"
import addPost from "../../../db/userActions/addPost.js"
import getExistingPost from "../../../db/userActions/getExistingPost.js"
import getUsersPosts from "../../../db/userActions/getUsersPosts.js"
import CheckinSerializer from "../../../serializers/CheckinSerializer.js"

const checkinRouter = new express.Router()

checkinRouter.get("/:id", async (req, res) => {
  const id = req.params.id
  try {
    const posts = await getUsersPosts(id)
    const serializedPosts = CheckinSerializer.convertBigInt(posts)
    return res.status(200).json({ posts: serializedPosts})
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

checkinRouter.post("/:id", async (req, res) => {
  const id = req.params.id
  const { mood, notes } = req.body
  try {
    const newPost = await addPost(id, notes, mood)

    if (!newPost) {
      return res
        .status(422)
        .json({ errors: "An entry already exists for today." })
    }

    return res.status(201).json({})
  } catch (error) {
    return res.status(500).json({ errors: error })
  }
})

checkinRouter.get("/:id/existing", async (req, res) => {
  const id = req.params.id

  try {
    const postExists = await getExistingPost(id)

    if (postExists) {
      return res.status(422).json({ errors: "Post already exists" })
    }

    return res.status(200).json({})
  } catch (error) {
    res.status(500).json({ errors: error })
  }
})

export default checkinRouter
