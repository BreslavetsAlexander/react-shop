import React from 'react';
import { Form, Input } from 'antd';

export const FormTextArea = props => {
  return (
    <Form.Item
      name={props.name}
      rules={[
        {
          required: true,
          message: `Please input ${props.name}!`,
        },
      ]}>
      <Input.TextArea rows={props.rows} placeholder={props.name} />
    </Form.Item>
  );
};
