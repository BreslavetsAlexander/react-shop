import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Typography } from 'antd';
import { ROUTES } from '@constants';

export const PrivateRoute = props => {
  if (props.isRoleIncluded) {
    return <Route exact path={props.page.path} component={props.page.component} />;
  }

  return (
    <Route
      exact
      path={props.page.path}
      component={() => (
        <>
          <Typography.Title level={3}>Вы не можете посмотреть эту страницу</Typography.Title>
          <Typography.Text>
            <Link to={ROUTES.HOME}>Перейти на главную</Link>
          </Typography.Text>
        </>
      )}
    />
  );
};
