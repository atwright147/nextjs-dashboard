import { useQuery } from '@tanstack/react-query';
import { Weather } from '@/../types/weather.type';


const getWeather = async () => {
  const response = await fetch('/api/weather');
  return response.json();
};

export const useWeather = () => {
  return useQuery<Weather, Error>({
    queryKey: ['weather', 'all'],
    queryFn: getWeather,
  });
}
