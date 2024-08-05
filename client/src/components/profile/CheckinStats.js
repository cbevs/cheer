import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import _ from "lodash"

const CheckinStats = ({ checkins }) => {
  const checkinStatObject = {}

  checkins.forEach((checkin) => {
    if (!checkinStatObject[checkin["moods"]]) {
      checkinStatObject[checkin["moods"]] = 1
    } else {
      checkinStatObject[checkin["moods"]]++
    }
  })

  const happyDays = checkinStatObject["happy"]
  const neutralDays = checkinStatObject["neutral"]
  const sadDays = checkinStatObject["sad"]

  return (
    <>
      <h3 className="font-1">In the last 30 days you've had</h3>
      <ul className="none">
        <li className="checkin-data cd-happy">
          <p className="checkin-stats-list-text">
            {checkinStatObject["happy"]} happy
            {happyDays <= 1 ? " day" : " days"}
          </p>
          <FontAwesomeIcon icon={`fa-regular fa-face-smile`} className="happy" />
        </li>
        <li className="checkin-data cd-neutral">
          <p className="checkin-stats-list-text">
            {checkinStatObject["neutral"]} neutral {neutralDays <= 1 ? " day" : " days"}
          </p>
          <FontAwesomeIcon icon={`fa-regular fa-face-meh`} className="neutral" />
        </li>
        <li className="checkin-data cd-sad">
          <p className="checkin-stats-list-text">
            {checkinStatObject["sad"]} sad {sadDays <= 1 ? " day" : " days"}
          </p>
          <FontAwesomeIcon icon={`fa-regular fa-face-frown`} className="sad" />
        </li>
      </ul>
    </>
  )
}

export default CheckinStats
