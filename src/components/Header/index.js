import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu as MenuAntd, Layout } from 'antd';
import { MENU_ITEMS, ROUTES, ROLES } from '@constants';
import { appContext } from '@context/context';
import styles from './styles.module.scss';

export const Header = withRouter(props => {
  const { user } = useContext(appContext);
  const activeLink = MENU_ITEMS.map(link => link.to).find(link => link === props.location.pathname);

  return (
    <Layout.Header className={styles.header}>
      <MenuAntd theme="dark" mode="horizontal" selectedKeys={activeLink ? [activeLink] : []}>
        {MENU_ITEMS.filter(item => item.roles.includes(user.role)).map(item => (
          <MenuAntd.Item key={item.to}>
            <Link to={item.to}>{item.title}</Link>
          </MenuAntd.Item>
        ))}
        <MenuAntd.Item className={styles.login} key="login">
          <Link to={user.role !== ROLES.GUEST ? ROUTES.PROFILE : ROUTES.LOGIN}>Профиль</Link>
        </MenuAntd.Item>
      </MenuAntd>
    </Layout.Header>
  );
});
