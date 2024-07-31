import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"

const ProfilePage = ({ user, greeting }) => {
  const { id } = useParams()
  const [foundUser, setFoundUser] = useState({})

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/v1/users/profile/${id}`)
      if (!response.ok) {
        const newError = new Error(`${response.status} (${response.statusText})`)
        throw newError
      }
      const responseBody = await response.json()
      setFoundUser(responseBody.user)
    } catch (error) {
      console.error("Something went wrong!")
    }
  }

  useEffect(() => {
    fetchUser()
  }, [])

  let userPage

  if (user.id === foundUser.id) {
    userPage = (
      <>
        <div className="landing-1">
          <h1 className="landing-text">
            {greeting} {user.username}!
          </h1>
        </div>
        <div className="landing-2" id="l2">
          <div className="landing-2-left">
            <h2 className="font-1 text-c color-1 welcome-text">Welcome to Cheer!</h2>
          </div>
          <div className="landing-2-right"></div>
        </div>
      </>
    )
  } else {
    userPage = (
      <>
        <div className="landing-1 checkin-f">
          <h1 className="landing-text">You do not have access to this page.</h1>
          <Link to="/" className="link">
            Back to home
          </Link>
        </div>
        <div className="landing-2"></div>
      </>
    )
  }

  return <>{userPage}</>
}

export default ProfilePage
