import { EChartsOption } from 'echarts';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { counting, unique } from 'radash';
import safetyStats from '../../../../data/safety.json';
import { Safety } from '../../../types/safety.types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const genders = unique(safetyStats, (item) => item.gender).map((item) => item.gender);

  const count3 = (safetyStats as Safety[]).reduce((result, item) => {
    if (!result[item.gender]) {
      result[item.gender] = {};
    }
    if (!result[item.gender][item.shift]) {
      result[item.gender][item.shift] = 0;
    }
    result[item.gender][item.shift] += 1;
    return result;
    // biome-ignore lint/suspicious/noExplicitAny: yolo
  }, {} as any);
  console.info(count3);

  const series = Object.values(count3)
    // @ts-ignore
    .map((outer) => Object.values(outer))
    .map((inner) => ({
      type: 'bar',
      data: inner,
    }));

  return res.status(200).json({
    xAxis: {
      data: genders,
    },
    yAxis: {},
    series,
  } as EChartsOption);
}
