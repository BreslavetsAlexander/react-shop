import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Button, message, Form } from 'antd';
import { FormInput, FormTextArea, Loader } from '@components';
import { API, ROUTES, MESSAGES } from '@constants';
import { HttpProvider } from '@utils/HttpProvider';
import styles from './styles.module.scss';

const { Title } = Typography;

export const PhoneInfoEdit = withRouter(props => {
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    HttpProvider.get(API.GOODS, { id: props.match.params.id }).then(data => {
      setPhone(data[0]);
    });
  }, []);

  const onRemove = () => {
    HttpProvider.delete(`${API.GOODS}/${phone.id}`).then(() => {
      message.success(MESSAGES.SUCCESSFULLY_REMOVED_PRODUCT);
      props.history.push(ROUTES.HOME);
    });
  };

  const onEdit = values => {
    HttpProvider.patch(`${API.GOODS}/${phone.id}`, values).then(() => {
      message.success(MESSAGES.SUCCESSFULLY_EDITED_PRODUCT);
      props.history.push(ROUTES.HOME);
    });
  };

  if (!phone) {
    return <Loader />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img src={phone.url} alt={phone.title} />
      </div>
      <div className={styles.formBlock}>
        <Form
          onFinish={onEdit}
          fields={[
            { name: 'title', value: phone.title },
            { name: 'description', value: phone.description },
            { name: 'price', value: phone.price },
            { name: 'url', value: phone.url },
          ]}>
          <div>
            <Title level={3}>Название</Title>
            <FormInput name="title" />
          </div>
          <div>
            <Title level={3}>Картинка (ссылка)</Title>
            <FormInput name="url" rows={3} />
          </div>
          <div>
            <Title level={3}>Описание</Title>
            <FormTextArea name="description" rows={3} />
          </div>
          <div>
            <Title level={3}>Цена</Title>
            <FormInput name="price" type="number" />
          </div>
          <Form.Item>
            <Button type="primary" danger className={styles.dangerButton} onClick={onRemove}>
              Удалить
            </Button>
            <Button type="primary" htmlType="submit">
              Изменить
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
});
