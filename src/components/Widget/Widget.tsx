import { ComponentPropsWithRef, FC, forwardRef, Ref } from 'react';
import styles from './Widget.module.scss';

type Props = ComponentPropsWithRef<'div'>;

// eslint-disable-next-line react/display-name
export const Widget: FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({...props }, ref: Ref<HTMLDivElement>): JSX.Element => {
    return (
      <div ref={ref} className={styles.widget} {...props}>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloribus nulla corporis hic reiciendis dolorem nisi ducimus, in, accusamus tenetur aspernatur nostrum! Corporis sint exercitationem expedita nesciunt, inventore quo! Accusamus, reprehenderit?
      </div>
    );
  }
);
