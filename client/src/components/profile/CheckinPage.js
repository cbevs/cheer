import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import CheckinForm from "../checkin/CheckinForm";

const CheckInPage = ({ user }) => {

  const { id } = useParams()
  const [foundUser, setFoundUser] = useState({})

  const fetchUser = async () => {
      try {
        const response = await fetch(`/api/v1/users/profile/${id}/checkin`)
        if(!response.ok) {
          const newError = new Error(`${response.status} (${response.statusText})`)
          throw newError
        }
        const responseBody = await response.json()
        setFoundUser(responseBody.user)
      } catch (error) {
        console.error(error)
      }
  }
  
  useEffect(() => {
    fetchUser()
  }, [])

  let userPage

  if (user.id === foundUser.id) {
    userPage = (
      <>
        <div className="landing-1 checkin-f">
          <h1 className="checkin-text">How are you today, {user.username}?</h1>
          <CheckinForm />
        </div>
          <div className="landing-2">
        </div>
      </>
    )
  } else {
    userPage = (
      <>
        <div className="landing-1 checkin-f">
          <h1 className="landing-text">You do not have access to this page.</h1>
          <Link to="/" className="link">Back to home</Link>
        </div>
          <div className="landing-2">
        </div>
      </>
    )
  }

  return (
    <>
      {userPage}
    </>
  )
}

export default CheckInPage