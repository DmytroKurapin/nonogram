import parseFloatNums from "./parseFloatNums.js";

export default (svgEl, cellHeight, xMultiplier, cellWidth, yMultiplier) => {
  const xSize = cellHeight * xMultiplier
  const ySize = cellWidth * yMultiplier
  const { x, y, height, width} = svgEl.viewBox.baseVal
  const newX = parseFloatNums(x - xSize)
  const newY = parseFloatNums(y - ySize)
  const newH = parseFloatNums(height + ySize)
  const newW = parseFloatNums(width + xSize)
  svgEl.setAttribute('viewBox', `${newX} ${newY} ${newW} ${newH}`)

  const gridCont = svgEl.querySelector('#Grid')
  const gridRect = gridCont.querySelector('rect')

  gridRect.attributes.width.value = parseFloatNums(gridRect.attributes.width.value) + xSize
  gridRect.attributes.height.value = parseFloatNums(gridRect.attributes.height.value) + ySize
  gridRect.setAttribute('y', -ySize)
  gridRect.setAttribute('x', -xSize)

  const horLinesCont = gridCont.querySelector('#Horizontal_Lines')
  const verLinesCont = gridCont.querySelector('#Vertical_Lines')

  const cloneHorLine = horLinesCont.querySelector('[data-name="Thin Lines"]').querySelector('line').cloneNode(true)
  const cloneVerLine = verLinesCont.querySelector('[data-name="Thin Lines"]').querySelector('line').cloneNode(true)

  extendLines(horLinesCont, newX, 'x')
  extendLines(verLinesCont, newY, 'y')

  horLinesCont.appendChild(addCluesSeparators(cloneHorLine, 'y', newY, yMultiplier, cellHeight))
  verLinesCont.appendChild(addCluesSeparators(cloneVerLine, 'x', newX, xMultiplier, cellWidth))
}

const addCluesSeparators = (thinLine, axis, initCoord, numSeparators, indent) => {
  const tempG = document.createElement("g")
  tempG.setAttribute('id', `g_${axis}`)

  for (let i = 1; i <= numSeparators; i++) {
    const newCoord = parseFloatNums(initCoord + (i * indent))
    const cloned = thinLine.cloneNode(true)
    cloned.attributes[`${axis}${1}`].value = newCoord
    cloned.attributes[`${axis}${2}`].value = newCoord

    tempG.appendChild(cloned)
  }
  return tempG
}

const extendLines = (linesCont, newCoord, axis) => {
  const linesList = linesCont.querySelectorAll('line')
  for (let i = 0; i < linesList.length; i++) {
    const pointVal1 = Number(linesList[i].attributes[`${axis}1`].value)
    const pointVal2 = Number(linesList[i].attributes[`${axis}2`].value)
    const axisIdx = pointVal1 < pointVal2 ? 1 : 2

    linesList[i].attributes[`${axis}${axisIdx}`].value = newCoord
  }
}
