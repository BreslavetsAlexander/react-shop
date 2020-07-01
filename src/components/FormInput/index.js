import React from 'react';
import { Form, Input } from 'antd';

export const FormInput = props => {
  return (
    <Form.Item
      name={props.name}
      rules={[
        {
          required: true,
          message: `Please input ${props.name}!`,
        },
      ]}>
      <Input type={props.type} placeholder={props.name} />
    </Form.Item>
  );
};
