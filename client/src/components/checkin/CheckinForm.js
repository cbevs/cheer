import React, { useState } from "react"
import FormError from "../layout/FormError.js"
import MoodButtons from "./MoodButtons.js"
import { useParams, Redirect } from "react-router-dom"

const CheckinForm = () => {
  const [checkin, setCheckin] = useState({
    notes: "",
    mood: "",
  })
  const [errors, setErrors] = useState({})
  const [selectedId, setSelectedId] = useState(0)
  const [shouldRedirect, setShouldRedirect] = useState(false)

  const { id } = useParams()

  const moods = [
    { id: 1, mood: "happy", icon: "smile" },
    { id: 2, mood: "neutral", icon: "meh" },
    { id: 3, mood: "sad", icon: "frown" },
  ]

  const onSubmit = async (event) => {
    event.preventDefault()

    try {
      if (validateInput(checkin)) {
        const response = await fetch(`/api/v1/checkin/${id}`, {
          method: "POST",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify(checkin),
        })

        if (!response.ok) {
          if (response.status === 422) {
            const body = await response.json()
            setErrors({
              errors: body.errors,
            })
            return false
          }
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw error
        }
        setShouldRedirect(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const validateInput = (userPayload) => {
    setErrors({})
    let newError = {}
    if (userPayload.mood === "") {
      newError = {
        mood: "Please select your mood.",
      }
    }

    setErrors(newError)

    if (Object.keys(newError).length === 0) {
      return true
    }

    return false
  }

  const onInputChange = (event) => {
    setCheckin({
      ...checkin,
      [event.currentTarget.name]: event.currentTarget.value,
    })
  }

  const moodButtons = moods.map((mood) => {
    return (
      <MoodButtons
        mood={mood}
        key={mood.id}
        checkin={checkin}
        setCheckin={setCheckin}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
      />
    )
  })

  if (shouldRedirect) {
    return <Redirect push to={`/profile/${id}`} />
  }

  return (
    <div className="grid-container checkin-form text-c" onSubmit={onSubmit}>
      <form>
      <FormError error={errors.errors} />
        <div>
          <p>How are you feeling?</p>
          <div className="moods-div">{moodButtons}</div>
          <FormError error={errors.mood} />
        </div>
        <div>
          <label>
            <p className="checkin-p">Any contributing factors?</p>
            <input type="text" name="notes" value={checkin.notes} onChange={onInputChange} />
          </label>
        </div>
        <div className="bp-2">
          <input type="submit" className="submit-button" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default CheckinForm
