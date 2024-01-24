import { useMeasure } from '@uidotdev/usehooks';
import { init } from 'echarts';
import type { ECharts, EChartsOption, SetOptionOpts } from 'echarts';
import React, { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import { useWeather } from '../../hooks/weather/useWeather';

export interface ReactEChartsProps {
  width: number;
  height: number;
  option: EChartsOption;
  className?: string;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  theme?: 'light' | 'dark';
}

// https://dev.to/manufac/using-apache-echarts-with-react-and-typescript-353k
export function ReactECharts({ width, height, className, option, style, settings, loading, theme }: ReactEChartsProps): JSX.Element {
  const chartRef = useRef<HTMLDivElement>(null);
  const chart = useRef<ECharts>();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    chart.current?.resize({ width, height });
  }, []);

  useEffect(() => {
    if (width && height) {
      chart.current?.resize({ width, height });
    }
  }, [width, height]);

  useEffect(() => {
    // Initialize chart
    if (chartRef.current !== null) {
      chart.current = init(chartRef.current, theme, { renderer: 'svg' });
    }

    return () => {
      chart.current?.dispose();
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

  return <div ref={chartRef} style={{ ...style }} className={className} />;
}
