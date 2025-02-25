import parseFloatNums from './parseFloatNums.js'

export default (sortedList, mainAxis) => {
  const [secAxis, mainDimension, secDimension] = mainAxis === 'x' ?  ['y', 'width', 'height'] : ['x', 'height', 'width']
  let prevMainAxis = null
  let prevSecAxis = null
  let highestNum = 1 // the largest list of numbers inside one row/column
  const counter = sortedList.reduce((prev, curr) => {
    const secAxisStr = curr.attributes[secAxis].value
    const mainAxisNum = Number(curr.attributes[mainAxis].value)
    if (prev.hasOwnProperty(secAxisStr)) {
      const mainDimensionNum = parseFloatNums(curr.attributes[mainDimension].value)
      const mainAxisDiff = parseFloatNums(mainAxisNum - (prevMainAxis === null ? 0 : prevMainAxis))
      if (Math.abs(mainAxisDiff - mainDimensionNum) < 0.02) {
        prev[secAxisStr][0]++
      }
      else {
        prev[secAxisStr].unshift(1)
        const leng = prev[secAxisStr].length
        highestNum = leng > highestNum ? leng : highestNum
      }
      prevMainAxis = mainAxisNum
    } else {
      const secDimensionNum = parseFloatNums(curr.attributes[secDimension].value)
      const nextSecDimension = parseFloatNums(secDimensionNum + (prevSecAxis === null ? 0 : prevSecAxis))
      // check if there is a big gap between numbers - means empty row
      if (Math.abs(nextSecDimension - Number(secAxisStr)) > 0.02) {
        prev[nextSecDimension] = []
      }
      prev[secAxisStr] = [1]
      prevMainAxis = mainAxisNum
      prevSecAxis = Number(secAxisStr)
    }
    return prev
  }, {})
  counter['res'] = Object.values(counter)
  counter['highest'] = highestNum
  return counter
}
