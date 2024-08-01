import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CheckinTile = ({ checkin }) => {
  let data
  const date = (new Date(checkin.date)).toLocaleDateString("en-US")
  
  console.log(checkin)
  if (checkin.moods === "happy") {
    data = (
      <li className="checkin-data cd-happy">
        {date}
        <FontAwesomeIcon icon={`fa-regular fa-face-smile`} className="happy"/>
        { checkin.notes ? <p className="ind-checkin-text">{checkin.notes}</p> : null }
      </li>
    )
  } 
  if (checkin.moods === "neutral") {
    data = (
      <li className="checkin-data cd-neutral">
        {date}
        <FontAwesomeIcon icon={`fa-regular fa-face-meh`} className="neutral"/>
      </li>
    )
  }
  if (checkin.moods === "sad") {
    data = (
      <li className="checkin-data cd-sad">
        {date}
        <FontAwesomeIcon icon={`fa-regular fa-face-frown`} className="sad"/>
      </li>
    )
  }

  return (
    data 
  )
}

export default CheckinTile