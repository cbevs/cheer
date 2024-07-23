const serializeUser = (user) => {
  if (user.cryptedPassowrd) {
    const serializedUser = user
    delete serializedUser.cryptedPassword
    serializedUser.id = serializedUser.id.toString()
    return serializedUser
  }

  return false
}

export default serializeUser