import { Box, Paper, Typography } from '@mui/material';
import { useMeasure } from '@uidotdev/usehooks';
import { useEffect, useRef } from 'react';
import styles from './SafetyGenderPieECharts.module.scss';

import dayjs from 'dayjs';
import { ReactECharts } from '../../components/ReactECharts/ReactECharts';
import { useSafetyGender } from '../../hooks/safety/useSafetyGender';

const advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

export const SafetyGenderPieECharts = () => {
  const [widgetRef, { height: widgetHeight, width: widgetWidth }] = useMeasure();
  const [headingRef, { height: headingHeight }] = useMeasure();
  const heightRef = useRef(0);
  const widthRef = useRef(0);
  const { data, isLoading, isError } = useSafetyGender();

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

  const PADDING_BIG = '50px';
  const PADDING_SMALL = '10px';

  return (
    <Paper component="section" sx={{ p: 1, boxSizing: 'border-box', height: '100%', position: 'relative' }}>
      <Box className={styles.widget}>
        <Typography variant="h6" component="h1" ref={headingRef}>
          Safety: By Gender (eCharts)
        </Typography>

        {!isLoading && !isError && data && (
          <>
            <Box sx={{ m: 1, position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} ref={widgetRef} />
            <ReactECharts width={widthRef.current} height={heightRef.current} option={data} />
          </>
        )}
      </Box>
    </Paper>
  );
};
