import React from 'react';
import { Layout } from 'antd';
import styles from './styles.module.scss';

export const LayoutContent = props => (
  <div className={styles.layoutContent}>
    <Layout.Content>{props.children}</Layout.Content>
  </div>
);
