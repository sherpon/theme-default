/**
 * Load the canvas with a picture
 * @param {string} canvasId - html canvas' id
 * @param {string} pictureUrl - picture's url to fill the canvas
 */
export const loadCanvas = (canvasId, pictureUrl) => {
  var canvas = document.getElementById(canvasId)
  const context = canvas.getContext('2d')
  const imageObj = new Image()
  imageObj.onload = () => {
    context.drawImage(imageObj, 0, 0, canvas.width, canvas.height)
  }
  imageObj.src = pictureUrl
}

const scaleWidthByHeight = (pictureWidth, pictureHeight, canvasHeight) => {
  let nWidth
  nWidth = ( pictureWidth * canvasHeight ) / pictureHeight
  return nWidth
}

const getXPosition = (canvasWidth, pictureWidth) => {
  let nX
  nX = ( canvasWidth - pictureWidth ) / 2
  return nX
}

const cleanCanvas = (context, canvasWidth, canvasHeight) => {
  context.fillStyle = 'white'
  context.fillRect(0, 0, canvasWidth, canvasHeight)
}

export const loadPicture = (inputId, canvasId, defaultPicture) => {
  let input
  let file
  let fr
  let img

  if (typeof window.FileReader !== 'function') {
      console.log("The file API isn't supported on this browser yet.")
      return
  }

  input = document.getElementById(inputId)
  if (!input) {
      console.log("Um, couldn't find the imgfile element.")
  }
  else if (!input.files) {
      console.log("This browser doesn't seem to support the `files` property of file inputs.")
  }
  else if (!input.files[0]) {
      //console.log("Please select a file before clicking 'Load'")
      loadCanvas(canvasId, defaultPicture)
  }
  else {
      file = input.files[0]
      fr = new FileReader()
      fr.onload = createImage
      fr.readAsDataURL(file)
  }

  function createImage() {
      img = new Image()
      img.onload = imageLoaded
      img.src = fr.result
  }

  function imageLoaded() {
      const canvas = document.getElementById(canvasId)
      //canvas.width = img.width
      //canvas.height = img.height
      const pictureWidth = scaleWidthByHeight(img.width, img.height, canvas.height)
      const pictureHeight = canvas.height
      const xPosition = getXPosition(canvas.width, pictureWidth)

      const ctx = canvas.getContext('2d')
      cleanCanvas(ctx, canvas.width, canvas.height)
      ctx.drawImage(img,xPosition,0, pictureWidth, pictureHeight)
      //alert(canvas.toDataURL('image/png'))
  }
}
