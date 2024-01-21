import { getInstanceByDom, init } from 'echarts';
import type { ECharts, EChartsOption, SetOptionOpts } from 'echarts';
import React, { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';

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

  return <div ref={chartRef} style={{ width: '100%', height: '100%', ...style }} />;
}
