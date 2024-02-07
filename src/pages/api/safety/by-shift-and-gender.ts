import { EChartsOption } from 'echarts';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { counting, unique } from 'radash';
import safetyStats from '../../../../data/safety.json';
import { Safety } from '../../../types/safety.types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const genders = unique(safetyStats, (item) => item.gender).map((item) => item.gender);

  // count by shift and gender
  const byShiftGender = (safetyStats as Safety[]).reduce((result, item) => {
    if (!result[item.shift]) {
      result[item.shift] = {};
    }
    if (!result[item.shift][item.gender]) {
      result[item.shift][item.gender] = 0;
    }
    result[item.shift][item.gender] += 1;
    return result;
    // biome-ignore lint/suspicious/noExplicitAny: yolo
  }, {} as any);

  const series = Object.values(byShiftGender)
    // @ts-ignore
    .map((outer) => Object.values(outer))
    .map((inner, index) => ({
      type: 'bar',
      data: inner,
      name: `group-${index}`,
    }));

  return res.status(200).json({
    xAxis: {
      data: genders,
    },
    yAxis: {},
    series,
  } as EChartsOption);
}
