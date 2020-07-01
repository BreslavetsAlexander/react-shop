import { ROUTES } from './routes';
import { ROLES } from './roles';

export const MENU_ITEMS = [
  {
    title: 'Главная',
    to: ROUTES.HOME,
    roles: [ROLES.GUEST, ROLES.USER, ROLES.ADMIN],
  },
  {
    title: 'Корзина',
    to: ROUTES.CART,
    roles: [ROLES.GUEST, ROLES.USER],
  },
];
