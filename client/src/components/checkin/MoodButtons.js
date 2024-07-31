import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MoodButtons = ({ mood, setCheckin, checkin, selectedId, setSelectedId }) => {

  let selectedMood = mood.mood
  const moodChange = (event) => {
    event.preventDefault()
    setSelectedId(mood.id)
    setCheckin({
      ...checkin,
      mood: event.currentTarget.name,
    })
  }

  if (selectedId === mood.id) {
    selectedMood = "selected-mood"
  }

  return (
    <button
      type="button"
      name={mood.mood}
      className={`mood-button ${selectedMood}-button`}
      onClick={moodChange}
    >
      <FontAwesomeIcon icon={`fa-regular fa-face-${mood.icon}`} />
    </button>
  )
}

export default MoodButtons
