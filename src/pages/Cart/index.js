import React, { useContext, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Row, Col, Typography, Modal, Button, message } from 'antd';
import { PhoneInCart } from '@components';
import { MESSAGES, ROUTES, ROLES } from '@constants';
import { appContext } from '@context/context';
import styles from './styles.module.scss';

export const Cart = withRouter(props => {
  const [isVisible, setIsVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const { user, cart, orderAmount, clearCart } = useContext(appContext);

  if (!cart.length) {
    return (
      <Typography.Title level={3}>В корзине пока ничего нет. Добавьте что-нибудь</Typography.Title>
    );
  }

  const onOk = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      return;
    }

    props.history.push(ROUTES.HOME);
    message.success(MESSAGES.MADE_ORDER);
    clearCart();
  };

  const onMakeOrder = () => {
    if (user.role === ROLES.GUEST) {
      message.warning(MESSAGES.LOGIN_OR_REGISTER);
      props.history.push(ROUTES.LOGIN);
      return;
    }

    setIsVisible(true);
  };

  return (
    <Row gutter={[15, 15]}>
      <Col className="gutter-row" span={18}>
        <Row gutter={[15, 15]}>
          {cart.map(item => (
            <Col key={item.id} className="gutter-row" span={8}>
              <PhoneInCart phone={item} />
            </Col>
          ))}
        </Row>
      </Col>
      <Col className="gutter-row" span={6}>
        <div className={styles.cart}>
          <h2>
            <b>Ваша корзина</b>
          </h2>
          <div>
            <p>Товары ({cart.length}):</p>
            <p>{orderAmount.sum} ₽</p>
          </div>
          <div>
            <p>Доставка:</p>
            <p>{orderAmount.delivery ? `${orderAmount.delivery} ₽` : 'Бесплатная'}</p>
          </div>
          <hr />
          <div>
            <h2>
              <b>Итого:</b>
            </h2>
            <h2>
              <b>{orderAmount.total} ₽</b>
            </h2>
          </div>
          <Button type="primary" size="large" block onClick={onMakeOrder}>
            Оформить заказ
          </Button>
          <Modal
            title="Оформление заказа"
            closable={false}
            visible={isVisible}
            maskClosable={false}
            cancelButtonProps={{
              type: 'primary',
              danger: true,
              style: { display: isCompleted ? 'none' : 'inline-block' },
            }}
            okText={!isCompleted ? 'Оформить' : 'Перейти на главную'}
            cancelText="Отмена"
            onCancel={() => setIsVisible(false)}
            onOk={onOk}>
            {!isCompleted
              ? `Заказ на сумму ${orderAmount.total} руб готов к оформлению. Вы хотите оформить заказ?`
              : 'Ваш заказ принят'}
          </Modal>
        </div>
      </Col>
    </Row>
  );
});
