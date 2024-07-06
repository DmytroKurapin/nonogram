import parseFloatNums from './parseFloatNums.js'

export default (groupEl, groupCounters, drawingAxisDirection) => {
  const initTextEl = groupEl.querySelector('text')
  const initRectEl = groupEl.querySelector('rect')

  const textInitTransition = initTextEl.attributes.transform.value
  const matches = textInitTransition.match(/translate\(([0-9.]*) ([0-9.]*)(\))$/)
  const translateTextX = Number(matches[1])
  const translateTextY = Number(matches[2])

  const rectX = Number(initRectEl.attributes.x.value)
  const rectY = Number(initRectEl.attributes.y.value)
  const rectWidth = Number(initRectEl.attributes.width.value)
  const rectHeight = Number(initRectEl.attributes.height.value)

  const tempDiv = document.createElement("div")
  let newTrX = null
  let newRectX = null
  let newTrY = null
  let newRectY = null
  for (let col = 0; col < groupCounters.length; col++) {
    if (drawingAxisDirection === 'y') {
      newTrX = parseFloatNums(translateTextX + col * rectWidth)
      newRectX = parseFloatNums(rectX + col * rectWidth)
    } else {
      newTrY = parseFloatNums(translateTextY + col * rectHeight)
      newRectY = parseFloatNums(rectY + col * rectHeight)
    }
    for (let cell = 0; cell < groupCounters[col].length; cell++) {
      if (drawingAxisDirection === 'y') {
        newTrY = parseFloatNums(translateTextY - cell * rectHeight)
        newRectY = parseFloatNums(rectY - cell * rectHeight)
      } else {
        newTrX = parseFloatNums(translateTextX - cell * rectWidth)
        newRectX = parseFloatNums(rectX - cell * rectWidth)
      }
      const textVal = groupCounters[col][cell]
      tempDiv.appendChild(createTextNode(initTextEl, clarifyTrX(newTrX, rectWidth, textVal), newTrY, textVal))
      tempDiv.appendChild(createRectNode(initRectEl, newRectX, newRectY))
    }
  }
  return tempDiv
}

const createTextNode = (exampleEl, translateX, translateY, val) => {
  const clonedElement = exampleEl.cloneNode(true)
  clonedElement.attributes.transform.value = `translate(${translateX} ${translateY})`
  clonedElement.querySelector('tspan').textContent = `${val}`
  return clonedElement
}
const createRectNode = (exampleEl, xAxis, yAxis) => {
  const clonedElement = exampleEl.cloneNode(true)
  clonedElement.attributes.x.value = xAxis
  clonedElement.attributes.y.value = yAxis
  return clonedElement
}

const clarifyTrX = (currTrX, rectWidth, textVal) => {
  return `${textVal}`.length < 2 ? currTrX : parseFloatNums(currTrX - rectWidth / 4)
}
