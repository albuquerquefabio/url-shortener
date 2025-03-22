import { useState } from 'react';
import { useApi } from '../../context/ApiContext';
import Brand from '../brand/Brand';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Alert } from 'antd';

export function Signup() {
  const apiService = useApi();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (values: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      await apiService.signup(
        values.name,
        values.username,
        values.email,
        values.password
      );
      navigate('/login'); // Redirect to login after successful signup
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
        <Brand local="signup" />
        <Typography.Title level={2} style={{ marginTop: '16px' }}>
          Create your account
        </Typography.Title>
      </div>

      <div style={{ marginTop: '24px', maxWidth: '400px', width: '100%' }}>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email address"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'The input is not valid E-mail!',
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
              Sign up
            </Button>
          </Form.Item>
        </Form>

        <Typography.Paragraph
          style={{ marginTop: '24px', textAlign: 'center' }}
        >
          Already a member?{' '}
          <Typography.Link
            onClick={() => navigate('/login')}
            style={{ fontWeight: 'bold' }}
          >
            Sign in
          </Typography.Link>
        </Typography.Paragraph>
      </div>
    </div>
  );
}

export default Signup;
