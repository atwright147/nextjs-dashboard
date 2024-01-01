import { CurrencyExchange } from '../../widgets/CurrencyExchange/CurrencyExchange';
import { WeatherVictory } from '../../widgets/WeatherVictory/WeatherVictory';

export const config = {
  widgets: [
    {
      id: 'weather',
      name: 'Weather',
      widget: 'Weather',
      minW: 5,
      minH: 3,
      component: <WeatherVictory />,
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
