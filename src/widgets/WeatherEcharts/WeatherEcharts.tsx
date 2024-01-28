import { useWeather } from '@/hooks/weather/useWeather';
import { Box, Paper, Typography } from '@mui/material';
import { useMeasure } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';
import styles from './WeatherEcharts.module.scss';

import dayjs from 'dayjs';
import { ReactECharts } from '../../components/ReactECharts/ReactECharts';
import { Weather as WeatherType } from '../../tyatherEcharts.module.scss';

const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

export const WeatherEcharts = () => {
  const [widgetRef, { height: widgetHeight, width: widgetWidth }] = useMeasure();
  const [headingRef, { height: headingHeight }] = useMeasure();
  const heightRef = useRef(0);
  const widthRef = useRef(0);
  const { data, isLoading, isError } = useWeather();

  useEffect(() => {
    if (widgetHeight) {
      heightRef.current = Math.abs(widgetHeight - (headingHeight ?? 0));
    }
  }, [headingHeight, widgetHeight]);

  useEffect(() => {
    if (widgetWidth) {
      widthRef.current = widgetWidth ?? 0;
    }
  }, [widgetWidth]);

  const PADDING_BIG = '45px';
  const PADDING_SMALL = '10px';

  return (
    <Paper component="section" sx={{ p: 1, boxSizing: 'border-box', height: '100%', position: 'relative' }}>
      <Box className={styles.widget}>
        <Typography variant="h6" component="h1" ref={headingRef}>
          Weather Forecast (eCharts)
        </Typography>

        {!isLoading && !isError && (
          <>
            <Box sx={{ m: 1, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} ref={widgetRef} />
            <ReactECharts
              width={widthRef.current}
              height={heightRef.current}
              option={{
                xAxis: {
                  type: 'category',
                  data: data?.data.hourly.time,
                  name: 'Time',
                  nameLocation: 'middle',
                  nameGap: 30,
                  axisLabel: {
                    formatter: (value) => `${value.split('T')[1].substring(0, 2)}h`,
                  },
                },
                yAxis: {
                  type: 'value',
                  name: 'Temperature',
                  nameLocation: 'middle',
                  nameGap: 30,
                },
                grid: {
                  right: PADDING_SMALL,
                  top: PADDING_SMALL,
                  left: PADDING_BIG,
                  bottom: PADDING_BIG,
                },
                tooltip: {
                  trigger: 'axis',
                  valueFormatter: (value) => `${Number(value).toFixed(2)}°C`,
                  //dayjs('2019-01-25').format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')
                  formatter: (params) =>
                    `${dayjs(params[0].axisValueLabel).format('Do MMM YYYY HH:mm[h]')}<br />${Number(params[0].value).toFixed(2)}°C`,
                },
                series: [
                  {
                    data: Object.values(data?.data.hourly.temperature2m ?? []),
                    type: 'line',
                  },
                ],
              }}
            />
          </>
        )}
      </Box>
    </Paper>
  );
};
