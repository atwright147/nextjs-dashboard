import { useWeather } from '@/hooks/weather/useWeather';
import { Box, Paper, Typography } from '@mui/material';
import { useMeasure } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';

import { ReactECharts } from '../../components/ReactECharts/ReactECharts';
import { Weather as WeatherType } from '../../types/weather.type';
import styles from './WeatherEcharts.module.scss';

export const WeatherEcharts = () => {
  const [widgetRef, { height: widgetHeight, width: widgetWidth }] = useMeasure();
  const [headingRef, { height: headingHeight }] = useMeasure();
  const heightRef = useRef(0);
  const widthRef = useRef(0);
  const { data, isLoading, isError } = useWeather();

  useEffect(() => {
    if (widgetHeight) {
      heightRef.current = widgetHeight;
    }
  }, [widgetHeight]);

  useEffect(() => {
    if (widgetWidth) {
      widthRef.current = widgetWidth ?? 0;
    }
  }, [widgetWidth]);

  const formatData = (data: WeatherType | undefined) => {
    if (!data) return {};

    const { time, temperature2m } = data.data.hourly;
    const result = time.map((timestamp, index) => ({
      timestamp: timestamp.split('T')[1].substring(0, 2),
      // @ts-ignore
      temperature: temperature2m[index],
      // @ts-ignore
      label: `${temperature2m[index]}°C`,
    }));
    return result;
  };

  return (
    <Paper component="section" sx={{ p: 1, boxSizing: 'border-box', height: '100%' }}>
      <Box className={styles.widget}>
        <Typography variant="h6" component="h1" ref={headingRef}>
          Weather Forecast (eCharts)
        </Typography>

        {!isLoading && !isError && (
          <>
            <div ref={widgetRef} style={{ outline: '1px solid red' }}>
              <ReactECharts
                width={widthRef.current}
                height={heightRef.current}
                option={{
                  xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                  },
                  yAxis: {
                    type: 'value',
                  },
                  grid: {
                    left: '8%',
                    right: '4%',
                    top: '4%',
                    bottom: '8%',
                  },
                  series: [
                    {
                      data: [150, 230, 224, 218, 135, 147, 260],
                      type: 'line',
                    },
                  ],
                }}
              />
            </div>
          </>
        )}
      </Box>
    </Paper>
  );
};
