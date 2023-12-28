import { CurrencyExchange } from '../../widgets/CurrencyExchange/CurrencyExchange';
import { Weather } from '../../widgets/Weather/Weather';

export const config = {
  widgets: [
    {
      id: 'weather',
      name: 'Weather',
      widget: 'Weather',
      minW: 5,
      minH: 3,
      component: <Weather />,
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
}
