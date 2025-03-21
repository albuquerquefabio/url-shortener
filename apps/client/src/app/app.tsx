import styles from './app.module.scss';
import { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { Shortener } from '../shorterner/shortener';
import { Flex, Layout, ConfigProvider, theme as antdTheme } from 'antd';
import { Redirect } from '../redirect/redirect';
import { LinkOutlined } from '@ant-design/icons';
import { useTheme, ThemeSwitcher } from '../theme-switcher/theme-switcher'; // Import new module

const { Header, Content } = Layout;

export function App() {
  const { theme } = useTheme();

  useEffect(() => {
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
              backgroundColor: theme === 'light' ? '#e3e3e3' : '#1a1a1a',
              color: theme === 'light' ? '#333' : '#fff',
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
        <ThemeSwitcher />
      </Flex>
    </ConfigProvider>
  );
}

export default App;
