import { useWeather } from '@/hooks/weather/useWeather';
import { Paper, Typography } from '@mui/material';
import { useMeasure } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';
import { VictoryAxis, VictoryChart, VictoryLine, VictoryTooltip } from 'victory';
import { Weather as WeatherType } from '../../types/weather.type';
import styles from './WeatherVictory.module.scss';

export const WeatherVictory = () => {
  const [widgetRef, { height: widgetHeight, width: widgetWidth }] = useMeasure();
  const [headingRef, { height: headingHeight }] = useMeasure();
  const heightRef = useRef(0);
  const { data, isLoading, isError } = useWeather();

  useEffect(() => {
    if (widgetHeight && headingHeight) {
      heightRef.current = Math.abs(widgetHeight - headingHeight);
    }
  }, [widgetHeight, headingHeight]);

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
    <Paper
      component="section"
      className={styles.widget}
      ref={widgetRef}
      style={{ width: 'inherit', height: 'inherit' }}
      sx={{ p: 1, boxSizing: 'border-box' }}
    >
      <Typography variant="h6" component="h1" ref={headingRef}>
        Weather Forecast (Victory)
      </Typography>

      {!isLoading && !isError && (
        <>
          <div ref={widgetRef}>
            <VictoryChart
              // domainPadding will add space to each side of VictoryBar to
              // prevent it from overlapping the axis
              domainPadding={10}
              padding={{ top: 0, bottom: 20, left: 40, right: 0 }}
              height={heightRef.current}
              width={widgetWidth as number}
            >
              <VictoryAxis
                // tickValues specifies both the number of ticks and where
                // they are placed on the axis
                tickValues={data?.data?.hourly?.time.map((time) => time.split('T')[1].substring(0, 2))}
                // tickFormat={(x) => `${x.split('T')[1].substring(0, 2)}`}
                fixLabelOverlap={true}
              />
              <VictoryAxis
                dependentAxis
                // tickFormat specifies how ticks should be displayed
                tickFormat={(x) => x?.toFixed(2)}
                // @ts-ignore
                tickValues={Object.values(data?.data?.hourly?.temperature2m)}
                fixLabelOverlap={true}
              />
              {/* @ts-ignore */}
              <VictoryLine data={formatData(data)} x="timestamp" y="temperature" labelComponent={<VictoryTooltip />} />
            </VictoryChart>
          </div>
        </>
      )}
    </Paper>
  );
};
