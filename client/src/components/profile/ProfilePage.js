import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import CheckinTile from "./CheckinTile.js"
import MoodChart from "./MoodChart.js"
import CheckinStats from "./CheckinStats.js"

const ProfilePage = ({ user, greeting }) => {
  const { id } = useParams()
  const [checkins, setCheckins] = useState([])

  let userPage

  const getCheckins = async () => {
    try {
      const response = await fetch(`/api/v1/checkin/${user.id}`)
      if (!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        const error = new Error(errorMessage)
        throw error
      }
      const responseBody = await response.json()
      setCheckins(responseBody.posts)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCheckins()
  }, [])

  const checkinDisplay = checkins.map((checkin) => {
    return <CheckinTile checkin={checkin} key={checkin.id} />
  })
 
  if (user.id === id) {
    userPage = (
      <>
        <div className="landing-1">
          <h1 className="landing-text">
            {greeting} {user.username}!
          </h1>
        </div>
        <div className="landing-2 mb-chart" id="l2">
          <div className="landing-2-left checkin-stats-container">
            <CheckinStats checkins={checkins} />
          </div>
          <div className="landing-2-right checkin-display pd-1">
            <h3 className="font-1">Previous Checkins</h3>
            <ul className="none">
              {checkinDisplay}
            </ul>
          </div>
        </div>
        <div>
        <MoodChart checkins={checkins} />
        <p className="mobile-tip">Hint: the chart scrolls horizontally!</p>
        </div>
      </>
    )
  } else {
    userPage = (
      <>
        <div className="landing-1 checkin-f">
          <h1 className="landing-text">You do not have access to this page.</h1>
          <Link to={`/profile/${user.id}`} className="link">
            Back to profile
          </Link>
        </div>
        <div className="landing-2"></div>
      </>
    )
  }

  return <>{userPage}</>
}

export default ProfilePage
