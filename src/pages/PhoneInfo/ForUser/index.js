import React, { useState, useEffect, useContext } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Button } from 'antd';
import { Loader } from '@components';
import { API } from '@constants';
import { appContext } from '@context/context';
import { HttpProvider } from '@utils/HttpProvider';
import styles from './styles.module.scss';

const { Title } = Typography;

export const PhoneInfo = withRouter(props => {
  const [phone, setPhone] = useState(null);
  const { addToCart, phoneIndexInCart, cart } = useContext(appContext);

  useEffect(() => {
    HttpProvider.get(API.GOODS, { id: props.match.params.id }).then(data => {
      setPhone(data[0]);
    });
  }, []);

  if (!phone) {
    return <Loader />;
  }

  const index = phoneIndexInCart(phone);
  const addBtnText = index !== -1 ? `Добавить (${cart[index].count})` : 'Добавить';

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={phone.url} alt={phone.title} />
      </div>
      <div className={styles.info}>
        <Title>{phone.title}</Title>
        <hr />
        <div className={styles.description}>
          <Title level={3}>Описание:</Title>
          <p>{phone.description}</p>
          <Title level={3}>{phone.price} руб</Title>
        </div>
        <Button type="primary" size="large" onClick={() => addToCart(phone)}>
          {addBtnText}
        </Button>
      </div>
    </div>
  );
});
