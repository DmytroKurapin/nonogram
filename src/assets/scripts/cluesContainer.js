import parseFloatNums from './parseFloatNums.js'

export default (groupEl, groupCounters, drawingAxisDirection) => {
  const initTextEl = groupEl.querySelector('text')
  const initRectEl = groupEl.querySelector('rect')

  const textInitTransition = initTextEl.attributes.transform.value
  const matches = textInitTransition.match(/translate\(([0-9.]*) ([0-9.]*)(\))$/)
  const translateTextX = Number(matches[1])
  const translateTextY = Number(matches[2])

  const cellWidth = Number(initRectEl.attributes.width.value)
  const cellHeight = Number(initRectEl.attributes.height.value)

  const tempDiv = document.createElement("div")
  let newTrX = null
  let newTrY = null
  for (let col = 0; col < groupCounters.length; col++) {
    if (drawingAxisDirection === 'y') {
      newTrX = parseFloatNums(translateTextX + col * cellWidth)
    } else {
      newTrY = parseFloatNums(translateTextY + col * cellHeight)
    }
    for (let cell = 0; cell < groupCounters[col].length; cell++) {
      if (drawingAxisDirection === 'y') {
        newTrY = parseFloatNums(translateTextY - cell * cellHeight)
      } else {
        newTrX = parseFloatNums(translateTextX - cell * cellWidth)
      }
      const textVal = groupCounters[col][cell]
      tempDiv.appendChild(createTextNode(initTextEl, clarifyTrX(newTrX, cellWidth, textVal), newTrY, textVal))
    }
  }
  return { el: tempDiv, cellWidth, cellHeight }
}

const createTextNode = (exampleEl, translateX, translateY, val) => {
  const clonedElement = exampleEl.cloneNode(true)
  clonedElement.attributes.transform.value = `translate(${translateX} ${translateY})`
  clonedElement.querySelector('tspan').textContent = `${val}`
  return clonedElement
}

const clarifyTrX = (currTrX, cellWidth, textVal) => {
  return `${textVal}`.length < 2 ? currTrX : parseFloatNums(currTrX - cellWidth / 4)
}
