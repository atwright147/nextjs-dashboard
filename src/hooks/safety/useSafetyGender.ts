import { useQuery } from '@tanstack/react-query';
import { EChartsOption } from 'echarts';
import { Safety } from '../../types/safety.types';

const getSafetyGender = async () => {
  const response = await fetch('/api/safety/gender');
  return response.json();
};

export const useSafetyGender = () => {
  return useQuery<EChartsOption, Error>({
    queryKey: ['safety', 'gender'],
    queryFn: getSafetyGender,
  });
};
