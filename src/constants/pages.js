import React from 'react';
import {
  Admin,
  Cart,
  Home,
  Login,
  PhoneInfo,
  PhoneInfoEdit,
  Profile,
  ProfileEdit,
  Registration,
} from '@pages';
import { ROLES } from './roles';
import { ROUTES } from './routes';

export const PAGES = [
  {
    name: 'ADMIN',
    path: ROUTES.ADMIN,
    component: () => <Admin />,
    roles: [ROLES.ADMIN],
  },
  {
    name: 'CART',
    path: ROUTES.CART,
    component: () => <Cart />,
    roles: [ROLES.GUEST, ROLES.USER],
  },
  {
    name: 'HOME',
    path: ROUTES.HOME,
    component: () => <Home />,
    roles: [ROLES.GUEST, ROLES.USER, ROLES.ADMIN],
  },
  {
    name: 'LOGIN',
    path: ROUTES.LOGIN,
    component: () => <Login />,
    roles: [ROLES.GUEST],
  },
  {
    name: 'PHONE_INFO',
    path: `${ROUTES.GOODS}/:id`,
    component: () => <PhoneInfo />,
    roles: [ROLES.GUEST, ROLES.USER],
  },
  {
    name: 'PHONE_INFO_EDIT',
    path: `${ROUTES.GOODS}/:id/edit`,
    component: () => <PhoneInfoEdit />,
    roles: [ROLES.ADMIN],
  },
  {
    name: 'PROFILE',
    path: ROUTES.PROFILE,
    component: () => <Profile />,
    roles: [ROLES.USER, ROLES.ADMIN],
  },
  {
    name: 'PROFILE_EDIT',
    path: ROUTES.PROFILE_EDIT,
    component: () => <ProfileEdit />,
    roles: [ROLES.USER],
  },
  {
    name: 'REGISTRATION',
    path: ROUTES.REGISTRATION,
    component: () => <Registration />,
    roles: [ROLES.GUEST],
  },
];
