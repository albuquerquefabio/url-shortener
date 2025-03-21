import styles from './app.module.scss';
import { useState, useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { Shortener } from '../shorterner/shortener';
import { Flex, Layout, ConfigProvider, theme as antdTheme } from 'antd';
import { Redirect } from '../redirect/redirect';
import { LinkOutlined, MoonOutlined, SunOutlined } from '@ant-design/icons'; // Updated icons

const { Header, Content } = Layout;

export function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    // Retrieve theme from local storage or default to 'light'
    return localStorage.getItem('theme') === 'dark' ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save theme to local storage
      return newTheme;
    });
  };

  useEffect(() => {
    // Ensure the theme is applied on initial load
    document.body.className = theme;
  }, [theme]);

  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === 'light'
            ? antdTheme.defaultAlgorithm
            : antdTheme.darkAlgorithm,
      }}
    >
      <Flex
        justify="center"
        align="middle"
        style={{ minHeight: '100vh' }}
        className={theme}
      >
        <Layout className={styles.layoutStyle}>
          <Header
            className={styles.headerStyle}
            style={{
              backgroundColor: theme === 'light' ? '#e3e3e3' : '#1a1a1a', // Dynamic background
              color: theme === 'light' ? '#333' : '#fff', // Dynamic text color
            }}
          >
            <Link to="/" style={{ color: theme === 'light' ? '#333' : '#fff' }}>
              <h1 className={styles.appTitle}>
                URL Shortener <LinkOutlined />
              </h1>
            </Link>
          </Header>
          <Content>
            <Routes>
              <Route path="/" element={<Shortener />} />
              <Route path="/:shortUrl" element={<Redirect />} />
            </Routes>
          </Content>
        </Layout>
        <button
          onClick={toggleTheme}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            padding: '10px 15px',
            borderRadius: '5px',
            backgroundColor: theme === 'light' ? '#000' : '#fff',
            color: theme === 'light' ? '#fff' : '#000',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          {theme === 'light' ? <MoonOutlined /> : <SunOutlined />}{' '}
        </button>
      </Flex>
    </ConfigProvider>
  );
}

export default App;
