import { useWeather } from '@/hooks/weather/useWeather';
import { Paper, Typography } from '@mui/material';
import { useMeasure } from '@uidotdev/usehooks';
import { ParentSize } from '@visx/responsive';
import {
  Axis, // any of these can be non-animated equivalents
  Grid,
  LineSeries,
  Tooltip,
  XYChart,
} from '@visx/xychart';
import { useEffect, useRef } from 'react';

import styles from './WeatherVisx.module.scss';

export const WeatherVisx = () => {
  const { data, isLoading, isError } = useWeather();

  // biome-ignore lint/suspicious/noExplicitAny: not sure what these types should be
  const formatData = (dataX: any, dataY: any) => {
    // biome-ignore lint/suspicious/noExplicitAny: not sure what these types should be
    return dataX?.map((data: any, index: number) => {
      const time = new Date(dataX[index]);
      return {
        x: `${String(time.getHours()).padStart(2, '0')}`,
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

  const MARGIN_BIG = 45;
  const MARGIN_SMALL = 5;

  return (
    <Paper
      component="section"
      className={styles.widget}
      style={{ width: 'inherit', height: 'inherit' }}
      sx={{ p: 1, boxSizing: 'border-box' }}
    >
      <Typography variant="h6" component="h1">
        Weather Forecast (Visx)
      </Typography>

      {!isLoading && !isError && (
        <div style={{ overflow: 'hidden' }}>
          <ParentSize debounceTime={0}>
            {(parent) => (
              <XYChart
                width={parent.width}
                height={parent.height}
                xScale={{ type: 'band' }}
                yScale={{ type: 'linear' }}
                margin={{ top: 20, right: MARGIN_SMALL, bottom: MARGIN_BIG, left: MARGIN_BIG }}
              >
                <Axis orientation="bottom" label="Time" tickFormat={(d) => `${d}h`} />
                <Axis orientation="left" label="Temperature" tickFormat={(d) => `${d}°C`} />
                <Grid columns={false} numTicks={10} />
                <LineSeries
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
                    <div className="tooltip">
                      {accessors.xAccessor(tooltipData?.nearestDatum?.datum)}:00h
                      <br />
                      {accessors.yAccessor(tooltipData?.nearestDatum?.datum).toFixed(2)}°C
                    </div>
                  )}
                />
              </XYChart>
            )}
          </ParentSize>
        </div>
      )}
    </Paper>
  );
};
