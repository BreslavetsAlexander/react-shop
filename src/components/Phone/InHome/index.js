import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ROUTES } from '@constants';
import { appContext } from '@context/context';
import { Phone } from '../Base';
import styles from './styles.module.scss';

export const PhoneInHome = props => {
  const { addToCart, phoneIndexInCart, cart } = useContext(appContext);
  const index = phoneIndexInCart(props.phone);
  const addBtnText = index !== -1 ? `Добавить (${cart[index].count})` : 'Добавить';
  const bottom = (
    <div className={styles.buttons}>
      <Button size="large">
        <Link to={`${ROUTES.GOODS}/${props.phone.id}`}>Описание</Link>
      </Button>
      <Button type="primary" size="large" onClick={() => addToCart(props.phone)}>
        {addBtnText}
      </Button>
    </div>
  );

  return <Phone bottom={bottom} phone={props.phone} />;
};
