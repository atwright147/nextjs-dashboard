import { useState } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';
import 'react-grid-layout/css/styles.css';
import styles from './index.module.scss';
import { Widget } from '../../components/Widget/Widget';
import { Weather } from '../../widgets/Weather/Weather';

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
      onDragStart={e => e.dataTransfer.setData("text/plain", "")}
    >
      Item {id}
    </div>
  )
}

export default function Page() {
  const [layout, setLayout] = useState<Layout[]>([
    { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
    { i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 }
  ]);

  const generateDOM = (layout: Layout[]): JSX.Element[] => {
    return layout.map((item, index) => {
      if (item.i === 'b') {
        return (
          <div key={item.i} style={{ overflow: 'hidden' }}>
            <Widget />
          </div>
        );
      }
      return (
        <div key={item.i} data-grid={item} className={classNames(styles.box)}>
          {index}
        </div>
      );
    });
  }

  const onDrop = (_layout: Layout[], item: Layout, event: Event): void => {
    const itemToAdd = { ...item };
    itemToAdd.i = uuidv4();

    setLayout((state) => {
      return [...state, itemToAdd];
    })
  };

  const onLayoutChange = (layout: Layout[]): void => {
    console.info('onLayoutChange');
  }

  const onResizeStop = (layout: Layout[]): void => {
    console.info('onResizeStop');
    console.info(layout);
    setLayout((state) => {
      return [...layout];
    });
    console.info(layout);
  }

  return (
    <main className={styles.main}>
      <div className={styles.widgets}>
        {['x', 'y', 'z'].map((item) => (
          <Item id={item} key={item} />
        ))}
      </div>
      <div className={styles.dashboard}>
        <GridLayout
          className="layout"
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

      <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(layout, null, 2)}</pre>

      <hr />

      <Weather />
    </main>
  )
}
