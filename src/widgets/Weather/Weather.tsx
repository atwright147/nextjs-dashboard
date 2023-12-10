import { useWeather } from '@/hooks/weather/useWeather';

export const Weather = () => {
  const { data } = useWeather();

  return (
    <>
      <h1>Weather</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
