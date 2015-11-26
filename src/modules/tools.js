'use strict';

const size = 300;

var Tools = {
  map(val, fromIn, toIn, fromOut, toOut) {
    let progress = (val - fromIn) / (toIn - fromIn);
    return fromOut + ((toOut - fromOut) * progress);
  },
  /**
   * @posArray [x, z]
   * @return [x, z]
   */
  geoCoordsToCanvas(posArray) {
    let xRangeIn = [2.29, 2.39];
    let xRangeOut = [-size/2, size/2];
    let zRangeIn = [48.80, 48.90];
    let zRangeOut = [-size/2, size/2];
    return [
      Tools.map(posArray[1], xRangeIn[0], xRangeIn[1], xRangeOut[0], xRangeOut[1]),
      Tools.map(posArray[0], zRangeIn[0], zRangeIn[1], zRangeOut[0], zRangeOut[1])
    ]
  },
  geoDistToCanvas(dist) {
    return Tools.map(dist, 0, 0.1, 0, size);
  }
}

export default Tools;
