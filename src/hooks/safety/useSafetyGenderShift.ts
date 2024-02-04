import { useQuery } from '@tanstack/react-query';
import { EChartsOption } from 'echarts';
import { Safety } from '../../types/safety.types';

const getSafetyGenderShift = async () => {
  const response = await fetch('/api/safety/gender-shift');
  return response.json();
};

export const useSafetyGenderShift = () => {
  return useQuery<EChartsOption, Error>({
    queryKey: ['safety', 'gender-shift'],
    queryFn: getSafetyGenderShift,
  });
};
