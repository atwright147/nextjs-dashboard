import { useWeather } from '@/hooks/weather/useWeather';
import { Paper, Typography } from '@mui/material';
import { useMeasure } from '@uidotdev/usehooks';
import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { useEffect, useRef } from 'react';
import styles from './WeatherVisx.module.scss';

export const WeatherVisx = () => {
  const [widgetRef, { height: widgetHeight }] = useMeasure();
  const [headingRef, { height: headingHeight }] = useMeasure();
  const heightRef = useRef(0);
  const { data, isLoading, isError } = useWeather();

  useEffect(() => {
    if (widgetHeight && headingHeight) {
      heightRef.current = widgetHeight - headingHeight;
    }
  }, [widgetHeight, headingHeight]);

  // biome-ignore lint/suspicious/noExplicitAny: not sure what these types should be
  const formatData = (dataX: any, dataY: any) => {
    // biome-ignore lint/suspicious/noExplicitAny: not sure what these types should be
    return dataX?.map((data: any, index: number) => {
      const time = new Date(dataX[index]);
      return {
        x: `${String(time.getHours()).padStart(2, '0')}:00`,
        y: dataY[index],
      };
    });
  };

  const accessors = {
    // biome-ignore lint/suspicious/noExplicitAny: not sure what these types should be
    xAccessor: (d?: any) => (d ? d.x : null),
    // biome-ignore lint/suspicious/noExplicitAny: not sure what these types should be
    yAccessor: (d?: any) => (d ? d.y : null),
  };

  return (
    <Paper
      className={styles.widget}
      ref={widgetRef}
      style={{ width: 'inherit', height: 'inherit' }}
      sx={{ p: 1, boxSizing: 'content-box' }}
    >
      <Typography variant="h6" component="h2" ref={headingRef}>
        Weather Forecast
      </Typography>

      {!isLoading && !isError && (
        <XYChart
          xScale={{ type: 'band' }}
          yScale={{ type: 'linear' }}
          margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
          height={heightRef.current}
        >
          <AnimatedAxis orientation="bottom" />
          <AnimatedGrid columns={false} numTicks={4} />
          <AnimatedLineSeries
            dataKey="Line 1"
            data={formatData(data?.data?.hourly?.time, data?.data?.hourly?.temperature2m)}
            {...accessors}
          />
          <Tooltip
            snapTooltipToDatumX
            snapTooltipToDatumY
            showVerticalCrosshair
            showSeriesGlyphs
            renderTooltip={({ tooltipData }) => (
              <div>
                {accessors.xAccessor(tooltipData?.nearestDatum?.datum)}
                {', '}
                {accessors.yAccessor(tooltipData?.nearestDatum?.datum)}
              </div>
            )}
          />
        </XYChart>
      )}
    </Paper>
  );
};
