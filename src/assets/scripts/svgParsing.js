import getCounters from './drawingCounters.js'
import getCluesContainer from './cluesContainer.js'
import updateLayer from "./layerContainer.js";

const parsing = svgEl => {
  const list = svgEl.querySelector('#Mosaic').querySelectorAll('rect')
  const numTopGroup = svgEl.querySelector('#Numbers_Vertical')
  const numLeftGroup = svgEl.querySelector('#Numbers_Horizontal')
  const nodesList = [...list]
  const horCounters = horizontalSorting(nodesList)
  const verCounters = verticalSorting(nodesList)

  const { el: containerElemY, cellHeight} = getCluesContainer(numTopGroup, verCounters.res, 'y')
  const { el: containerElemX, cellWidth} = getCluesContainer(numLeftGroup, horCounters.res, 'x')

  updateLayer(svgEl, cellHeight, (horCounters.highest - 1), cellWidth, (verCounters.highest - 1))

  numTopGroup.innerHTML = containerElemY.innerHTML
  numLeftGroup.innerHTML = containerElemX.innerHTML

  return svgEl
}

const horizontalSorting = (nodesList) => {
  const horList = nodesList
    .sort((a, b) => Number(a.attributes.x.value) < Number(b.attributes.x.value) ? -1 : 1)
    .sort((a, b) => Number(a.attributes.y.value) < Number(b.attributes.y.value) ? -1 : 1)

  return getCounters(horList, 'x')
}

const verticalSorting = (nodesList) => {
  const verList = nodesList
    .sort((a, b) => Number(a.attributes.y.value) < Number(b.attributes.y.value) ? -1 : 1)
    .sort((a, b) => Number(a.attributes.x.value) < Number(b.attributes.x.value) ? -1 : 1)
  return getCounters(verList, 'y')
}

export default parsing
