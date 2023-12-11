import { useWeather } from '@/hooks/weather/useWeather';
import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart';

export const Weather = () => {
  const { data } = useWeather();

  const formatData = (dataX: any, dataY: any) => {
    return dataX?.map((data: any, index: number) => ({
      x: dataX[index],
      y: dataY[index],
    }));
  }

  // @ts-ignore
  console.info(formatData(data?.data?.hourly?.time, data?.data?.hourly?.temperature2m));

  const data1 = [
    { x: '2020-01-01', y: 50 },
    { x: '2020-01-02', y: 10 },
    { x: '2020-01-03', y: 20 },
  ];

  const data2 = [
    { x: '2020-01-01', y: 30 },
    { x: '2020-01-02', y: 40 },
    { x: '2020-01-03', y: 80 },
  ];

  const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => d.y,
  };

  return (
    <>
      <h1>Weather Forecast</h1>

      <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
        <AnimatedAxis orientation="bottom" />
        <AnimatedGrid columns={false} numTicks={4} />
        {/* @ts-ignore */}
        <AnimatedLineSeries dataKey="Line 1" data={formatData(data?.data?.hourly?.time, data?.data?.hourly?.temperature2m)} {...accessors} />
        {/* <AnimatedLineSeries dataKey="Line 2" data={data2} {...accessors} /> */}
        <Tooltip
          snapTooltipToDatumX
          snapTooltipToDatumY
          showVerticalCrosshair
          showSeriesGlyphs
          renderTooltip={({ tooltipData, colorScale }) => (
            <div>
              {/* @ts-ignore */}
              <div style={{ color: colorScale(tooltipData.nearestDatum.key) }}>
                {/* @ts-ignore */}
                {tooltipData.nearestDatum.key}
              </div>
              {/* @ts-ignore */}
              {accessors.xAccessor(tooltipData.nearestDatum.datum)}
              {', '}
              {/* @ts-ignore */}
              {accessors.yAccessor(tooltipData.nearestDatum.datum)}
            </div>
          )}
        />
      </XYChart>


      <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(data, null, 2)}</pre>
    </>
  )
}
