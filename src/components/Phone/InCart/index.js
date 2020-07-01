import React, { useContext } from 'react';
import { Button } from 'antd';
import { appContext } from '@context/context';
import { Phone } from '../Base';
import styles from './styles.module.scss';

export const PhoneInCart = props => {
  const { changeCount } = useContext(appContext);
  const bottom = (
    <div className={styles.buttons}>
      <Button type="primary" size="large" danger onClick={() => changeCount(props.phone, -1)}>
        -
      </Button>
      <span className={styles.count}>{props.phone.count}</span>
      <Button type="primary" size="large" onClick={() => changeCount(props.phone, 1)}>
        +
      </Button>
    </div>
  );

  return <Phone bottom={bottom} phone={props.phone} />;
};
