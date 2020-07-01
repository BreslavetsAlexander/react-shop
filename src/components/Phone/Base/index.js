import React from 'react';
import { Card } from 'antd';
import styles from './styles.module.scss';

export const Phone = props => {
  return (
    <Card hoverable cover={<img alt={props.phone.title} src={props.phone.url} />}>
      <div className={styles.desc}>
        <h3 className={styles.title}>{props.phone.title}</h3>
        <p className={styles.price}>{props.phone.price} ₽</p>
      </div>
      {props.bottom}
    </Card>
  );
};
