import parseFloatNums from './parseFloatNums.js'

export default (sortedList, mainAxis) => {
  const [secAxis, mainDimension, secDimension] = mainAxis === 'x' ?  ['y', 'width', 'height'] : ['x', 'height', 'width']
  let prevMainAxis = null
  let prevSecAxis = null
  const counter = sortedList.reduce((prev, curr) => {
    const secAxisStr = curr.attributes[secAxis].value
    const mainAxisNum = Number(curr.attributes[mainAxis].value)
    if (prev.hasOwnProperty(secAxisStr)) {
      const mainDimensionNum = parseFloatNums(curr.attributes[mainDimension].value)
      const mainAxisDiff = parseFloatNums(mainAxisNum - prevMainAxis)
      if (Math.abs(mainAxisDiff - mainDimensionNum) < 0.02) {
        prev[secAxisStr][0]++
      }
      else {
        prev[secAxisStr].unshift(1)
      }
      prevMainAxis = mainAxisNum
    } else {
      const secDimensionNum = parseFloatNums(curr.attributes[secDimension].value)
      const nextSecDimension = parseFloatNums(secDimensionNum + prevSecAxis)

      if (prevSecAxis !== null && Math.abs(nextSecDimension - Number(secAxisStr)) > 0.02) {
        prev[nextSecDimension] = []
      }
      prev[secAxisStr] = [1]
      prevMainAxis = mainAxisNum
      prevSecAxis = Number(secAxisStr)
    }
    return prev
  }, {})
  counter['res'] = Object.values(counter)
  return counter
}
