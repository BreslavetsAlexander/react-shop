import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Row, Col, message } from 'antd';
import { FormInput } from '@components';
import { ROUTES, API, MESSAGES, ROLES } from '@constants';
import { appContext } from '@context/context';
import { HttpProvider } from '@utils/HttpProvider';
import styles from './styles.module.scss';

export const Registration = withRouter(props => {
  const { setUser } = useContext(appContext);
  const onRegister = values => {
    const { userName, password } = values;

    if (userName === 'admin') {
      message.error(MESSAGES.CANNOT_REGISTER);
      return;
    }

    HttpProvider.get(API.USERS, { userName }).then(data => {
      if (data.length) {
        message.warning(MESSAGES.USERNAME_IS_REGISTERED);
        return;
      }

      HttpProvider.post(API.USERS, {
        userName,
        password,
      }).then(res => {
        message.success(MESSAGES.SUCCESSFULLY_REGISTERED);
        setUser({ ...res, role: ROLES.USER });
        props.history.push(ROUTES.HOME);
      });
    });
  };

  return (
    <Row>
      <Col className="gutter-row" offset={8} span={8}>
        <h2 className={styles.formTitle}>Регистрация</h2>
        <Form onFinish={onRegister}>
          <FormInput name="userName" />
          <FormInput name="password" type="password" />
          <Form.Item>
            <Button className={styles.button} type="primary" htmlType="submit">
              Зарегистрироваться
            </Button>
            или <Link to={ROUTES.LOGIN}>Войти</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
});
