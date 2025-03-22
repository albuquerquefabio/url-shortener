import { Button, Form, Input, message, Space } from 'antd';
import { createCustomShortenerUrl } from '../../services/urlCustomService';
import { useState } from 'react';
import styles from './urlShortenerForm.module.scss';

interface UrlShortenerFormProps {
  onSuccess: () => void;
}

export const UrlShortenerForm = ({ onSuccess }: UrlShortenerFormProps) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { url: string }) => {
    setLoading(true);
    try {
      await createCustomShortenerUrl(values.url);
      message.success('URL shortened successfully');
      form.resetFields();
      onSuccess();
    } catch (error) {
      message.error('Failed to shorten URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.centerContainer}>
      <div className={styles.card}>
        <Form form={form} onFinish={onFinish}>
          <h2>Enter the URL to shorten</h2>
          <Space.Compact style={{ width: '100%' }}>
            <Form.Item
              name="url"
              rules={[
                { required: true, message: 'Please enter a URL' },
                { type: 'url', message: 'Please enter a valid URL' },
              ]}
              style={{ margin: 0, width: '100%' }}
            >
              <Input
                inputMode="url"
                placeholder="https://example.com"
                disabled={loading}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Short
            </Button>
          </Space.Compact>
        </Form>
      </div>
    </div>
  );
};
