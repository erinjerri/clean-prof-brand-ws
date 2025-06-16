/**
 * Get the best fit image size from available sizes
 * @param {Object} options - Options object
 * @param {number} options.width - Target width
 * @param {number} options.height - Target height
 * @param {Array<{width: number, height: number}>} options.sizes - Available sizes
 * @returns {Object} Best fit size
 */
export const getBestFitFromSizes = ({ width, height, sizes }) => {
  if (!sizes || !sizes.length) {
    return { width, height }
  }

  // Sort sizes by area
  const sortedSizes = [...sizes].sort((a, b) => {
    const areaA = a.width * a.height
    const areaB = b.width * b.height
    return areaA - areaB
  })

  // Find the smallest size that's larger than or equal to the target size
  const bestFit = sortedSizes.find((size) => size.width >= width && size.height >= height)

  // If no size is large enough, use the largest available size
  return bestFit || sortedSizes[sortedSizes.length - 1]
}
