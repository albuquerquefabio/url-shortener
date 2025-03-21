// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styles from './app.module.scss';

import { Route, Routes, Link } from 'react-router-dom';

import { Shortener } from '../shorterner/shortener';
import { Flex, Layout } from 'antd';

const { Header, Content } = Layout;

export function App() {
  return (
    <Flex justify="center" align="middle" style={{ minHeight: '100vh' }}>
      <Layout className={styles.layoutStyle}>
        <Header className={styles.headerStyle}>
          <Link to="/">
            <h1 className={styles.appTitle}>URL Shortener</h1>
          </Link>
        </Header>
        <Content className={styles.contentStyle}>
          {/* <Flex justify="center" align="center"> */}
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Shortener />
                </div>
              }
            />
            <Route
              path="/page-2"
              element={
                <div>
                  <Link to="/">Click here to go back to root page.</Link>
                </div>
              }
            />
          </Routes>
          {/* </Flex> */}
        </Content>
      </Layout>
    </Flex>
  );
}

export default App;
