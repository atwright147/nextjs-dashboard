// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchWeatherApi } from 'openmeteo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.dir(req.query, { depth: null });

  const params = {
    latitude: 52.9536,
    longitude: -1.1505,
    hourly: ['temperature_2m', 'weather_code'],
    timezone: 'Europe/London',
    forecast_days: 1,
  };
  const url = 'https://api.open-meteo.com/v1/forecast';
  const responses = await fetchWeatherApi(url, params);

  // Helper function to form time ranges
  const range = (start: number, stop: number, step: number) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

  // Process first location. Add a for-loop for multiple locations or weather models
  const response = responses[0];

  // Attributes for timezone and location
  const utcOffsetSeconds = response.utcOffsetSeconds();
  // const timezone = response.timezone();
  // const timezoneAbbreviation = response.timezoneAbbreviation();
  // const latitude = response.latitude();
  // const longitude = response.longitude();

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const hourly = response.hourly()!;

  // Note: The order of weather variables in the URL query and the indices below need to match!
  const weatherData = {
    hourly: {
      time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      temperature2m: hourly.variables(0)!.valuesArray()!,
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      weatherCode: hourly.variables(1)!.valuesArray()!,
    },
  };

  // `weatherData` now contains a simple structure with arrays for datetime and weather data
  for (let i = 0; i < weatherData.hourly.time.length; i++) {
    console.log(weatherData.hourly.time[i], weatherData.hourly.temperature2m[i], weatherData.hourly.weatherCode[i]);
  }

  res.status(200).json({ data: weatherData });
}
