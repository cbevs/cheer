import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SignedInHomePage = ({ user, greeting }) => {

  useEffect(() => {
    getTodaysPost()
  }, [])

  const [todaysPost, setTodaysPost] = useState(false)
  let checkinPane

  const getTodaysPost = async () => {
    try {
      const response = await fetch(`/api/v1/checkin/${user.id}/existing`)
      if (!response.ok) {
        const responseBody = await response.json()
        
        setTodaysPost(true)
        return true
      }
      setTodaysPost(false)
      return false
      
    } catch (error) {
      console.error(error)
    }
  }

  if (!todaysPost) {
    checkinPane = (
        <Link to={`/profile/${user.id}/checkin`}>
          <div className="checkin-block">
          <FontAwesomeIcon icon="fa-solid fa-seedling" className="checkin-icon" />
          <p className="checkin-link">Check In</p>
          </div>
        </Link>
    )
  } else {
    checkinPane = (
      <>
        <div className="checked-in-block">
          <p className="checkin-link">Thanks for checking in today!</p>
        </div>
        <Link to={`/profile/${user.id}`}  className="checked-in-link">View your profile</Link>
      </>
    )
  }

  return (
    <>
      <div className="landing-1 user-page">
        <h1 className="landing-text">{greeting}, {user.username}!</h1>
        {checkinPane}
      </div>
      <div className="landing-2" id="l2">
      </div>
    </>
  )
}

export default SignedInHomePage