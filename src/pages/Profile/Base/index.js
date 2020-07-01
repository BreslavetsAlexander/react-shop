import React, { useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Typography, Button, Spin } from 'antd';
import { ROUTES, ROLES } from '@constants';
import { appContext } from '@context/context';
import styles from './styles.module.scss';

export const Profile = withRouter(props => {
  const { user, setUser } = useContext(appContext);

  const onLogOut = () => {
    setUser(null);
    props.history.push(ROUTES.HOME);
  };

  if (!user) {
    return <Spin size="large" />;
  }

  return (
    <>
      <Typography.Title>Профиль</Typography.Title>
      <p>Ваше имя пользователя: {user.userName}</p>
      <p>Ваш пароль: {user.password}</p>
      <Button type="primary" danger className={styles.dangerButton} onClick={onLogOut}>
        Выйти
      </Button>
      {user.role !== ROLES.ADMIN && (
        <Button type="primary">
          <Link to={ROUTES.PROFILE_EDIT}>Редактировать профиль</Link>
        </Button>
      )}
      {user.role === ROLES.ADMIN && (
        <Button type="primary">
          <Link to={ROUTES.ADMIN}>Добавить новый товар</Link>
        </Button>
      )}
    </>
  );
});
