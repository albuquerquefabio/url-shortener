import styles from './app.module.scss';
import { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import { Shortener } from '../shorterner/Shortener';
import { Flex, Layout, ConfigProvider, theme as antdTheme } from 'antd';
import { Redirect } from '../redirect/Redirect';
import { LinkOutlined } from '@ant-design/icons';
import { useTheme, ThemeSwitcher } from '../theme-switcher/theme-switcher'; // Import new module
import { ApiProvider } from '../context/ApiContext';
import { UserProvider } from '../context/UserContext';
import PrivateRouter from '../components/PrivateRouter';
import Login from '../components/login/Login';
import Panel from 'antd/es/splitter/Panel';
import Signup from '../components/signup/Signup';
import { NavBar } from '../components/navbar/NavBar';

const { Content } = Layout;

export function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <ApiProvider>
      <UserProvider>
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
              <NavBar />
              <Content>
                <Routes>
                  <Route path="/" element={<Shortener />} />
                  <Route path="/:shortUrl" element={<Redirect />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/panel"
                    element={
                      <PrivateRouter>
                        <Panel />
                      </PrivateRouter>
                    }
                  />
                </Routes>
              </Content>
            </Layout>
            <ThemeSwitcher />
          </Flex>
        </ConfigProvider>
      </UserProvider>
    </ApiProvider>
  );
}

export default App;
