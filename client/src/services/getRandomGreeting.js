const getRandomGreeting = () => {
  const greetings = [
    "Hey there",
    "Hiya",
    "What's up",
    "Howdy",
    "Sup",
    "What's crackin'",
    "Good day",
    "Yo",
    "Hi",
    "Good to see you",
    "Heyo"
  ]

  return greetings[Math.floor(Math.random() * greetings.length)]
}

export default getRandomGreeting;