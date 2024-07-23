const getRandomProfileImage = () => {
  const imagesArray = [
    "https://cheer-production.s3.us-east-2.amazonaws.com/cheerBlue.png",
    "https://cheer-production.s3.us-east-2.amazonaws.com/cheerGray.png",
    "https://cheer-production.s3.us-east-2.amazonaws.com/cheerGreen.png",
    "https://cheer-production.s3.us-east-2.amazonaws.com/cheerOG.png",
    "https://cheer-production.s3.us-east-2.amazonaws.com/cheerOrange.png",
    "https://cheer-production.s3.us-east-2.amazonaws.com/cheerPink.png",
    "https://cheer-production.s3.us-east-2.amazonaws.com/cheerPurple.png"
  ]
  const randomNum = Math.floor(Math.random() * imagesArray.length)

  return imagesArray[randomNum]
}

export default getRandomProfileImage