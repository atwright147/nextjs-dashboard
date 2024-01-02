import { CurrencyExchange } from '../../widgets/CurrencyExchange/CurrencyExchange';
import { WeatherVictory } from '../../widgets/WeatherVictory/WeatherVictory';
import { WeatherVisx } from '../../widgets/WeatherVisx/WeatherVisx';

export const config = {
  widgets: [
    {
      id: 'weather-victory',
      name: 'Weather Victory',
      widget: 'WeatherVictory',
      minW: 5,
      minH: 5,
      component: <WeatherVictory />,
    },
    {
      id: 'weather-visx',
      name: 'Weather Visx',
      widget: 'WeatherVisx',
      minW: 5,
      minH: 5,
      component: <WeatherVisx />,
    },
    {
      id: 'currency-exchange',
      name: 'Currency Exchange',
      widget: 'CurrencyExchange',
      minW: 2,
      minH: 2,
      component: <CurrencyExchange />,
    },
  ],
};
