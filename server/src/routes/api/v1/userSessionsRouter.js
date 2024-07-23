import express from "express";
import passport from "passport";

const sessionRouter = new express.Router();

sessionRouter.post("/", (req, res, next) => {
  return passport.authenticate("local", (err, user) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
    if (user) {
      user.id = user.id.toString()
      return req.login(user, () => {
        return res.status(201).json(user);
      });
    }

    return res.status(401).json({
      message:
        "Either email or password are incorrect. Please try again, or Sign Up to create a new account.",
    });
  })(req, res, next);
});

sessionRouter.get("/current", async (req, res) => {
  const user = req.user
  if (user) {
    user.id = user.id.toString()
    delete user.cryptedPassword
    res.status(200).json(user);
  } else {
    res.status(401).json(undefined);
  }
});

sessionRouter.delete("/", (req, res) => {
  req.logout();
  res.status(200).json({ message: "User signed out" });
});

export default sessionRouter;
