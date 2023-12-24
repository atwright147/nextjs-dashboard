import { useWeather } from '@/hooks/weather/useWeather';
import {
  AnimatedAxis, // any of these can be non-animated equivalents
  AnimatedGrid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from '@visx/xychart';

export const Weather = () => {
  const { data, isLoading, isError } = useWeather();

  const formatData = (dataX: any, dataY: any) => {
    return dataX?.map((data: any, index: number) => {
      const time = new Date(dataX[index]);
      return {
        x: `${time.getHours()}`.padStart(2, '0') + ':00',
        y: dataY[index],
      }
    });
  }

  const accessors = {
    xAccessor: (d?: any) => d ? d.x : null,
    yAccessor: (d?: any) => d ? d.y : null,
  };

  return (
    <>
      <h1>Weather Forecast</h1>

      {!isLoading && !isError && (
        <XYChart height={300} xScale={{ type: 'band' }} yScale={{ type: 'linear' }}>
          <AnimatedAxis orientation="bottom" />
          <AnimatedGrid columns={false} numTicks={4} />
          <AnimatedLineSeries dataKey="Line 1" data={formatData(data?.data?.hourly?.time, data?.data?.hourly?.temperature2m)} {...accessors} />
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
    </>
  )
}
