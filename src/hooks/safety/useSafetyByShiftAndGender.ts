import { useQuery } from '@tanstack/react-query';
import { EChartsOption } from 'echarts';

const getBySafetyByShiftAndGender = async () => {
  const response = await fetch('/api/safety/by-shift-and-gender');
  return response.json();
};

export const useSafetyByShiftAndGender = () => {
  return useQuery<EChartsOption, Error>({
    queryKey: ['safety', 'by-shift-and-gender'],
    queryFn: getBySafetyByShiftAndGender,
  });
};
