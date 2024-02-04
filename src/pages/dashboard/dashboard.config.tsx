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
      id: 'weather-echarts',
      name: 'Weather eCharts',
      widget: 'WeatherECharts',
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
    {
      id: 'safety-gender-echarts',
      name: 'Safety: By Gender Pie (eCharts)',
      widget: 'SafetyGenderPieECharts',
      minW: 4,
      minH: 4,
      // component: <SafetyGenderPieECharts />,
    },
    {
      id: 'safety-gender-shift-echarts',
      name: 'Safety: By Gender and Shift Bar (eCharts)',
      widget: 'SafetyGenderShiftBarECharts',
      minW: 4,
      minH: 4,
      // component: <SafetyGenderPieECharts />,
    },
  ],
};
