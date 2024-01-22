import { Paper, Typography } from '@mui/material';
import { useMeasure } from '@uidotdev/usehooks';
import { getInstanceByDom, init } from 'echarts';
import type { ECharts, EChartsOption, SetOptionOpts } from 'echarts';
import React, { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useWeather } from '../../hooks/weather/useWeather';

export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
}

// https://dev.to/manufac/using-apache-echarts-with-react-and-typescript-353k
export function ReactECharts({ option, style, settings, loading, theme }: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);
  const chart = useRef<ECharts>();

  const [widgetRef, { height: widgetHeight, width: widgetWidth }] = useMeasure();
  const [headingRef, { height: headingHeight }] = useMeasure();
  const heightRef = useRef(0);
  const { data, isLoading, isError } = useWeather();

  useEffect(() => {
    if (widgetHeight && headingHeight) {
      // heightRef.current = Math.abs(widgetHeight - headingHeight);
      chart.current?.resize();
    }
  }, [widgetHeight, headingHeight]);

  useEffect(() => {
    // Initialize chart
    if (chartRef.current !== null) {
      chart.current = init(chartRef.current, theme);
    }

    // Add chart resize listener
    const resizeChart = () => {
      chart.current?.resize();
    };
    window.addEventListener('resize', resizeChart);

    // Return cleanup function
    return () => {
      chart.current?.dispose();
      window.removeEventListener('resize', resizeChart);
    };
  }, [theme]);

  useEffect(() => {
    // Update chart
    if (chart.current && chartRef.current !== null) {
      chart.current.setOption(option, settings);
    }
  }, [option, settings]);

  useEffect(() => {
    // Update chart
    if (chart.current && chartRef.current !== null) {
      loading ? chart.current.showLoading() : chart.current.hideLoading();
    }
  }, [loading]);

  return (
    <Paper
      component="section"
      // className={styles.widget}
      ref={widgetRef}
      style={{ width: 'inherit', height: 'inherit' }}
      sx={{ p: 1, boxSizing: 'border-box' }}
    >
      <Typography variant="h6" component="h1" ref={headingRef}>
        Weather Forecast (eCharts)
      </Typography>
      <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />
    </Paper>
  );
}
