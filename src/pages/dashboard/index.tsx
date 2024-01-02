import { Box, Paper, Typography } from '@mui/material';
import classNames from 'classnames';
import { useState } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import { v4 as uuidv4, v5 as uuidv5 } from 'uuid';
import { Widget } from '../../components/Widget/Widget';
import { useNotificationsStore } from '../../stores/notifications.store';
import { WeatherVictory } from '../../widgets/WeatherVictory/WeatherVictory';
import { WeatherVisx } from '../../widgets/WeatherVisx/WeatherVisx';
import { config } from '../dashboard/dashboard.config';
import styles from './index.module.scss';

let dragged: EventTarget;
const UUID = '0390e8ee-8a7b-45e2-bd53-8cfd5171a5b0';

function Item({ id }: { id: string }) {
  return (
    <div
      className={styles.droppable}
      key={id}
      id={id}
      draggable={true}
      unselectable="on"
      // this is a hack for firefox
      // Firefox requires some kind of initialization
      // which we can do by adding this attribute
      // @see https://bugzilla.mozilla.org/show_bug.cgi?id=568313
      onDragStart={(e) => {
        e.dataTransfer.setData('text/plain', '');
        dragged = e.target;
      }}
    >
      Item {id}
    </div>
  );
}

export default function Page() {
  const { init, add, remove, empty, notifications } = useNotificationsStore();

  const [layout, setLayout] = useState<Layout[]>([
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
    // { i: 'weather-victory', x: 0, y: 1, w: 6, h: 10, minW: 3, minH: 3 },
    // { i: 'weather-visx', x: 8, y: 2, w: 4, h: 6, minW: 3, minH: 3 },
  ]);

  const generateDOM = (layout: Layout[]): (JSX.Element | null)[] => {
    return layout.map((item, index) => {
      switch (item.i) {
        case 'a':
        case 'c':
          return (
            <div key={item.i} data-grid={item} className={classNames(styles.box)}>
              {index}
            </div>
          );

        case 'b':
          return (
            <Paper key={item.i}>
              <Box sx={{ p: 2, overflow: 'hidden', width: 'inherit', height: 'inherit' }}>
                <Widget />
              </Box>
            </Paper>
          );

        case 'weather-victory': {
          // const KEY = uuidv5(`${item.i}-${index}`, UUID);
          return (
            <div key={item.i}>
              <WeatherVictory key={item.i} />
            </div>
          );
        }

        case 'weather-visx': {
          // const KEY = uuidv5(`${item.i}-${index}`, UUID);
          return (
            <div key={item.i}>
              <WeatherVisx key={item.i} />
            </div>
          );
        }

        default:
          console.info('Error: Unhandled widget', item);
          break;
      }

      return null;
    });
  };

  const onDrop = (_layout: Layout[], item: Layout, event: Event): void => {
    // @ts-ignore
    const { minW, minH } = config.widgets.find((widget) => widget.id === (dragged as HTMLDivElement).id);
    const itemToAdd = { ...item, i: (dragged as HTMLDivElement).id, minW, minH, w: minW, h: minH };

    setLayout((state) => {
      const existingItem = state.find((statum) => statum.i === (dragged as HTMLDivElement).id);
      if (existingItem) {
        console.info('Error: Item already exists', existingItem);
        add({
          type: 'error',
          body: 'Error: Item already exists',
        });
        return state;
      }

      return [...state, itemToAdd];
    });
  };

  const onResizeStop = (layout: Layout[]): void => {
    setLayout((state) => {
      return [...layout];
    });
  };

  return (
    <>
      <Typography component="h1" variant="h1">
        Dashboard
      </Typography>
      <div className={styles.container}>
        <aside className={styles.sidebar}>
          <div className={styles.widgets}>
            {['x', 'y', 'z'].map((item) => (
              <Item id={item} key={item} />
            ))}

            <hr />

            {config.widgets.map((item) => (
              <Item id={item.id} key={item.id} />
            ))}
          </div>
        </aside>

        <main className={styles.main}>
          <div>
            <GridLayout
              className={styles.dashboard}
              layout={layout}
              cols={12}
              rowHeight={30}
              width={1200}
              onDrop={onDrop}
              onResizeStop={onResizeStop}
              // onLayoutChange={onLayoutChange}
              isDroppable
            >
              {generateDOM(layout)}
            </GridLayout>
          </div>

          <details>
            <pre>{JSON.stringify(layout, null, 2)}</pre>
          </details>
        </main>
      </div>
    </>
  );
}
