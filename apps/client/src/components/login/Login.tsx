import { useState } from 'react';
import { useApi } from '../../context/ApiContext';
import Brand from '../brand/Brand';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { Form, Input, Button, Typography, Alert } from 'antd';

export function Login() {
  const apiService = useApi();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { fetchUser } = useUser();

  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await apiService.login(values.username, values.password);
      await fetchUser();
      navigate('/panel');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '24px',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '400px', width: '100%' }}>
        <Brand local="login" />
        <Typography.Title level={2} style={{ marginTop: '16px' }}>
          Sign in to your account
        </Typography.Title>
      </div>

      <div style={{ marginTop: '24px', maxWidth: '400px', width: '100%' }}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Username or Email address"
            name="username"
            rules={[
              {
                required: true,
                message: 'Please input your username or email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: '16px' }}
            />
          )}

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              Sign in
            </Button>
          </Form.Item>
        </Form>

        <Typography.Paragraph
          style={{ marginTop: '24px', textAlign: 'center' }}
        >
          Not a member?{' '}
          <Typography.Link style={{ fontWeight: 'bold' }}>
            <Link to="/signup">Start for free</Link>
          </Typography.Link>
        </Typography.Paragraph>
      </div>
    </div>
  );
}

export default Login;
