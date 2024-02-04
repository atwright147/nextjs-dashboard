import { EChartsOption } from 'echarts';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { counting, unique } from 'radash';
import safetyStats from '../../../../data/safety.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const genders = unique(safetyStats, (item) => item.gender).map((item) => item.gender);

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

  const series = Object.keys(count3).map((gender) => {
    return Object.values(count3[gender]);
  });

  return res.status(200).json({
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {},
    series: [
      {
        type: 'bar',
        data: [23, 24, 18, 25, 27, 28, 25],
      },
      {
        type: 'bar',
        data: [26, 24, 18, 22, 23, 20, 27],
      },
      {
        type: 'bar',
        data: [5, 18, 2, 7, 9, 16, 20],
      },
    ],
  } as EChartsOption);
}

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
