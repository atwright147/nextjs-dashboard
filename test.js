const { counting, unique } = require('radash');
const safetyStats = require('./data/safety.json');
const { inspect } = require('util');

const handler = () => {
  const shifts = unique(safetyStats, (item) => item.shift).map((item) => item.shift);
  // console.info(shifts);

  const genders = unique(safetyStats, (item) => item.gender).map((item) => item.gender);
  // console.info(genders);

  // use reduce to get count of issues by shift and gender
  const count = safetyStats.reduce((result, item) => {
    if (!result[item.shift]) {
      result[item.shift] = {};
    }
    if (!result[item.shift][item.gender]) {
      result[item.shift][item.gender] = 0;
    }
    result[item.shift][item.gender] += 1;
    return result;
  }, {});
  // console.info(count);

  const count3 = safetyStats.reduce((result, item) => {
    if (!result[item.gender]) {
      result[item.gender] = {};
    }
    if (!result[item.gender][item.shift]) {
      result[item.gender][item.shift] = 0;
    }
    result[item.gender][item.shift] += 1;
    return result;
  }, {});
  console.info(count3);

  // const series = Object.keys(count3).map((gender) => {
  //   return Object.values(count3[gender]);
  // });

  const series = Object.values(count3).map((item) => Object.values(item)).map((item) => ({
      type: 'bar',
      data: item,
  }));
  // console.info(JSON.stringify(series, null, 2));

  return {
    xAxis: {
      data: genders,
    },
    yAxis: {},
    series,
  };
};

const data = handler();
console.info(JSON.stringify(data, null, 2));


// {
//   xAxis: {
//     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
//   },
//   yAxis: {},
//   series: [
//     {
//       type: 'bar',
//       data: [23, 24, 18, 25, 27, 28, 25],
//     },
//     {
//       type: 'bar',
//       data: [26, 24, 18, 22, 23, 20, 27],
//     },
//     {
//       type: 'bar',
//       data: [5, 18, 2, 7, 9, 16, 20],
//     },
//   ],
// }
