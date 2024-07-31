class CheckinSerializer {

  static convertBigInt(checkins) {
    const serializedCheckins = checkins.map((element) => {
      const serializedCheckin = {}

      for (const key in element) {
        if (typeof element[key] === "bigint") {
          serializedCheckin[key] = element[key].toString()
        } else {
          serializedCheckin[key] = element[key]
        }
      }

      return serializedCheckin
    })

    return serializedCheckins
  }
}

export default CheckinSerializer