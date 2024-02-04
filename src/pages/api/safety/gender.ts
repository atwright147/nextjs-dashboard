import { EChartsOption } from 'echarts';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { counting } from 'radash';
import safetyStats from '../../../../data/safety.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const genders = counting(safetyStats, (item) => item.gender);

  const data = [];
  for (const [key, value] of Object.entries(genders)) {
    data.push({
      name: key,
      value: value,
    });
  }

  return res.status(200).json({
    series: [
      {
        type: 'pie',
        data,
      },
    ],
  } as EChartsOption);
}
