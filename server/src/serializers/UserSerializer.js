import CheckinSerializer from "./CheckinSerializer.js"

class UserSerializer {

  static getUserWithCheckins(user) {
    const allowedUserAttributes = ["id", "username", "profileImageUrl"]
    const serializedUser = {}

    for (const attribute of allowedUserAttributes) {
      if (typeof user[attribute] === "bigint") {
        serializedUser[attribute] = user[attribute].toString()
      } else {
        serializedUser[attribute] = user[attribute]
      }
    }

    serializedUser.checkins = CheckinSerializer.convertBigInt(user.checkins)

    return serializedUser
  }

  static getUserDetails(user) {
    const allowedUserAttributes = ["id", "username", "profileImageUrl"]
    const serializedUser = {}

    for (const attribute of allowedUserAttributes) {
      if (typeof user[attribute] === "bigint") {
        serializedUser[attribute] = user[attribute].toString()
      } else {
        serializedUser[attribute] = user[attribute]
      }
    }

    return serializedUser
  }
}

export default UserSerializer