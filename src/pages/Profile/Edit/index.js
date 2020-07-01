import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Typography, Button, Form, Spin, message, Row, Col } from 'antd';
import { FormInput } from '@components';
import { ROUTES, API, ROLES, MESSAGES } from '@constants';
import { appContext } from '@context/context';
import { HttpProvider } from '@utils/HttpProvider';
import styles from './styles.module.scss';

const { Title } = Typography;

export const ProfileEdit = withRouter(props => {
  const { user, setUser } = useContext(appContext);

  const onEdit = values => {
    HttpProvider.patch(`${API.USERS}/${user.id}`, values).then(res => {
      message.success(MESSAGES.EDITED_PROFILE);
      setUser({ ...res, role: ROLES.USER });
      props.history.push(ROUTES.PROFILE);
    });
  };

  if (!user) {
    return <Spin size="large" />;
  }

  return (
    <Row>
      <Col className="gutter-row" span={10}>
        <Title>Редактирование профиля</Title>
        <Form
          onFinish={onEdit}
          fields={[
            { name: 'userName', value: user.userName },
            { name: 'password', value: user.password },
          ]}>
          <div>
            <Title level={3}>Имя пользователя</Title>
            <FormInput name="userName" />
          </div>
          <div>
            <Title level={3}>Пароль</Title>
            <FormInput name="password" />
          </div>
          <div className={styles.formButtons}>
            <Form.Item>
              <Button type="primary" danger>
                <Link to={ROUTES.PROFILE}>Отмена</Link>
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Изменить
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Col>
    </Row>
  );
});
