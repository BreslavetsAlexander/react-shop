import React from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Button, Row, Col, message } from 'antd';
import { FormInput, FormTextArea } from '@components';
import { API, MESSAGES, ROUTES } from '@constants';
import { HttpProvider } from '@utils/HttpProvider';
import styles from './styles.module.scss';

export const Admin = withRouter(props => {
  const onAdd = values => {
    const phone = {
      title: values.title,
      url: values.imageUrl,
      description: values.description,
      price: values.price,
    };
    HttpProvider.post(API.GOODS, phone).then(() => {
      message.success(MESSAGES.SUCCESSFULLY_ADDED_PRODUCT);
      props.history.push(ROUTES.HOME);
    });
  };

  return (
    <Row>
      <Col className="gutter-row" span={10}>
        <h1 className={styles.title}>Добавление нового товара</h1>
        <Form onFinish={onAdd}>
          <FormInput name="title" />
          <FormInput name="imageUrl" />
          <FormInput name="price" type="number" />
          <FormTextArea name="description" rows={3} />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
});
