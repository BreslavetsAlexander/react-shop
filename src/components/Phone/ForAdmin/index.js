import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import { ROUTES } from '@constants';
import { Phone } from '../Base';

export const PhoneForAdmin = props => {
  const bottom = (
    <Button block>
      <Link to={`${ROUTES.GOODS}/${props.phone.id}/edit`}>Редактировать</Link>
    </Button>
  );

  return <Phone bottom={bottom} phone={props.phone} />;
};
