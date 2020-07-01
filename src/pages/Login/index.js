import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Form, Button, Row, Col, message } from 'antd';
import { FormInput } from '@components';
import { ROUTES, API, MESSAGES, ROLES } from '@constants';
import { appContext } from '@context/context';
import { HttpProvider } from '@utils/HttpProvider';
import styles from './styles.module.scss';

export const Login = withRouter(props => {
  const { setUser } = useContext(appContext);

  const onLogIn = values => {
    const { userName, password } = values;

    if (userName === 'admin' && password === 'admin') {
      message.success(MESSAGES.ADMIN_SUCCESSFULLY_LOGGED_IN);
      setUser({ userName, password, role: ROLES.ADMIN });
      props.history.push(ROUTES.HOME);
      return;
    }

    HttpProvider.get(API.USERS, { userName, password }).then(data => {
      if (data.length) {
        message.success(MESSAGES.SUCCESSFULLY_LOGGED_IN);
        setUser({ ...data[0], role: ROLES.USER });
        props.history.push(ROUTES.HOME);
        return;
      }

      message.error(MESSAGES.WRONG_LOGIN_OR_PASSWORD);
    });
  };

  return (
    <Row>
      <Col className="gutter-row" offset={8} span={8}>
        <h2 className={styles.formTitle}>Вход</h2>
        <Form onFinish={onLogIn}>
          <FormInput name="userName" />
          <FormInput name="password" type="password" />
          <Form.Item>
            <Button className={styles.button} type="primary" htmlType="submit">
              Войти
            </Button>
            или <Link to={ROUTES.REGISTRATION}>зарегистрироваться</Link>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
});
