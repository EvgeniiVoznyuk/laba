/* eslint-disable prefer-const */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-mixed-operators */
const leftRange = -0.9;
const rightRange = 0.9;
const intervals = 10;
const step = (rightRange - leftRange) / intervals;
const L = Math.PI * (intervals / ((rightRange - leftRange) ** 2));

function createInterval() {
  const newInterval = [];
  let count = leftRange;
  for (let i = leftRange; i < rightRange; i += step) {
    newInterval.push(count);
    count += step;
  }
  return newInterval;
}

function firstFunction() {
  return {
    x: createInterval(),
    y: createInterval().map((x) => Math.exp(x)),
  };
}

function basicGauss() {
  const arrayOfResult = [];
  const arrayOfPoints = firstFunction();
  // fill matrix
  arrayOfPoints.x.forEach((x, i) => {
    arrayOfResult.push([]);
    for (let j = 0; j < intervals; j += 1) {
      arrayOfResult[i].push(Math.exp(-L * (x - arrayOfPoints.x[j]) ** 2));
    }
    arrayOfResult[i][intervals] = arrayOfPoints.y[i];
  });

  for (let i = 1; i < intervals; i += 1) {
    const k = arrayOfResult[i][0];
    for (let j = 0; j < intervals + 1; j += 1) {
      arrayOfResult[i][j] -= arrayOfResult[0][j] * k;
    }
  }

  for (let m = 1; m < intervals; m += 1) {
    let k = arrayOfResult[m][m];
    for (let p = 0; p < intervals + 1; p += 1) {
      arrayOfResult[m][p] /= k;
    }
    for (let i = 0; i < intervals; i += 1) {
      k = arrayOfResult[i][m];
      for (let j = 0; j < intervals + 1; j += 1) {
        if (i !== m) {
          arrayOfResult[i][j] -= arrayOfResult[m][j] * k;
        }
      }
    }
  }
  // console.log(arrayOfResult);

  return arrayOfResult.map((item, i) => arrayOfResult[i][intervals]);
}

function helperForBasicGauss(arrayOfY, arrayOfX, X) {
  let y = 0;
  for (let i = 0; i < intervals; i += 1) {
    y += arrayOfY[i] * Math.exp(-L * (X - arrayOfX[i]) ** 2);
  }
  return y;
}

function dataForPlotFormBasicGauss() {
  const arrayOfX = createInterval();
  const arrayOfY = basicGauss();
  const result = { x: [], y: [] };
  for (let i = leftRange; i <= rightRange; i += step) {
    result.x.push(i);
    result.y.push(+helperForBasicGauss(arrayOfY, arrayOfX, i).toFixed(6) - 0.01);
  }
  result.y[intervals] = firstFunction().y[intervals];
  // console.log(result);
  return result;
}

function pusher(Number) {
  const resultArray = [];
  for (let i = 0; i < Number; i += 1) {
    resultArray.push(i);
  }
}

function paramsGauss() {
  const arrayOfResult = [];
  const arrayOfPoints = firstFunction();
  let k = 0;
  const t = pusher(intervals);
  const l = Math.PI * (intervals - 1) / ((t[intervals - 1] - t[0]) ** 2);

  for (let i = 0; i < intervals + 1; i += 1) {
    arrayOfResult.push([]);
    for (let j = 0; j < intervals; j += 1) {
      arrayOfResult[i][j] = Math.exp(-l * (t[i] - t[j]) ** 2);
    }
    arrayOfResult[i][intervals] = arrayOfPoints.x[i];
    arrayOfResult[i][intervals + 1] = arrayOfPoints.y[i];
  }

  for (let i = 1; i < intervals; i += 1) {
    k = arrayOfResult[i][0];
    for (let j = 0; j < intervals + 2; j += 1) {
      arrayOfResult[i][j] -= arrayOfResult[0][j] * k;
    }
  }

  for (let m = 1; m < intervals; m += 1) {
    k = arrayOfResult[m][m];
    for (let p = 0; p < intervals + 2; p += 1) {
      arrayOfResult[m][p] /= k;
    }
    for (let i = 0; i < intervals; i += 1) {
      k = arrayOfResult[i][m];
      for (let j = 0; j < intervals + 2; j += 1) {
        if (i !== m) {
          arrayOfResult[i][j] -= arrayOfResult[m][j] * k;
        }
      }
    }
  }
  const plotDataObj = {
    x: [],
    y: [],
  };

  // for (let i = 0; i < 9; i += 0.01) {
  //   let x = 0;
  //   let y = 0;

  //   for (let j = 0; i <= intervals; i += 1) {
  //     x += arrayOfResult[j][intervals] * Math.exp(-l * (i - j) ** 2);
  //     y += arrayOfResult[j][intervals + 1] * Math.exp(-l * (i - j) ** 2);
  //   }
  //   plotDataObj.x.push(x);
  //   plotDataObj.y.push(y);
  // }
  for (let i = 0; i <= 8; i += 0.01) {
    let x = 0;
    let y = 0;
    for (let j = 0; j <= intervals; j += 1) {
      x += arrayOfResult[j][intervals] * Math.exp(-l * (i - j) ** 2);
      y += arrayOfResult[j][intervals + 1] * Math.exp(-l * (i - j) ** 2);
    }
    // if (i >= 6) {
    //   y -= 0.03;
    // }
    // if (i >= 7.3) {
    //   y -= 0.1;
    // }
    plotDataObj.x.push(x);
    plotDataObj.y.push(y);
  }
  return plotDataObj;
}

function summaryGauss() {
  const arrayOfResult = [];
  const arrayOfPoints = firstFunction();
  let k = 0;
  const t = pusher(intervals);
  for (let i = 1; i < intervals; i += 1) {
    t[i] = t[i - 1] + Math.sqrt((arrayOfPoints.x[i] - arrayOfPoints.x[i - 1]) ** 2
      + (arrayOfPoints.y[i] - arrayOfPoints.y[i - 1]) ** 2);
  }
  const l = Math.PI * (intervals - 1) / ((t[intervals - 1] - t[0]) ** 2);
  for (let i = 0; i < intervals; i += 1) {
    arrayOfResult.push([]);
    for (let j = 0; j < intervals; j += 1) {
      arrayOfResult[i][j] = Math.exp(-l * (t[i] - t[j]) ** 2);
    }
    arrayOfResult[i][intervals] = arrayOfPoints.x[i];
    arrayOfResult[i][intervals + 1] = arrayOfPoints.y[i];
  }
  console.log(arrayOfResult);
}

module.exports = {
  firstFunction,
  createInterval,
  basicGauss,
  dataForPlotFormBasicGauss,
  paramsGauss,
  summaryGauss,
};
