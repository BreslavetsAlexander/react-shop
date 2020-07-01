import React, { useState, useEffect, useContext } from 'react';
import { Row, Col } from 'antd';
import { PhoneInHome, PhoneForAdmin, Loader } from '@components';
import { appContext } from '@context/context';
import { API, ROLES } from '@constants';
import { HttpProvider } from '@utils/HttpProvider';

export const Home = () => {
  const [goods, setGoods] = useState(null);
  const { user } = useContext(appContext);

  useEffect(() => {
    HttpProvider.get(API.GOODS).then(data => setGoods(data));
  }, []);

  if (!goods) {
    return <Loader />;
  }

  if (user.role === ROLES.ADMIN) {
    return (
      <Row gutter={[15, 15]}>
        {goods.map(item => (
          <Col key={item.id} className="gutter-row" span={6}>
            <PhoneForAdmin phone={item} />
          </Col>
        ))}
      </Row>
    );
  }

  return (
    <Row gutter={[15, 15]}>
      {goods.map(item => (
        <Col key={item.id} className="gutter-row" span={6}>
          <PhoneInHome phone={item} />
        </Col>
      ))}
    </Row>
  );
};
