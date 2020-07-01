import React, { useContext } from 'react';
import { PAGES } from '@constants';
import { appContext } from '@context/context';
import { PrivateRoute } from './PrivateRoute';

export const Routing = () => {
  const { user } = useContext(appContext);

  return (
    <>
      {PAGES.map(page => (
        <PrivateRoute isRoleIncluded={page.roles.includes(user.role)} page={page} key={page.path} />
      ))}
    </>
  );
};
