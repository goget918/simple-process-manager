import React from "react";
import { Form, Input } from "antd";

export default function EndpointForm({ isUpdateForm = false }) {
  return (
    <>
      <Form.Item
        label="Endpoint Name"
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Description"
        name="comment"
        rules={[
          {
            required: false,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="URL"
        name="url"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
    </>
  );
}
