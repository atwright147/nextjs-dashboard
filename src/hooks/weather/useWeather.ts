import { Weather } from '@/../types/weather.type';
import { useQuery } from '@tanstack/react-query';

const getWeather = async () => {
  const response = await fetch('/api/weather');
  return response.json();
};

export const useWeather = () => {
  return useQuery<Weather, Error>({
    queryKey: ['weather', 'all'],
    queryFn: getWeather,
  });
};
